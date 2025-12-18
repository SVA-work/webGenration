import { WebsiteGenerator } from "@/components/website-generator"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function GeneratePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/create/templates">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to templates
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <WebsiteGenerator />
      </div>
    </div>
  )
}
