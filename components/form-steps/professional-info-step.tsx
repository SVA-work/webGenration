"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { setProfessionalInfo } from "@/lib/store/slices/formSlice"
import { X, Plus } from "lucide-react"

interface ProfessionalInfoStepProps {
  errors: Record<string, string>
}

export function ProfessionalInfoStep({ errors }: ProfessionalInfoStepProps) {
  const dispatch = useAppDispatch()
  const professionalInfo = useAppSelector((state) => state.form.formData.professional)
  const [skillInput, setSkillInput] = useState("")
  const [serviceInput, setServiceInput] = useState("")

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      const updatedSkills = [...(professionalInfo?.skills || []), skillInput.trim()]
      dispatch(setProfessionalInfo({ skills: updatedSkills }))
      setSkillInput("")
    }
  }

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = professionalInfo?.skills?.filter((_, i) => i !== index) || []
    dispatch(setProfessionalInfo({ skills: updatedSkills }))
  }

  const handleAddService = () => {
    if (serviceInput.trim()) {
      const updatedServices = [...(professionalInfo?.services || []), serviceInput.trim()]
      dispatch(setProfessionalInfo({ services: updatedServices }))
      setServiceInput("")
    }
  }

  const handleRemoveService = (index: number) => {
    const updatedServices = professionalInfo?.services?.filter((_, i) => i !== index) || []
    dispatch(setProfessionalInfo({ services: updatedServices }))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="skills">
          Skills <span className="text-destructive">*</span>
        </Label>
        <div className="flex gap-2">
          <Input
            id="skills"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleAddSkill()
              }
            }}
            placeholder="e.g., JavaScript, React, Design"
            className={errors.skills ? "border-destructive" : ""}
          />
          <Button type="button" onClick={handleAddSkill} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {errors.skills && <p className="text-sm text-destructive">{errors.skills}</p>}
        <div className="flex flex-wrap gap-2 mt-2">
          {professionalInfo?.skills?.map((skill, index) => (
            <Badge key={index} variant="secondary" className="gap-1">
              {skill}
              <button onClick={() => handleRemoveSkill(index)} className="ml-1 hover:text-destructive">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">Press Enter or click + to add</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="services">Services You Offer (Optional)</Label>
        <div className="flex gap-2">
          <Input
            id="services"
            value={serviceInput}
            onChange={(e) => setServiceInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleAddService()
              }
            }}
            placeholder="e.g., Web Development, Consulting"
          />
          <Button type="button" onClick={handleAddService} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {professionalInfo?.services?.map((service, index) => (
            <Badge key={index} variant="secondary" className="gap-1">
              {service}
              <button onClick={() => handleRemoveService(index)} className="ml-1 hover:text-destructive">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
