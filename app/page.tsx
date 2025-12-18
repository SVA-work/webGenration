import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Zap, Download, Palette } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">WebGen</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/templates" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Templates
            </Link>
            <Link
              href="/how-it-works"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </Link>
            <Button asChild size="sm">
              <Link href="/create">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Create Your Professional Business Card Website in Minutes
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-balance leading-relaxed">
            No coding required. Choose from beautiful templates or let AI design a custom website that perfectly
            represents your professional brand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/create">Start Building</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-transparent">
              <Link href="/templates">Browse Templates</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose WebGen?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Generate your complete website in under 5 minutes. Simple form, instant results.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Palette className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Beautiful Templates</h3>
                <p className="text-muted-foreground">
                  Choose from professionally designed templates or create custom designs with AI.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI-Powered</h3>
                <p className="text-muted-foreground">
                  Let artificial intelligence design a unique template tailored to your profession and style.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Export Ready</h3>
                <p className="text-muted-foreground">
                  Download your complete website as a ZIP file, ready to deploy anywhere.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Choose Your Template</h3>
                <p className="text-muted-foreground">
                  Browse our curated collection of professional templates or let AI generate a custom design based on
                  your preferences.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Fill In Your Details</h3>
                <p className="text-muted-foreground">
                  Complete our simple form wizard with your information, skills, contact details, and social links.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Download & Deploy</h3>
                <p className="text-muted-foreground">
                  Preview your website, make any adjustments, then download the complete package ready for deployment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Create Your Website?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of professionals who have already created their online presence with WebGen.
          </p>
          <Button asChild size="lg" className="text-lg px-8">
            <Link href="/create">Get Started Now</Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-semibold">WebGen</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 WebGen. Professional business card websites made easy.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
