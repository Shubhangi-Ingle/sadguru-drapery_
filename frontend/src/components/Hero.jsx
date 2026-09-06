import { Link } from 'react-router-dom'
import Reveal from './Reveal'
import { quoteHref } from '../config'

const popularProducts = [
  { title: 'Dance Costume Sets', subtitle: 'Bharatanatyam, folk, stage' },
  { title: 'Dhoti-Kurta Sets', subtitle: 'Boys, mirror & print work' },
  { title: 'Patriotic / Theme', subtitle: 'Tricolor, Independence Day' },
  { title: 'Kids Fancy Dress', subtitle: 'Lehenga, frocks, characters' },
]

const stats = [
  { value: '13+', label: 'Years in the trade' },
  { value: '700+', label: 'Google reviews' },
  { value: '500+', label: 'Costumes / month capacity' },
  { value: 'In-house', label: 'Own manufacturing unit' },
]

function WhatsAppIcon({ className = 'w-4 h-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.896 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.886-9.885 9.886m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function Hero() {
  const whatsappHref = quoteHref('bulk/wholesale costume orders')

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FDF8F1] via-white to-[#FBF3E9]">
      {/* dot-grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#7A1F2B 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 20%, transparent 75%)',
          opacity: 0.06,
        }}
      />

      {/* soft brand glows */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -left-24 w-80 h-80 md:w-[28rem] md:h-[28rem] bg-gradient-to-br from-[#7A1F2B]/20 via-[#B8863B]/10 to-transparent rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -right-24 w-80 h-80 md:w-[28rem] md:h-[28rem] bg-gradient-to-tl from-[#B8863B]/20 via-[#7A1F2B]/8 to-transparent rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ── Left: headline + CTAs (animates on mount) ── */}
          <div>
           

            <h1
              className="rise font-display text-[2.15rem] leading-[1.08] sm:text-5xl lg:text-[3.75rem] lg:leading-[1.06] text-gray-900 mb-5"
              style={{ animationDelay: '90ms' }}
            >
              Costumes, made in{' '}
              <span className="inline-block bg-gradient-to-r from-[#7A1F2B] via-[#9c3444] to-[#B8863B] bg-clip-text text-transparent pb-[0.06em]">
                bulk
              </span>
              
              <br />
              Made to{' '}
              <span className="inline-block italic bg-gradient-to-r from-[#B8863B] via-[#c9954a] to-[#7A1F2B] bg-clip-text text-transparent pb-[0.06em]">
                your design
              </span>
              .
            </h1>

            <p
              className="rise text-gray-600 text-base sm:text-lg leading-relaxed mb-7 max-w-lg"
              style={{ animationDelay: '190ms' }}
            >
              In-house manufacturing of dance costumes, dhoti-kurta sets, patriotic themes
              and kids' fancy dress — supplying rental stores, boutiques, schools and dance
              academies across India.
            </p>

            {/* CTAs: 2-up grid on mobile, inline row on larger screens */}
            <div
              className="rise grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3"
              style={{ animationDelay: '280ms' }}
            >
              <Link
                to="/catalogue"
                className="btn-shine flex items-center justify-center gap-2 bg-gradient-to-r from-[#C99245] to-[#A9762F] hover:from-[#B8863B] hover:to-[#8f6327] text-white font-semibold text-sm sm:text-base px-4 py-3 sm:px-7 sm:py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-[#B8863B]/30 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <span className="sm:hidden">Catalogue</span>
                <span className="hidden sm:inline">View Full Catalogue</span>
              </Link>

                           <Link
                to="/#quote"
                className="btn-shine flex items-center justify-center bg-gradient-to-r from-[#8B2432] to-[#5C1620] hover:from-[#7A1F2B] hover:to-[#4a1119] text-white font-semibold text-sm sm:text-base px-4 py-3 sm:px-7 sm:py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-[#7A1F2B]/25 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <span className="sm:hidden">Bulk Quote</span>
                <span className="hidden sm:inline">Request Bulk Quote</span>
              </Link>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 sm:col-auto flex items-center justify-center gap-2 border border-green-600/30 bg-white/80 backdrop-blur-sm hover:bg-green-50 text-green-800 font-semibold text-sm sm:text-base px-4 py-3 sm:px-6 sm:py-3.5 rounded-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <WhatsAppIcon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                Chat on WhatsApp
              </a>
            </div>

            <p className="rise text-xs text-gray-500 mt-5" style={{ animationDelay: '370ms' }}>
              Moshi, Pune · Ships pan-India · Custom designs on request
            </p>
          </div>

          {/* ── Right: popular products card (reveals on scroll) ── */}
          <Reveal
            delay={120}
            className="rounded-[1.05rem] bg-gradient-to-br from-[#B8863B]/40 via-[#7A1F2B]/15 to-transparent p-px shadow-xl shadow-[#7A1F2B]/5"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 sm:p-6">
              <p className="font-display-sm text-lg text-gray-900 mb-0.5">
                Popular for resale &amp; rental stock
              </p>
              <p className="text-sm text-gray-500 mb-5">
                A few of 500+ designs — wholesale rates on quantity.
              </p>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {popularProducts.map((item, i) => (
                  <Reveal
                    key={item.title}
                    delay={220 + i * 90}
                    y={16}
                    className="bg-gradient-to-br from-[#FBF3E9] to-[#F5E6D3] border border-[#B8863B]/10 rounded-xl p-3.5 sm:p-4 hover:border-[#B8863B]/40 hover:shadow-md hover:shadow-[#B8863B]/10"
                  >
                    <p className="font-semibold text-gray-900 text-sm mb-1">{item.title}</p>
                    <p className="text-xs text-gray-500 mb-3">{item.subtitle}</p>
                    <p className="text-[11px] font-semibold text-[#7A1F2B]">Bulk rate on quote</p>
                  </Reveal>
                ))}
              </div>

                          <Link
              to="/design-gallery"
              className="inline-flex items-center gap-1.5 text-[#7A1F2B] font-semibold text-sm hover:gap-2.5 transition-all"
            >
              Browse all designs
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
          </Reveal>
        </div>

        {/* ── Gradient hairline + stats (reveal on scroll, staggered) ── */}
        <div className="mt-12 md:mt-14">
          <Reveal y={0} className="h-px bg-gradient-to-r from-transparent via-[#B8863B]/40 to-transparent" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 pt-8 md:pt-10">
            {stats.map((stat, i) => (
              <Reveal
                key={stat.label}
                delay={i * 110}
                y={20}
                className={`text-center px-2 ${
                  i % 2 === 1 ? 'border-l border-[#B8863B]/15' : ''
                } md:border-l md:first:border-l-0`}
              >
                <p className="font-display text-3xl md:text-4xl bg-gradient-to-br from-[#7A1F2B] to-[#B8863B] bg-clip-text text-transparent">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 mt-1 leading-snug">{stat.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero