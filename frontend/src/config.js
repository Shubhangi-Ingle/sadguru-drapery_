export const WHATSAPP_NUMBER = '918552887919'
export const PHONE_DISPLAY = '+91 85528 87919'
export const HOURS = '10:00 AM – 8:00 PM, all days'
export const ADDRESS = 'Borade Vasti, Moshi, Pimpri-Chinchwad, Maharashtra 411070'

export const quoteHref = (context = '') => {
  const msg = context
    ? `Hi! I'd like a bulk quote for ${context}.`
    : "Hi! I'd like a bulk quote for costumes."
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
}