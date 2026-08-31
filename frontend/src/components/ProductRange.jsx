import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import { getCategories } from '../api/categories'

const fallbackGradients = [
  'from-[#8B2432] to-[#5C1620]',
  'from-[#C99245] to-[#A9762F]',
  'from-[#2E4A63] to-[#1C2F40]',
  'from-[#7D3A62] to-[#4E2340]',
]

// Keeps every card at roughly 260–290px wide, whatever the category count.
function gridClass(count) {
  if (count <= 2) return 'grid-cols-2 max-w-[34rem] gap-4 sm:gap-5'
  if (count === 3) return 'grid-cols-3 max-w-[52rem] gap-4 sm:gap-5'
  return 'grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5'
}

function ArrowIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      className={className} aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

function ProductRange() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]))
      .finally(() => setLoading(false))
  }, [])

  const count = categories.length

  return (
    <section id="product-range" className="scroll-mt-24 bg-[#FBF3E9]">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-16">

        {/* Header row — copy left, catalogue link right */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-14">
          <div>
            <Reveal>
              <p className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-[#B8863B] mb-4">
                Product range
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="font-display text-[2rem] leading-[1.1] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08] text-gray-900 mb-4 max-w-2xl">
                Built for dance, festivals
                <br className="hidden sm:block" /> and school events.
              </h2>
            </Reveal>

            <Reveal delay={150}>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl">
                Order a single category or mix — minimums apply per design.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200} className="shrink-0">
            <Link
              to="/catalogue"
              className="group inline-flex items-center gap-2 border border-[#7A1F2B]/25 hover:border-[#7A1F2B] bg-white/70 hover:bg-white text-[#7A1F2B] font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              Browse full catalogue
              <ArrowIcon className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        {/* Cards */}
        {loading ? (
          <div className="grid grid-cols-2 max-w-[34rem] gap-4 sm:gap-5">
            {[0, 1].map((i) => (
              <div key={i} className="aspect-[3/4] rounded-xl bg-[#F5E6D3] animate-pulse" />
            ))}
          </div>
        ) : count === 0 ? (
          <p className="text-gray-500">
            Categories are being updated — meanwhile, browse the{' '}
            <Link to="/catalogue" className="font-semibold text-[#7A1F2B] hover:text-[#B8863B] transition-colors">
              full catalogue
            </Link>
            .
          </p>
        ) : (
          <div className={`grid ${gridClass(count)}`}>
            {categories.map((cat, i) => {
              const subs = (cat.subcategories || []).map((s) => s.name)
              return (
                <Reveal key={cat.id} delay={240 + i * 90} y={18}>
                  <Link
                    to={`/catalogue/${cat.id}`}
                    className="group relative block aspect-[3/4] rounded-xl overflow-hidden ring-1 ring-inset ring-[#B8863B]/20 hover:ring-[#B8863B]/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#7A1F2B]/10 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#B8863B]/50"
                  >
                    {cat.cover_image_url ? (
                      <img
                        src={cat.cover_image_url}
                        alt={cat.name}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.07]"
                      />
                    ) : (
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${
                          fallbackGradients[i % fallbackGradients.length]
                        }`}
                      />
                    )}

                    {/* scrim, bottom half only */}
                    <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#24080C] via-[#24080C]/60 to-transparent" />

                    {/* corner arrow — fades in on hover */}
                    <span className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm ring-1 ring-white/25 text-white flex items-center justify-center opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </span>

                    <div className="absolute inset-x-0 bottom-0 p-3.5 sm:p-4">
                      {subs.length > 0 && (
                        <p className="text-[9px] sm:text-[10px] font-semibold tracking-[0.14em] uppercase text-[#E8C88A] mb-1.5 line-clamp-1">
                          {subs.slice(0, 2).join(' · ')}
                        </p>
                      )}
                      <h3 className="font-display-sm text-sm sm:text-base text-white leading-snug line-clamp-2">
                        {cat.name}
                      </h3>
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        )}

      </div>
    </section>
  )
}

export default ProductRange