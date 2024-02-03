export default interface ExifDTO {
  originalDateTime: string
  width?: number
  height?: number
  mimeType: string
  model?: string
  longitude?: string | number
  latitude?: string | number
  // file: File
}
