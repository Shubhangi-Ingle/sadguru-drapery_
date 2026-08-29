import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-24 flex flex-col items-center text-center relative z-10">
        <span className="inline-block bg-pink-50 border border-pink-200 text-pink-600 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          Costume Rentals
        </span>
        <h1 className="font-brand text-4xl md:text-6xl font-bold leading-tight mb-4 text-gray-900">
          Rent the Perfect Costume<br className="hidden md:block" /> for Every Occasion
        </h1>
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mb-8">
          Beautifully crafted costumes for every occasion — available to rent,
          no need to buy. Browse our full collection and find your perfect look.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/catalogue"
            className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-3.5 rounded-full transition-colors shadow-lg shadow-pink-600/20"
          >
            Browse Catalogue
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