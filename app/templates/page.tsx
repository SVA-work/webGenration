import { TemplateSelector } from "@/components/template-selector"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default async function TemplatesPage() {
  const supabase = await getSupabaseServerClient()

  const { data: templates, error } = await supabase
    .from("templates")
    .select("*")
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching templates:", error)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Choose Your Template</h1>
            <p className="text-xl text-muted-foreground">
              Select from our professionally designed templates or let AI create something unique for you.
            </p>
          </div>
          <TemplateSelector templates={templates || []} />
        </div>
      </div>
    </div>
  )
}
