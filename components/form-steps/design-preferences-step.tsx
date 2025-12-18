"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks"
import { setDesignPreferences } from "@/lib/store/slices/formSlice"

interface DesignPreferencesStepProps {
  errors: Record<string, string>
}

const colorSchemes = [
  { id: "light", name: "Light", description: "Clean and minimal" },
  { id: "dark", name: "Dark", description: "Modern and sleek" },
  { id: "auto", name: "Auto", description: "Matches system preference" },
]

const accentColors = [
  { id: "blue", name: "Blue", color: "bg-blue-500" },
  { id: "purple", name: "Purple", color: "bg-purple-500" },
  { id: "green", name: "Green", color: "bg-green-500" },
  { id: "orange", name: "Orange", color: "bg-orange-500" },
  { id: "pink", name: "Pink", color: "bg-pink-500" },
]

const fontPreferences = [
  { id: "modern", name: "Modern", description: "Sans-serif, clean lines" },
  { id: "classic", name: "Classic", description: "Serif, traditional" },
  { id: "playful", name: "Playful", description: "Rounded, friendly" },
]

export function DesignPreferencesStep({ errors }: DesignPreferencesStepProps) {
  const dispatch = useAppDispatch()
  const designPrefs = useAppSelector((state) => state.form.formData.design)

  const handleColorSchemeChange = (value: string) => {
    dispatch(setDesignPreferences({ colorScheme: value }))
  }

  const handleAccentColorChange = (value: string) => {
    dispatch(setDesignPreferences({ accentColor: value }))
  }

  const handleFontChange = (value: string) => {
    dispatch(setDesignPreferences({ fontPreference: value }))
  }

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Label>Color Scheme</Label>
        <RadioGroup value={designPrefs?.colorScheme || "auto"} onValueChange={handleColorSchemeChange}>
          {colorSchemes.map((scheme) => (
            <div key={scheme.id} className="flex items-center space-x-3 space-y-0">
              <RadioGroupItem value={scheme.id} id={scheme.id} />
              <Label htmlFor={scheme.id} className="font-normal cursor-pointer">
                <div>
                  <div className="font-medium">{scheme.name}</div>
                  <div className="text-sm text-muted-foreground">{scheme.description}</div>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label>Accent Color</Label>
        <RadioGroup value={designPrefs?.accentColor || "blue"} onValueChange={handleAccentColorChange}>
          <div className="grid grid-cols-3 gap-4">
            {accentColors.map((color) => (
              <div key={color.id} className="flex items-center space-x-3 space-y-0">
                <RadioGroupItem value={color.id} id={`color-${color.id}`} />
                <Label htmlFor={`color-${color.id}`} className="font-normal cursor-pointer flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${color.color}`} />
                  {color.name}
                </Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label>Font Style</Label>
        <RadioGroup value={designPrefs?.fontPreference || "modern"} onValueChange={handleFontChange}>
          {fontPreferences.map((font) => (
            <div key={font.id} className="flex items-center space-x-3 space-y-0">
              <RadioGroupItem value={font.id} id={`font-${font.id}`} />
              <Label htmlFor={`font-${font.id}`} className="font-normal cursor-pointer">
                <div>
                  <div className="font-medium">{font.name}</div>
                  <div className="text-sm text-muted-foreground">{font.description}</div>
                </div>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}
