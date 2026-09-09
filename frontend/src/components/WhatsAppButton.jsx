import { trackEvent } from '../utils/analytics'
function WhatsAppButton() {
  const phoneNumber = "918552887919"
  const message = "Hi! I'm interested in renting a costume."

  return (
    <a
      
  href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
  target="_blank"
  rel="noopener noreferrer"
  onClick={() => trackEvent('whatsapp_click', { source: 'floating_button' })}
  className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg z-50 transition-transform hover:scale-110"
  aria-label="Chat on WhatsApp"
>
      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.99.582 3.842 1.582 5.4L2 22l4.75-1.567A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.524 2 12.001 2zm0 18.2c-1.75 0-3.377-.51-4.75-1.386l-.34-.213-3.263 1.077 1.09-3.18-.222-.354A8.176 8.176 0 013.8 12c0-4.532 3.669-8.2 8.201-8.2 4.531 0 8.2 3.668 8.2 8.2 0 4.532-3.669 8.2-8.2 8.2z" />
      </svg>
    </a>
  )
}

export default WhatsAppButton