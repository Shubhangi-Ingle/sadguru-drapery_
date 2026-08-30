import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-[#7A1F2B]/25 to-transparent rounded-full blur-3xl pointer-events-none" />
<div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-tl from-[#7A1F2B]/25 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 flex flex-col items-center text-center relative z-10">
        <span
          className="inline-block bg-[#7A1F2B]/5 border border-[#7A1F2B]/20 text-[#7A1F2B] text-sm font-medium px-4 py-1.5 rounded-full mb-6 animate-fade-up"
          style={{ animationDelay: '0ms' }}
        >
          Costume Collection
        </span>
        <h1
          className="font-impact uppercase text-3xl md:text-5xl leading-tight mb-4 text-gray-900 tracking-wide animate-fade-up"
          style={{ animationDelay: '100ms' }}
        >
          Own The Perfect Costume<br className="hidden md:block" /> For Every Occasion
        </h1>
        <p
          className="font-italic-editorial text-gray-700 text-lg md:text-xl max-w-2xl mb-12 animate-fade-up"
          style={{ animationDelay: '220ms' }}
        >
          Beautifully crafted costumes for every occasion — yours to keep, forever.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '340ms' }}>
          <Link
            to="/catalogue"
            className="bg-[#7A1F2B] hover:bg-[#5C1620] text-white font-semibold px-8 py-3.5 rounded-full transition-colors shadow-lg shadow-[#7A1F2B]/20"
          >
            Shop Catalogue
          </Link>
          <Link
            to="/visit-us"
            className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 font-semibold px-8 py-3.5 rounded-full transition-colors"
          >
            Visit Our Store
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero