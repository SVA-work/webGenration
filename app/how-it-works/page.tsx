import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, FileText, Palette, Code, Download } from "lucide-react"

export default function HowItWorksPage() {
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-center">How WebGen Works</h1>
          <p className="text-xl text-muted-foreground mb-12 text-center leading-relaxed">
            Create your professional business card website in just a few simple steps.
          </p>

          <div className="space-y-12">
            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Palette className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-3">Step 1: Choose a Template</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Browse through our curated collection of professionally designed templates. Each template is
                      optimized for different professions and styles. Can't find what you're looking for? Use our AI
                      generator to create a custom template based on your specific requirements and preferences.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-3">Step 2: Fill in Your Information</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Complete our intuitive form wizard with your personal information, professional details, skills,
                      work experience, and contact information. Add your social media links and portfolio URL. The form
                      is organized into clear sections and saves your progress automatically.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-3">Step 3: Generate Your Website</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Click generate and watch as your website comes to life. Our system combines your chosen template
                      with your information to create a fully functional, responsive website. Preview your site and make
                      any final adjustments to colors, fonts, or layout.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex gap-6">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Download className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-3">Step 4: Download & Deploy</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Download your complete website as a ZIP file containing all HTML, CSS, JavaScript, and assets.
                      Deploy it to any hosting platform like Vercel, Netlify, GitHub Pages, or your own server. Your
                      website is optimized for performance, SEO, and mobile devices.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/create">Start Creating Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
