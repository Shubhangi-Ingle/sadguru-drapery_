import { Link } from 'react-router-dom'

const stats = [
  { value: "13+", label: "Years in Business" },
  { value: "4.7★", label: "Customer Rating" },
  { value: "700+", label: "Happy Customers" },
]

const reasons = [
  {
    title: "Wide Collection",
    description: "From dance performances to festive occasions — a costume for every event.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    title: "Affordable Renting",
    description: "No need to buy a costume for one-time use — rent, wear, return.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" strokeWidth={1.8} />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v8m-2.5-6c0-1.1 1.12-2 2.5-2s2.5.9 2.5 2c0 1.5-2.5 1.5-2.5 3s2.5 1.5 2.5 3-1.12 2-2.5 2-2.5-.9-2.5-2" />
      </svg>
    ),
  },
  {
    title: "Quality You Can Trust",
    description: "Every costume is well-maintained and checked before it goes out.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Personal In-Store Support",
    description: "Visit us and get help finding the right fit and style, in person.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 100-8 4 4 0 000 8zm6 4v-2a4 4 0 00-3-3.87m0-4.13a4 4 0 11-8 0" />
      </svg>
    ),
  },
]

function About() {
  return (
    <div className="bg-gradient-to-b from-pink-50 via-white to-white">
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-14">
        {/* Story + Owner photos, side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start mb-14">
          <div>
            <h1 className="font-brand text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Our Story
            </h1>
            <p className="text-gray-600 leading-relaxed">
              Sadguru Drapery has been dressing up dancers, kids, and families across Pune for over 13 years.
              What started as a small costume collection has grown into a trusted destination for dance
              costumes, festive wear, kids' fancy dress, and photoshoot outfits — all available to rent,
              so you never have to spend on something you'll wear once.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden border border-gray-200 mb-3">
                <img src="/rajendra-ingle.jpg" alt="Rajendra Ingle" className="w-full h-full object-cover" />
              </div>
              <p className="font-medium text-gray-800 text-sm">Rajendra Ingle</p>
              <p className="text-xs text-gray-500">Owner</p>
            </div>
            <div className="text-center">
              <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden border border-gray-200 mb-3">
                <img src="/priyanka-ingle.jpg" alt="Priyanka Ingle" className="w-full h-full object-cover" />
              </div>
              <p className="font-medium text-gray-800 text-sm">Priyanka Ingle</p>
              <p className="text-xs text-gray-500">Owner</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-14">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white border border-gray-200 rounded-2xl py-5 text-center">
              <p className="font-brand text-xl md:text-2xl font-bold text-pink-600">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Why choose us */}
        <h2 className="font-brand text-xl md:text-2xl font-bold text-gray-900 text-center mb-8">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 mb-12">
          {reasons.map((reason) => (
            <div key={reason.title} className="bg-white border border-gray-200 rounded-2xl p-5">
              <div className="w-11 h-11 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center mb-3">
                {reason.icon}
              </div>
              <p className="font-medium text-gray-800 mb-1">{reason.title}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/catalogue"
            className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold px-8 py-3 rounded-full text-sm transition-colors"
          >
            Browse Our Catalogue
          </Link>
        </div>
      </div>
    </div>
  )
}

export default About