import websiteReducer, {
  addWebsite,
  removeWebsite,
  setWebsites,
  setCurrentWebsite,
  updateWebsite,
  startGeneration,
  updateGenerationProgress,
  completeGeneration,
  setGenerationError,
  resetGeneration,
} from "@/lib/store/slices/websiteSlice"

import type { Website } from "@/lib/types/database"

const mockWebsite: Website = {
  id: "1",
  name: "Test site",
  createdAt: "2024-01-01",
  updatedAt: "2024-01-01",
}

describe("websiteSlice reducer", () => {
  it("should return initial state", () => {
    const state = websiteReducer(undefined, { type: "unknown" })

    expect(state).toEqual({
      websites: [],
      currentWebsite: null,
      isGenerating: false,
      generationProgress: 0,
      error: null,
      generatedZipUrl: null,
    })
  })

  it("should handle setWebsites", () => {
    const state = websiteReducer(undefined, setWebsites([mockWebsite]))

    expect(state.websites).toEqual([mockWebsite])
  })

  it("should handle addWebsite", () => {
    const state = websiteReducer(undefined, addWebsite(mockWebsite))

    expect(state.websites).toHaveLength(1)
    expect(state.websites[0]).toEqual(mockWebsite)
  })

  it("should handle setCurrentWebsite", () => {
    const state = websiteReducer(undefined, setCurrentWebsite(mockWebsite))

    expect(state.currentWebsite).toEqual(mockWebsite)
  })

  it("should handle updateWebsite", () => {
    const initialState = {
      websites: [mockWebsite],
      currentWebsite: mockWebsite,
      isGenerating: false,
      generationProgress: 0,
      error: null,
      generatedZipUrl: null,
    }

    const updatedWebsite = { ...mockWebsite, name: "Updated name" }

    const state = websiteReducer(initialState, updateWebsite(updatedWebsite))

    expect(state.websites[0].name).toBe("Updated name")
    expect(state.currentWebsite?.name).toBe("Updated name")
  })

  it("should handle removeWebsite", () => {
    const initialState = {
      websites: [mockWebsite],
      currentWebsite: mockWebsite,
      isGenerating: false,
      generationProgress: 0,
      error: null,
      generatedZipUrl: null,
    }

    const state = websiteReducer(initialState, removeWebsite("1"))

    expect(state.websites).toHaveLength(0)
    expect(state.currentWebsite).toBeNull()
  })

  it("should handle startGeneration", () => {
    const state = websiteReducer(undefined, startGeneration())

    expect(state.isGenerating).toBe(true)
    expect(state.generationProgress).toBe(0)
    expect(state.error).toBeNull()
    expect(state.generatedZipUrl).toBeNull()
  })

  it("should handle updateGenerationProgress", () => {
    const state = websiteReducer(
      undefined,
      updateGenerationProgress(50)
    )

    expect(state.generationProgress).toBe(50)
  })

  it("should handle completeGeneration", () => {
    const initialState = {
      websites: [],
      currentWebsite: null,
      isGenerating: true,
      generationProgress: 50,
      error: null,
      generatedZipUrl: null,
    }

    const state = websiteReducer(
      initialState,
      completeGeneration("blob:url")
    )

    expect(state.isGenerating).toBe(false)
    expect(state.generationProgress).toBe(100)
    expect(state.generatedZipUrl).toBe("blob:url")
  })

  it("should handle setGenerationError", () => {
    const initialState = {
      websites: [],
      currentWebsite: null,
      isGenerating: true,
      generationProgress: 40,
      error: null,
      generatedZipUrl: null,
    }

    const state = websiteReducer(
      initialState,
      setGenerationError("Something went wrong")
    )

    expect(state.isGenerating).toBe(false)
    expect(state.generationProgress).toBe(0)
    expect(state.error).toBe("Something went wrong")
  })

  it("should handle resetGeneration", () => {
    const initialState = {
      websites: [],
      currentWebsite: null,
      isGenerating: true,
      generationProgress: 80,
      error: "Error",
      generatedZipUrl: "blob:url",
    }

    const state = websiteReducer(initialState, resetGeneration())

    expect(state.isGenerating).toBe(false)
    expect(state.generationProgress).toBe(0)
    expect(state.error).toBeNull()
    expect(state.generatedZipUrl).toBeNull()
  })
})
