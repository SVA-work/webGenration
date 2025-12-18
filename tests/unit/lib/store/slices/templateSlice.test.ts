import templateReducer, {
  setTemplates,
  selectTemplate,
  selectTemplateObject,
  clearSelectedTemplate,
  setTemplateLoading,
  setTemplateError,
  setCategoryFilter,
  setAiGeneratedFilter,
  clearFilters,
} from "@/lib/store/slices/templateSlice"

import type { Template } from "@/lib/types/database"

const mockTemplate: Template = {
  id: "modern",
  name: "Modern Portfolio",
  description: "A clean and modern portfolio design",
  preview: "/templates/modern-preview.png",
  category: "portfolio",
  isAiGenerated: false,
}

describe("templateSlice reducer", () => {
  it("should return initial state", () => {
    const state = templateReducer(undefined, { type: "unknown" })

    expect(state).toEqual({
      templates: [],
      selectedTemplateId: null,
      selectedTemplate: null,
      isLoading: false,
      error: null,
      filters: {
        category: null,
        isAiGenerated: null,
      },
    })
  })

  it("should handle setTemplates", () => {
    const state = templateReducer(undefined, setTemplates([mockTemplate]))

    expect(state.templates).toEqual([mockTemplate])
    expect(state.isLoading).toBe(false)
    expect(state.error).toBeNull()
  })

  it("should handle selectTemplate by id", () => {
    const initialState = {
      templates: [mockTemplate],
      selectedTemplateId: null,
      selectedTemplate: null,
      isLoading: false,
      error: null,
      filters: {
        category: null,
        isAiGenerated: null,
      },
    }

    const state = templateReducer(initialState, selectTemplate("modern"))

    expect(state.selectedTemplateId).toBe("modern")
    expect(state.selectedTemplate).toEqual(mockTemplate)
  })

  it("should set selectedTemplate to null if id not found", () => {
    const initialState = {
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

    const state = templateReducer(initialState, selectTemplate("unknown"))

    expect(state.selectedTemplate).toBeNull()
  })

  it("should handle selectTemplateObject", () => {
    const state = templateReducer(undefined, selectTemplateObject(mockTemplate))

    expect(state.selectedTemplate).toEqual(mockTemplate)
    expect(state.selectedTemplateId).toBe(mockTemplate.id)
  })

  it("should handle clearSelectedTemplate", () => {
    const initialState = {
      templates: [mockTemplate],
      selectedTemplateId: "modern",
      selectedTemplate: mockTemplate,
      isLoading: false,
      error: null,
      filters: {
        category: null,
        isAiGenerated: null,
      },
    }

    const state = templateReducer(initialState, clearSelectedTemplate())

    expect(state.selectedTemplate).toBeNull()
    expect(state.selectedTemplateId).toBeNull()
  })

  it("should handle setTemplateLoading", () => {
    const state = templateReducer(undefined, setTemplateLoading(true))

    expect(state.isLoading).toBe(true)
  })

  it("should handle setTemplateError", () => {
    const state = templateReducer(
      { ...templateReducer(undefined, { type: "unknown" }), isLoading: true },
      setTemplateError("Failed to load templates")
    )

    expect(state.error).toBe("Failed to load templates")
    expect(state.isLoading).toBe(false)
  })

  it("should handle setCategoryFilter", () => {
    const state = templateReducer(undefined, setCategoryFilter("portfolio"))

    expect(state.filters.category).toBe("portfolio")
  })

  it("should handle setAiGeneratedFilter", () => {
    const state = templateReducer(undefined, setAiGeneratedFilter(true))

    expect(state.filters.isAiGenerated).toBe(true)
  })

  it("should handle clearFilters", () => {
    const initialState = {
      templates: [],
      selectedTemplateId: null,
      selectedTemplate: null,
      isLoading: false,
      error: null,
      filters: {
        category: "portfolio",
        isAiGenerated: true,
      },
    }

    const state = templateReducer(initialState, clearFilters())

    expect(state.filters).toEqual({
      category: null,
      isAiGenerated: null,
    })
  })
})
