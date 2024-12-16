export const envConfig = {
  apiBaseUrlNest: import.meta.env.VITE_API_NESTJS_BASE_URL as string,
  v2_apiBaseUrlNest: import.meta.env.VITE_API_NESTJS_BASE_URL_V2 as string,
  apiBaseUrlExpress: import.meta.env.VITE_API_EXPRESS_BASE_URL_PROD as string,
  v2_apiBaseUrlExpress: import.meta.env.VITE_API_EXPRESS_BASE_URL_V2 as string,
  cloudinaryUrl: import.meta.env.VITE_CLOUDINARY_URL as string,
  cloudinaryName: import.meta.env.VITE_CLOUDINARY_NAME as string,
  cloudinaryApiKey: import.meta.env.VITE_CLOUDINARY_API_KEY as string,
  cloudinaryApiSecret: import.meta.env.VITE_CLOUDINARY_API_SECRET as string,
  cloudinaryPreset: import.meta.env.VITE_CLOUDINARY_PRESET as string,
}
