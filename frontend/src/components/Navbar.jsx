import { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Catalogue', path: '/catalogue' },
    { name: 'Visit Us', path: '/visit-us' },
    { name: 'About', path: '/about' },
  ]

  return (
   <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="w-full px-3 md:px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Sadguru Drapery" className="h-14 w-14 object-contain" />
          <span className="font-brand text-2xl font-bold text-gray-800 leading-tight">
            Sadguru Drapery
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-gray-700 hover:text-pink-600 font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMobileOpen(!mobileOpen)}
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
        </div>
      )}
    </header>
  )
}

export default Navbar