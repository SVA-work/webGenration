import { cn } from "@/lib/utils"

describe("cn utility function", () => {
  it("should merge class names correctly", () => {
    const result = cn("text-red-500", "bg-blue-500")
    expect(result).toBe("text-red-500 bg-blue-500")
  })

  it("should handle conditional classes", () => {
    const result = cn("base-class", true && "conditional-class", false && "hidden-class")
    expect(result).toBe("base-class conditional-class")
  })

  it("should resolve Tailwind conflicts", () => {
    const result = cn("px-4", "px-6")
    expect(result).toBe("px-6")
  })

  it("should handle undefined and null values", () => {
    const result = cn("base-class", undefined, null, "another-class")
    expect(result).toBe("base-class another-class")
  })

  it("should handle arrays of classes", () => {
    const result = cn(["class-1", "class-2"], "class-3")
    expect(result).toBe("class-1 class-2 class-3")
  })
})
