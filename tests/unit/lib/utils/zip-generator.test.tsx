import { createZipFile, triggerDownload } from "@/lib/utils/zip-generator"
import JSZip from "jszip"

jest.mock("jszip", () => {
  return jest.fn().mockImplementation(() => ({
    file: jest.fn().mockReturnThis(),
    folder: jest.fn().mockReturnThis(),
    generateAsync: jest.fn().mockResolvedValue(new Blob()),
  }))
})

describe("zip-generator utilities", () => {
  describe("createZipFile", () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    it("should create a zip file with HTML content", async () => {
      const files = {
        "index.html": "<html><body>Test</body></html>",
      }

      const result = await createZipFile(files)

      const zipInstance = (JSZip as jest.Mock).mock.results[0].value

      expect(zipInstance.file).toHaveBeenCalledWith("index.html", files["index.html"])
      expect(zipInstance.generateAsync).toHaveBeenCalledWith({ type: "blob" })
      expect(result).toBeInstanceOf(Blob)
    })

    it("should create a zip file with HTML and CSS", async () => {
      const files = {
        "index.html": "<html></html>",
        "styles.css": "body { margin: 0; }",
      }

      await createZipFile(files)

      const zipInstance = (JSZip as jest.Mock).mock.results[0].value

      expect(zipInstance.file).toHaveBeenCalledWith("index.html", files["index.html"])
      expect(zipInstance.file).toHaveBeenCalledWith("styles.css", files["styles.css"])
    })

    it("should work with arbitrary file names", async () => {
      const files = {
        html: "<html></html>",
        css: "body {}",
      }

      await createZipFile(files)

      const zipInstance = (JSZip as jest.Mock).mock.results[0].value

      expect(zipInstance.file).toHaveBeenCalledWith("html", files.html)
      expect(zipInstance.file).toHaveBeenCalledWith("css", files.css)
    })
  })

  describe("triggerDownload", () => {
    let createElementSpy: jest.SpyInstance
    let clickSpy: jest.Mock

    beforeEach(() => {
      clickSpy = jest.fn()

      const mockAnchor = {
        href: "",
        download: "",
        click: clickSpy,
        style: { display: "" },
      }

      createElementSpy = jest
        .spyOn(document, "createElement")
        .mockReturnValue(mockAnchor as any)

      global.URL.createObjectURL = jest.fn().mockReturnValue("blob:mock-url")
      global.URL.revokeObjectURL = jest.fn()

      document.body.appendChild = jest.fn()
      document.body.removeChild = jest.fn()
    })

    afterEach(() => {
      createElementSpy.mockRestore()
      jest.clearAllMocks()
    })

    it("should create a download link with correct filename", () => {
      const blob = new Blob(["test"])
      const filename = "website.zip"

      triggerDownload(blob, filename)

      const mockAnchor = createElementSpy.mock.results[0].value
      expect(mockAnchor.download).toBe(filename)
    })

    it("should trigger click on anchor element", () => {
      const blob = new Blob(["test"])

      triggerDownload(blob, "test.zip")

      expect(clickSpy).toHaveBeenCalled()
    })

    it("should create object URL for blob", () => {
      const blob = new Blob(["test"])

      triggerDownload(blob, "test.zip")

      expect(URL.createObjectURL).toHaveBeenCalledWith(blob)
    })

    it("should revoke object URL after download", () => {
      const blob = new Blob(["test"])

      triggerDownload(blob, "test.zip")

      expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:mock-url")
    })
  })
})
