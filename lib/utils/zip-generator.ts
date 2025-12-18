import JSZip from "jszip"

export async function createZipFile(files: Record<string, string>): Promise<Blob> {
  const zip = new JSZip()

  Object.entries(files).forEach(([path, content]) => {
    zip.file(path, content)
  })

  return await zip.generateAsync({ type: "blob" })
}

export function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
