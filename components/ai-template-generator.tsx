"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAppDispatch } from "@/lib/store/hooks"
import { selectTemplateObject } from "@/lib/store/slices/templateSlice"
import { Sparkles, Loader2 } from "lucide-react"

const industries = [
  "Technology",
  "Design",
  "Marketing",
  "Finance",
  "Healthcare",
  "Education",
  "Consulting",
  "Creative Arts",
  "Other",
]

const styles = [
  { id: "minimal", name: "Minimal", description: "Clean and simple" },
  { id: "bold", name: "Bold", description: "Eye-catching and vibrant" },
  { id: "elegant", name: "Elegant", description: "Sophisticated and refined" },
  { id: "modern", name: "Modern", description: "Contemporary and sleek" },
  { id: "playful", name: "Playful", description: "Fun and approachable" },
]

export function AITemplateGenerator() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [isGenerating, setIsGenerating] = useState(false)
  const [formData, setFormData] = useState({
    profession: "",
    industry: "",
    style: "modern",
    additionalNotes: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: "" }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.profession.trim()) {
      newErrors.profession = "Profession is required"
    }
    if (!formData.industry) {
      newErrors.industry = "Industry is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleGenerate = async () => {
    if (!validateForm()) return

    setIsGenerating(true)

    try {
      const response = await fetch("/api/generate-template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to generate template")
      }

      const { template } = await response.json()

      dispatch(selectTemplateObject(template))

      router.push("/create/form")
    } catch (error) {
      console.error("Error generating template:", error)
      setErrors({ general: "Failed to generate template. Please try again." })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4">AI Template Generator</h1>
        <p className="text-xl text-muted-foreground">
          Tell us about your profession and preferences, and AI will create a custom template for you.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Design Preferences</CardTitle>
          <CardDescription>Help us understand your style and requirements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {errors.general && (
            <div className="p-4 rounded-lg bg-destructive/10 text-destructive text-sm">{errors.general}</div>
          )}

          <div className="space-y-2">
            <Label htmlFor="profession">
              Your Profession <span className="text-destructive">*</span>
            </Label>
            <Input
              id="profession"
              value={formData.profession}
              onChange={(e) => handleChange("profession", e.target.value)}
              placeholder="e.g., Full-Stack Developer, UX Designer, Marketing Consultant"
              className={errors.profession ? "border-destructive" : ""}
            />
            {errors.profession && <p className="text-sm text-destructive">{errors.profession}</p>}
          </div>

          <div className="space-y-2">
            <Label>
              Industry <span className="text-destructive">*</span>
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {industries.map((industry) => (
                <button
                  key={industry}
                  onClick={() => handleChange("industry", industry)}
                  className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                    formData.industry === industry
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {industry}
                </button>
              ))}
            </div>
            {errors.industry && <p className="text-sm text-destructive">{errors.industry}</p>}
          </div>

          <div className="space-y-4">
            <Label>Visual Style</Label>
            <RadioGroup value={formData.style} onValueChange={(value) => handleChange("style", value)}>
              {styles.map((style) => (
                <div key={style.id} className="flex items-center space-x-3 space-y-0">
                  <RadioGroupItem value={style.id} id={style.id} />
                  <Label htmlFor={style.id} className="font-normal cursor-pointer">
                    <div>
                      <div className="font-medium">{style.name}</div>
                      <div className="text-sm text-muted-foreground">{style.description}</div>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
            <Textarea
              id="additionalNotes"
              value={formData.additionalNotes}
              onChange={(e) => handleChange("additionalNotes", e.target.value)}
              placeholder="Any specific colors, inspirations, or requirements you have in mind..."
              rows={4}
            />
            <p className="text-sm text-muted-foreground">
              Share any specific design preferences or inspiration sources
            </p>
          </div>

          <Button onClick={handleGenerate} disabled={isGenerating} size="lg" className="w-full">
            {isGenerating ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Generating Your Template...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Generate Template
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <div className="mt-8 p-6 rounded-lg bg-muted/50">
        <h3 className="font-semibold mb-2 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          How It Works
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• AI analyzes your profession, industry, and style preferences</li>
          <li>• Generates a custom color palette and layout optimized for your field</li>
          <li>• Creates typography and design elements that match your brand</li>
          <li>• You can customize further in the next step</li>
        </ul>
      </div>
    </div>
  )
}
