"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAppDispatch } from "@/lib/store/hooks"
import { selectTemplate } from "@/lib/store/slices/templateSlice"
import type { Template } from "@/lib/types/database"
import { Sparkles, CheckCircle2 } from "lucide-react"
import Image from "next/image"

interface TemplateSelectorProps {
  templates: Template[]
}

export function TemplateSelector({ templates }: TemplateSelectorProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const dispatch = useAppDispatch()
  const router = useRouter()

  const publicImageMap: Record<string, string> = {
    'modern-minimal': '/modern-minimal-professional-website-black-white-cl.jpg',
    'creative-bold': '/creative-bold-colorful-gradient-website-modern.jpg',
    'corporate-professional': '/placeholder.jpg',
    'elegant-portfolio': '/placeholder.jpg',
  }

  const categories = ["all", "professional", "creative", "corporate", "portfolio"]

  const filteredTemplates =
    activeCategory === "all" ? templates : templates.filter((t) => t.category === activeCategory)

  const handleSelectTemplate = (templateId: string) => {
    setSelectedId(templateId)
    dispatch(selectTemplate(templateId))
  }

  const handleContinue = () => {
    if (selectedId) {
      router.push("/create/form")
    }
  }

  const handleAIGenerate = () => {
    router.push("/create/ai-template")
  }

  return (
    <div className="space-y-8">
      <Card className="border-2 border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Sparkles className="h-6 w-6 text-primary" />
                AI Template Generator
              </CardTitle>
              <CardDescription className="mt-2">
                Let artificial intelligence create a custom template tailored to your profession and style preferences.
              </CardDescription>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              New
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Button onClick={handleAIGenerate} size="lg" className="w-full sm:w-auto">
            <Sparkles className="h-4 w-4 mr-2" />
            Generate with AI
          </Button>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Browse Templates</h2>
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="grid w-full grid-cols-5 mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="capitalize">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeCategory} className="space-y-4">
            {filteredTemplates.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No templates found in this category.</div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedId === template.id ? "ring-2 ring-primary shadow-lg" : ""
                    }`}
                    onClick={() => handleSelectTemplate(template.id)}
                  >
                    <CardHeader className="p-0">
                      <div className="relative aspect-video w-full overflow-hidden rounded-t-lg bg-muted">
                        {(() => {
                          const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
                          const supabaseBucket = process.env.NEXT_PUBLIC_SUPABASE_BUCKET
                          console.log(supabaseUrl)
                          console.log(supabaseBucket)
                          console.log(template.preview_image_path)
                          let src: string
                          if (template.preview_image_path && supabaseUrl && supabaseBucket) {
                            src = `${supabaseUrl.replace(/\/$/, '')}/storage/v1/object/public/${supabaseBucket}/${template.preview_image_path}`
                          } else if (template.preview_image_path && (!supabaseUrl || !supabaseBucket)) {
                            src = `/api/images/proxy?path=${encodeURIComponent(template.preview_image_path)}`
                          } else {
                            src = '/placeholder.svg'
                          }
                          return (
                            <Image
                              src={src}
                              alt={template.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          )
                        })()}
                        {selectedId === template.id && (
                          <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                            <CheckCircle2 className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          {template.category && (
                            <Badge variant="secondary" className="capitalize text-xs">
                              {template.category}
                            </Badge>
                          )}
                        </div>
                        {template.description && (
                          <CardDescription className="text-sm">{template.description}</CardDescription>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {selectedId && (
        <div className="flex justify-center pt-4">
          <Button onClick={handleContinue} size="lg" className="min-w-[200px]">
            Continue to Form
          </Button>
        </div>
      )}
    </div>
  )
}
