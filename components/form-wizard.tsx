"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { nextStep, previousStep, setCurrentStep } from "@/lib/store/slices/formSlice"
import { PersonalInfoStep } from "@/components/form-steps/personal-info-step"
import { ContactInfoStep } from "@/components/form-steps/contact-info-step"
import { SocialLinksStep } from "@/components/form-steps/social-links-step"
import { ProfessionalInfoStep } from "@/components/form-steps/professional-info-step"
import { DesignPreferencesStep } from "@/components/form-steps/design-preferences-step"
import { ArrowLeft, ArrowRight } from "lucide-react"

const steps = [
  { id: 0, title: "Personal Info", description: "Tell us about yourself" },
  { id: 1, title: "Contact Details", description: "How can people reach you?" },
  { id: 2, title: "Social Links", description: "Connect your online profiles" },
  { id: 3, title: "Professional Info", description: "Your skills and experience" },
  { id: 4, title: "Design", description: "Customize your look" },
]

export function FormWizard() {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const currentStep = useAppSelector((state) => state.form.currentStep)
  const formData = useAppSelector((state) => state.form.formData)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const progress = ((currentStep + 1) / steps.length) * 100

  const validateCurrentStep = (): boolean => {
    const errors: Record<string, string> = {}

    switch (currentStep) {
      case 0:
        if (!formData.personal?.fullName?.trim()) {
          errors.fullName = "Full name is required"
        }
        if (!formData.personal?.tagline?.trim()) {
          errors.tagline = "Tagline is required"
        }
        if (!formData.personal?.bio?.trim()) {
          errors.bio = "Bio is required"
        }
        break
      case 1: // Contact Info
        if (!formData.contact?.email?.trim()) {
          errors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contact.email)) {
          errors.email = "Invalid email format"
        }
        break
      case 3: // Professional Info
        if (!formData.professional?.skills || formData.professional.skills.length === 0) {
          errors.skills = "At least one skill is required"
        }
        break
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep < steps.length - 1) {
        dispatch(nextStep())
        setValidationErrors({})
      } else {
        router.push("/create/generate")
      }
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      dispatch(previousStep())
      setValidationErrors({})
    }
  }

  const handleStepClick = (stepId: number) => {
    if (stepId <= currentStep) {
      dispatch(setCurrentStep(stepId))
      setValidationErrors({})
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep errors={validationErrors} />
      case 1:
        return <ContactInfoStep errors={validationErrors} />
      case 2:
        return <SocialLinksStep errors={validationErrors} />
      case 3:
        return <ProfessionalInfoStep errors={validationErrors} />
      case 4:
        return <DesignPreferencesStep errors={validationErrors} />
      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-sm font-medium text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </h2>
          <span className="text-sm font-medium text-muted-foreground">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="flex justify-between mb-8 overflow-x-auto pb-2">
        {steps.map((step, index) => (
          <button
            key={step.id}
            onClick={() => handleStepClick(step.id)}
            disabled={step.id > currentStep}
            className={`flex flex-col items-center gap-2 min-w-[80px] ${
              step.id > currentStep ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                step.id === currentStep
                  ? "bg-primary text-primary-foreground"
                  : step.id < currentStep
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {step.id + 1}
            </div>
            <div className="text-center">
              <div className="text-xs font-medium hidden sm:block">{step.title}</div>
            </div>
          </button>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep].title}</CardTitle>
          <CardDescription>{steps[currentStep].description}</CardDescription>
        </CardHeader>
        <CardContent>{renderStepContent()}</CardContent>
      </Card>

      <div className="flex justify-between mt-8">
        <Button onClick={handlePrevious} disabled={currentStep === 0} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        <Button onClick={handleNext}>
          {currentStep === steps.length - 1 ? "Generate Website" : "Next"}
          {currentStep < steps.length - 1 && <ArrowRight className="h-4 w-4 ml-2" />}
        </Button>
      </div>
    </div>
  )
}
