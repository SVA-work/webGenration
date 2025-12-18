import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Website } from "@/lib/types/database"

interface WebsiteState {
  websites: Website[]
  currentWebsite: Website | null
  isGenerating: boolean
  generationProgress: number
  error: string | null
  generatedZipUrl: string | null
}

const initialState: WebsiteState = {
  websites: [],
  currentWebsite: null,
  isGenerating: false,
  generationProgress: 0,
  error: null,
  generatedZipUrl: null,
}

const websiteSlice = createSlice({
  name: "website",
  initialState,
  reducers: {
    setWebsites: (state, action: PayloadAction<Website[]>) => {
      state.websites = action.payload
    },
    setCurrentWebsite: (state, action: PayloadAction<Website | null>) => {
      state.currentWebsite = action.payload
    },
    addWebsite: (state, action: PayloadAction<Website>) => {
      state.websites.push(action.payload)
    },
    updateWebsite: (state, action: PayloadAction<Website>) => {
      const index = state.websites.findIndex((w) => w.id === action.payload.id)
      if (index !== -1) {
        state.websites[index] = action.payload
      }
      if (state.currentWebsite?.id === action.payload.id) {
        state.currentWebsite = action.payload
      }
    },
    removeWebsite: (state, action: PayloadAction<string>) => {
      state.websites = state.websites.filter((w) => w.id !== action.payload)
      if (state.currentWebsite?.id === action.payload) {
        state.currentWebsite = null
      }
    },
    startGeneration: (state) => {
      state.isGenerating = true
      state.generationProgress = 0
      state.error = null
      state.generatedZipUrl = null
    },
    updateGenerationProgress: (state, action: PayloadAction<number>) => {
      state.generationProgress = action.payload
    },
    completeGeneration: (state, action: PayloadAction<string>) => {
      state.isGenerating = false
      state.generationProgress = 100
      state.generatedZipUrl = action.payload
    },
    setGenerationError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isGenerating = false
      state.generationProgress = 0
    },
    resetGeneration: (state) => {
      state.isGenerating = false
      state.generationProgress = 0
      state.error = null
      state.generatedZipUrl = null
    },
  },
})

export const {
  setWebsites,
  setCurrentWebsite,
  addWebsite,
  updateWebsite,
  removeWebsite,
  startGeneration,
  updateGenerationProgress,
  completeGeneration,
  setGenerationError,
  resetGeneration,
} = websiteSlice.actions

export default websiteSlice.reducer
