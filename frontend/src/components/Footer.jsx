import { Link } from 'react-router-dom'
import { WHATSAPP_NUMBER, PHONE_DISPLAY, ADDRESS } from '../config'

const instagramUrl = 'https://www.instagram.com/sadguru_costumes/'

const links = [
  { name: 'Catalogue', to: '/catalogue' },
  { name: 'Why Us', to: '/#why-us' },
  { name: 'How It Works', to: '/#how-it-works' },
  { name: 'Get a Quote', to: '/#quote' },
]

function Footer() {
  return (
    <footer className="bg-[#2B0A0F] text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-8">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5 mb-2.5">
              <img src="/logo.png" alt="" className="h-9 w-9 object-contain" />
              <span className="font-brand text-lg font-bold text-white">Sadguru Costume</span>
            </div>
            <p className="text-[13px] leading-relaxed">
              Costume manufacturer and bulk supplier — dance, festive and school event
              wear, made in-house at Moshi, Pune.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2.5">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-[13px] font-medium hover:text-[#E8C88A] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/8 hover:bg-[#B8863B] flex items-center justify-center hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-[17px] h-[17px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth={1.8} />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 11.37a4 4 0 11-7.914 1.174A4 4 0 0116 11.37z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.5 6.5h.01" />
              </svg>
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/8 hover:bg-[#20A44E] flex items-center justify-center hover:text-white transition-colors"
              aria-label="WhatsApp"
            >
              <svg className="w-[17px] h-[17px]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.99.582 3.842 1.582 5.4L2 22l4.75-1.567A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.524 2 12.001 2zm0 18.2c-1.75 0-3.377-.51-4.75-1.386l-.34-.213-3.263 1.077 1.09-3.18-.222-.354A8.176 8.176 0 013.8 12c0-4.532 3.669-8.2 8.201-8.2 4.531 0 8.2 3.668 8.2 8.2 0 4.532-3.669 8.2-8.2 8.2z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p className="text-center sm:text-left">
            {ADDRESS} ·{' '}
            <a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:text-[#E8C88A] transition-colors">
              {PHONE_DISPLAY}
            </a>
          </p>
          <p>&copy; {new Date().getFullYear()} Sadguru Costume</p>
        </div>

      </div>
    </footer>
  )
}

export default Footer