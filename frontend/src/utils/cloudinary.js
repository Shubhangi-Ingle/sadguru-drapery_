// Inserts Cloudinary's auto-format, auto-quality, and width transformations into an image URL
export function optimizeImage(url, width = 600) {
  if (!url || !url.includes('/upload/')) return url
  return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`)
}