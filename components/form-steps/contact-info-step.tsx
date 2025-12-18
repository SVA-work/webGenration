"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { setContactInfo } from "@/lib/store/slices/formSlice"

interface ContactInfoStepProps {
  errors: Record<string, string>
}

export function ContactInfoStep({ errors }: ContactInfoStepProps) {
  const dispatch = useAppDispatch()
  const contactInfo = useAppSelector((state) => state.form.formData.contact)

  const handleChange = (field: string, value: string) => {
    dispatch(setContactInfo({ [field]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">
          Email Address <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          value={contactInfo?.email || ""}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder="john@example.com"
          className={errors.email ? "border-destructive" : ""}
        />
        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number (Optional)</Label>
        <Input
          id="phone"
          type="tel"
          value={contactInfo?.phone || ""}
          onChange={(e) => handleChange("phone", e.target.value)}
          placeholder="+1 (555) 123-4567"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location (Optional)</Label>
        <Input
          id="location"
          value={contactInfo?.location || ""}
          onChange={(e) => handleChange("location", e.target.value)}
          placeholder="San Francisco, CA"
        />
        <p className="text-sm text-muted-foreground">City, State or Country</p>
      </div>
    </div>
  )
}
