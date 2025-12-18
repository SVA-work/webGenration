"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { selectTemplate } from "@/lib/store/slices/templateSlice"
import {
  startGeneration,
  updateGenerationProgress,
  completeGeneration,
  setGenerationError,
} from "@/lib/store/slices/websiteSlice"
import { Download, CheckCircle2, AlertCircle, Sparkles, Eye } from "lucide-react"
import { createZipFile, triggerDownload } from "@/lib/utils/zip-generator"

const generationSteps = [
  { label: "Preparing template", duration: 1000 },
  { label: "Generating HTML structure", duration: 1500 },
  { label: "Styling components", duration: 1500 },
  { label: "Adding your content", duration: 2000 },
  { label: "Optimizing assets", duration: 1000 },
  { label: "Creating ZIP file", duration: 1500 },
]

export function WebsiteGenerator() {
  const dispatch = useAppDispatch()
  const { isGenerating, generationProgress, generatedZipUrl, error } = useAppSelector((state) => state.website)
  const formData = useAppSelector((state) => state.form.formData)
  const selectedTemplate = useAppSelector((state) => state.template.selectedTemplate)
  const selectedTemplateId = useAppSelector((state) => state.template.selectedTemplateId)
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [hasStarted, setHasStarted] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const performServerCall = async (templateIdToUse: string | undefined) => {
    if (!templateIdToUse) {
      dispatch(setGenerationError('No template selected'))
      return
    }

    try {
      console.log('WebsiteGenerator: performServerCall, templateId', templateIdToUse)
      const controller = new AbortController()
      const timeout = 30000
      const timeoutId = setTimeout(() => controller.abort(), timeout)

      const response = await fetch('/api/generate-website', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId: templateIdToUse, formData }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      console.log('WebsiteGenerator: performServerCall response status', response.status)
      if (!response.ok) {
        const text = await response.text().catch(() => '')
        console.error('WebsiteGenerator: performServerCall non-ok', { status: response.status, textPreview: text.slice(0, 1000) })
        dispatch(setGenerationError('Failed to generate website'))
        return
      }

      const data = await response.json().catch(async (err) => {
        const raw = await response.text().catch(() => '')
        console.error('WebsiteGenerator: performServerCall failed to parse JSON', { err, rawPreview: raw.slice(0, 2000) })
        throw err
      })

      console.log('WebsiteGenerator: performServerCall got data keys', Object.keys(data || {}))

      const { files } = data
      if (!files || typeof files !== 'object') {
        console.error('WebsiteGenerator: performServerCall invalid files', { files })
        dispatch(setGenerationError('Invalid files from server'))
        return
      }

      dispatch(updateGenerationProgress(95))
      const zipBlob = await createZipFile(files)
      const zipUrl = URL.createObjectURL(zipBlob)
      dispatch(updateGenerationProgress(100))
      dispatch(completeGeneration(zipUrl))
      setTimeout(() => triggerDownload(zipBlob, `${formData.personal?.fullName?.replace(/\s+/g, '-') || 'website'}-${Date.now()}.zip`), 500)
    } catch (err) {
      console.error('WebsiteGenerator: performServerCall error', err)
      if ((err as any)?.name === 'AbortError') dispatch(setGenerationError('Generation request timed out.'))
      else dispatch(setGenerationError('Failed to generate website.'))
    }
  }

  if (!selectedTemplate && !selectedTemplateId && !hasStarted) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>No Template Selected</CardTitle>
                <CardDescription>It looks like no template was selected. Choose a template or go back to the form.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Button asChild>
                <a href="/create/templates">Back to templates</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleGenerate = async () => {
    const templateIdToUse = selectedTemplate?.id ?? selectedTemplateId

    if (!templateIdToUse) {
      dispatch(setGenerationError("No template selected"))
      return
    }

    console.log('WebsiteGenerator: start handleGenerate', { selectedTemplateId: templateIdToUse })

    setHasStarted(true)
    dispatch(startGeneration())

    try {
      for (let i = 0; i < generationSteps.length; i++) {
        setCurrentStepIndex(i)
        const progress = ((i + 1) / generationSteps.length) * 80
        dispatch(updateGenerationProgress(progress))
        console.log(`WebsiteGenerator: step ${i} "${generationSteps[i].label}" start, sleeping ${generationSteps[i].duration}ms`)
        await new Promise((resolve) => setTimeout(resolve, generationSteps[i].duration))
        console.log(`WebsiteGenerator: step ${i} "${generationSteps[i].label}" done`)
      }

      dispatch(updateGenerationProgress(85))

      await performServerCall(templateIdToUse)
    } catch (err) {
      console.error('Generation error:', err)
      if ((err as any)?.name === 'AbortError') {
        dispatch(setGenerationError('Generation request timed out. Please try again.'))
      } else {
        dispatch(setGenerationError('Failed to generate website. Please try again.'))
      }
    }
  }

  useEffect(() => {
    if (!hasStarted && (selectedTemplate || selectedTemplateId)) {
      console.log('WebsiteGenerator: auto-starting generation because selectedTemplate or selectedTemplateId exists', { selectedTemplateId })
      handleGenerate()
    }
  }, [hasStarted, selectedTemplate, selectedTemplateId])

  if (error) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="border-destructive">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <CardTitle>Generation Failed</CardTitle>
                <CardDescription className="text-destructive">{error}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button onClick={() => window.location.reload()} variant="outline">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (generatedZipUrl) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle>Your Website is Ready!</CardTitle>
                <CardDescription>Download your complete website package</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 rounded-lg bg-muted/50 space-y-4">
              <h3 className="font-semibold">What's Included:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Complete HTML, CSS, and JavaScript files</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Responsive design optimized for all devices</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>SEO-optimized structure and meta tags</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>All assets and images included</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>README with deployment instructions</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="flex-1">
                <a href={generatedZipUrl} download>
                  <Download className="h-5 w-5 mr-2" />
                  Download ZIP
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href={generatedZipUrl} target="_blank" rel="noopener noreferrer">
                  <Eye className="h-5 w-5 mr-2" />
                  Preview
                </a>
              </Button>
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-semibold mb-3">Next Steps:</h3>
              <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                <li>Extract the ZIP file to your computer</li>
                <li>Open index.html in your browser to preview locally</li>
                <li>Deploy to Vercel, Netlify, or any hosting platform</li>
                <li>Customize further if needed</li>
              </ol>
            </div>

            <div className="flex justify-center pt-4">
              <Button asChild variant="ghost">
                <a href="/">Create Another Website</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            </div>
            <div>
              <CardTitle>Generating Your Website</CardTitle>
              <CardDescription>This will take just a moment...</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{generationSteps[currentStepIndex]?.label}</span>
                <span className="text-muted-foreground">{Math.round(generationProgress)}%</span>
              </div>
              <Progress value={generationProgress} className="h-2" />
            </div>

            <div className="space-y-2">
              {generationSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 text-sm p-2 rounded transition-colors ${
                    index === currentStepIndex
                      ? "bg-primary/5 text-foreground"
                      : index < currentStepIndex
                        ? "text-muted-foreground"
                        : "text-muted-foreground/50"
                  }`}
                >
                  {index < currentStepIndex ? (
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  ) : index === currentStepIndex ? (
                    <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin flex-shrink-0" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border-2 border-muted flex-shrink-0" />
                  )}
                  <span>{step.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-muted/50 text-sm text-muted-foreground">
            <p>
              We're building your professional business card website with all your information, custom styling, and
              optimizations.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
