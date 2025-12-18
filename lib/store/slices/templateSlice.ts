import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { Template } from "@/lib/types/database"

interface TemplateState {
  templates: Template[]
  selectedTemplateId: string | null
  selectedTemplate: Template | null
  isLoading: boolean
  error: string | null
  filters: {
    category: string | null
    isAiGenerated: boolean | null
  }
}

const initialState: TemplateState = {
  templates: [],
  selectedTemplateId: null,
  selectedTemplate: null,
  isLoading: false,
  error: null,
  filters: {
    category: null,
    isAiGenerated: null,
  },
}

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    setTemplates: (state, action: PayloadAction<Template[]>) => {
      state.templates = action.payload
      state.isLoading = false
      state.error = null
    },
    selectTemplate: (state, action: PayloadAction<string>) => {
      state.selectedTemplateId = action.payload
      state.selectedTemplate = state.templates.find((t) => t.id === action.payload) || null
    },
    selectTemplateObject: (state, action: PayloadAction<Template>) => {
      state.selectedTemplate = action.payload
      state.selectedTemplateId = action.payload.id
    },
    clearSelectedTemplate: (state) => {
      state.selectedTemplateId = null
      state.selectedTemplate = null
    },
    setTemplateLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setTemplateError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.isLoading = false
    },
    setCategoryFilter: (state, action: PayloadAction<string | null>) => {
      state.filters.category = action.payload
    },
    setAiGeneratedFilter: (state, action: PayloadAction<boolean | null>) => {
      state.filters.isAiGenerated = action.payload
    },
    clearFilters: (state) => {
      state.filters = initialState.filters
    },
  },
})

export const {
  setTemplates,
  selectTemplate,
  selectTemplateObject,
  clearSelectedTemplate,
  setTemplateLoading,
  setTemplateError,
  setCategoryFilter,
  setAiGeneratedFilter,
  clearFilters,
} = templateSlice.actions

export default templateSlice.reducer
