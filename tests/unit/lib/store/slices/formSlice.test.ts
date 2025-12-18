import formReducer, {
  setCurrentStep,
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
} from "@/lib/store/slices/formSlice"

describe("formSlice reducer", () => {
  const initialState = {
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

  it("should return initial state", () => {
    expect(formReducer(undefined, { type: "unknown" })).toEqual(initialState)
  })

  it("should handle setCurrentStep", () => {
    const state = formReducer(initialState, setCurrentStep(2))
    expect(state.currentStep).toBe(2)
  })

  it("should handle nextStep", () => {
    const state = formReducer(initialState, nextStep())
    expect(state.currentStep).toBe(1)
  })

  it("should handle previousStep", () => {
    const currentState = { ...initialState, currentStep: 2 }
    const state = formReducer(currentState, previousStep())
    expect(state.currentStep).toBe(1)
  })

  it("should not go below step 0 with previousStep", () => {
    const state = formReducer(initialState, previousStep())
    expect(state.currentStep).toBe(0)
  })

  it("should handle setPersonalInfo", () => {
    const personalInfo = {
      fullName: "John Doe",
      tagline: "Software Developer",
      bio: "Passionate about coding",
    }
    const state = formReducer(initialState, setPersonalInfo(personalInfo))
    expect(state.formData.personal).toEqual(personalInfo)
  })

  it("should handle setContactInfo", () => {
    const contactInfo = {
      email: "john@example.com",
      phone: "+1234567890",
    }
    const state = formReducer(initialState, setContactInfo(contactInfo))
    expect(state.formData.contact).toEqual(contactInfo)
  })

  it("should handle setSocialLinks", () => {
    const socialLinks = {
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/in/johndoe",
    }
    const state = formReducer(initialState, setSocialLinks(socialLinks))
    expect(state.formData.social).toEqual(socialLinks)
  })

  it("should handle setProfessionalInfo", () => {
    const professionalInfo = {
      skills: ["JavaScript", "React", "Node.js"],
      experience: "5 years",
    }
    const state = formReducer(initialState, setProfessionalInfo(professionalInfo))
    expect(state.formData.professional).toEqual(professionalInfo)
  })

  it("should handle setDesignPreferences", () => {
    const designPrefs = {
      theme: "dark",
      primaryColor: "#3b82f6",
    }
    const state = formReducer(initialState, setDesignPreferences(designPrefs))
    expect(state.formData.design).toEqual(designPrefs)
  })

  it("should handle setFormErrors", () => {
    const errors = { fullName: "Name is required", email: "Invalid email" }
    const state = formReducer(initialState, setFormErrors(errors))
    expect(state.errors).toEqual(errors)
  })

  it("should handle clearFormErrors", () => {
    const stateWithErrors = { ...initialState, errors: { fullName: "Required" } }
    const state = formReducer(stateWithErrors, clearFormErrors())
    expect(state.errors).toEqual({})
  })

  it("should handle completeForm", () => {
    const state = formReducer(initialState, completeForm())
    expect(state.isComplete).toBe(true)
  })

  it("should handle resetForm", () => {
    const modifiedState = {
      currentStep: 3,
      formData: {
        personal: { fullName: "John", tagline: "Dev", bio: "Test" },
        contact: { email: "test@test.com" },
        social: { github: "test" },
        professional: { skills: ["JS"] },
        design: { theme: "dark" },
      },
      isComplete: true,
      errors: { test: "error" },
    }
    const state = formReducer(modifiedState, resetForm())
    expect(state).toEqual(initialState)
  })

  it("should merge partial updates in setPersonalInfo", () => {
    const stateWithData = {
      ...initialState,
      formData: {
        ...initialState.formData,
        personal: { fullName: "John", tagline: "Dev", bio: "Test" },
      },
    }
    const state = formReducer(stateWithData, setPersonalInfo({ fullName: "Jane" }))
    expect(state.formData.personal).toEqual({
      fullName: "Jane",
      tagline: "Dev",
      bio: "Test",
    })
  })
})
