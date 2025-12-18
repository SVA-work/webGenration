import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { FormData } from "@/lib/types/database"

interface FormState {
  currentStep: number
  formData: Partial<FormData>
  isComplete: boolean
  errors: Record<string, string>
}

const initialState: FormState = {
  currentStep: 0,
  formData: {
    personal: {
      fullName: "",
      tagline: "",
      bio: "",
    },
    contact: {
      email: "",
    },
    social: {},
    professional: {
      skills: [],
    },
    design: {},
  },
  isComplete: false,
  errors: {},
}

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.currentStep = action.payload
    },
    updateFormData: (state, action: PayloadAction<Partial<FormData>>) => {
      state.formData = {
        ...state.formData,
        ...action.payload,
      }
    },
    setPersonalInfo: (state, action: PayloadAction<Partial<FormData["personal"]>>) => {
      state.formData.personal = {
        ...state.formData.personal,
        ...action.payload,
      }
    },
    setContactInfo: (state, action: PayloadAction<Partial<FormData["contact"]>>) => {
      state.formData.contact = {
        ...state.formData.contact,
        ...action.payload,
      }
    },
    setSocialLinks: (state, action: PayloadAction<Partial<FormData["social"]>>) => {
      state.formData.social = {
        ...state.formData.social,
        ...action.payload,
      }
    },
    setProfessionalInfo: (state, action: PayloadAction<Partial<FormData["professional"]>>) => {
      state.formData.professional = {
        ...state.formData.professional,
        ...action.payload,
      }
    },
    setDesignPreferences: (state, action: PayloadAction<Partial<FormData["design"]>>) => {
      state.formData.design = {
        ...state.formData.design,
        ...action.payload,
      }
    },
    setFormErrors: (state, action: PayloadAction<Record<string, string>>) => {
      state.errors = action.payload
    },
    clearFormErrors: (state) => {
      state.errors = {}
    },
    resetForm: (state) => {
      state.currentStep = 0
      state.formData = initialState.formData
      state.isComplete = false
      state.errors = {}
    },
    completeForm: (state) => {
      state.isComplete = true
    },
    nextStep: (state) => {
      state.currentStep += 1
    },
    previousStep: (state) => {
      if (state.currentStep > 0) {
        state.currentStep -= 1
      }
    },
  },
})

export const {
  setCurrentStep,
  updateFormData,
  setPersonalInfo,
  setContactInfo,
  setSocialLinks,
  setProfessionalInfo,
  setDesignPreferences,
  setFormErrors,
  clearFormErrors,
  resetForm,
  completeForm,
  nextStep,
  previousStep,
} = formSlice.actions

export default formSlice.reducer
