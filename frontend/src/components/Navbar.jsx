import { useState } from 'react'
import { Link } from 'react-router-dom'


const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Why Us', path: '/#why-us' },
  { name: 'Product Range', path: '/#product-range' },
  { name: 'How It Works', path: '/#how-it-works' },
  { name: 'Catalogue', path: '/catalogue' },
]

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="w-full px-3 md:px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Sadguru Costume" className="h-14 w-14 object-contain" />
          <span className="leading-tight">
            <span className="block font-brand text-2xl font-bold text-gray-800">
              Sadguru Costume
            </span>
            
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-gray-700 hover:text-[#7A1F2B] font-medium text-[15px] transition-colors"
            >
              {link.name}
            </Link>
          ))}
                    <Link
            to="/#quote"
            className="bg-[#7A1F2B] hover:bg-[#5C1620] text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
          >
            Request Bulk Quote
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t px-4 py-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="block py-2.5 text-gray-700 font-medium border-b last:border-b-0"
              onClick={() => setMobileOpen(false)}
            >
              {link.name}
            </Link>
          ))}
                    <Link
            to="/#quote"
            className="block mt-3 text-center bg-[#7A1F2B] hover:bg-[#5C1620] text-white font-semibold px-5 py-2.5 rounded-full text-sm transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Request Bulk Quote
          </Link>
        </div>
      )}
    </header>
  )
}

export default Navbar