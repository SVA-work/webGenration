"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { setPersonalInfo } from "@/lib/store/slices/formSlice"

interface PersonalInfoStepProps {
  errors: Record<string, string>
}

export function PersonalInfoStep({ errors }: PersonalInfoStepProps) {
  const dispatch = useAppDispatch()
  const personalInfo = useAppSelector((state) => state.form.formData.personal)

  const handleChange = (field: string, value: string) => {
    dispatch(setPersonalInfo({ [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="fullName">
          Full Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="fullName"
          value={personalInfo?.fullName || ""}
          onChange={(e) => handleChange("fullName", e.target.value)}
          placeholder="John Doe"
          className={errors.fullName ? "border-destructive" : ""}
        />
        {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="tagline">
          Professional Tagline <span className="text-destructive">*</span>
        </Label>
        <Input
          id="tagline"
          value={personalInfo?.tagline || ""}
          onChange={(e) => handleChange("tagline", e.target.value)}
          placeholder="Full-Stack Developer & UI Designer"
          className={errors.tagline ? "border-destructive" : ""}
        />
        {errors.tagline && <p className="text-sm text-destructive">{errors.tagline}</p>}
        <p className="text-sm text-muted-foreground">A brief description of what you do</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">
          Bio <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="bio"
          value={personalInfo?.bio || ""}
          onChange={(e) => handleChange("bio", e.target.value)}
          placeholder="Tell visitors about yourself, your background, and what you're passionate about..."
          rows={6}
          className={errors.bio ? "border-destructive" : ""}
        />
        {errors.bio && <p className="text-sm text-destructive">{errors.bio}</p>}
        <p className="text-sm text-muted-foreground">2-3 sentences about yourself</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="profileImage">Profile Image URL (Optional)</Label>
        <Input
          id="profileImage"
          type="url"
          value={personalInfo?.profileImage || ""}
          onChange={(e) => handleChange("profileImage", e.target.value)}
          placeholder="https://example.com/photo.jpg"
        />
        <p className="text-sm text-muted-foreground">URL to your profile photo</p>
      </div>
    </div>
  )
}
