"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { setSocialLinks } from "@/lib/store/slices/formSlice"
import { Linkedin, Github, Twitter, Globe } from "lucide-react"

interface SocialLinksStepProps {
  errors: Record<string, string>
}

export function SocialLinksStep({ errors }: SocialLinksStepProps) {
  const dispatch = useAppDispatch()
  const socialLinks = useAppSelector((state) => state.form.formData.social)

  const handleChange = (field: string, value: string) => {
    dispatch(setSocialLinks({ [field]: value }))
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">Add links to your professional profiles (all optional)</p>

      <div className="space-y-2">
        <Label htmlFor="linkedin" className="flex items-center gap-2">
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </Label>
        <Input
          id="linkedin"
          type="url"
          value={socialLinks?.linkedin || ""}
          onChange={(e) => handleChange("linkedin", e.target.value)}
          placeholder="https://linkedin.com/in/yourprofile"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="github" className="flex items-center gap-2">
          <Github className="h-4 w-4" />
          GitHub
        </Label>
        <Input
          id="github"
          type="url"
          value={socialLinks?.github || ""}
          onChange={(e) => handleChange("github", e.target.value)}
          placeholder="https://github.com/yourusername"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="twitter" className="flex items-center gap-2">
          <Twitter className="h-4 w-4" />
          Twitter / X
        </Label>
        <Input
          id="twitter"
          type="url"
          value={socialLinks?.twitter || ""}
          onChange={(e) => handleChange("twitter", e.target.value)}
          placeholder="https://twitter.com/yourusername"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="portfolio" className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          Portfolio / Website
        </Label>
        <Input
          id="portfolio"
          type="url"
          value={socialLinks?.portfolio || ""}
          onChange={(e) => handleChange("portfolio", e.target.value)}
          placeholder="https://yourwebsite.com"
        />
      </div>
    </div>
  )
}
