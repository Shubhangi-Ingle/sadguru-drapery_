import Reveal from './Reveal'

function ScissorsIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M20 4 8.12 15.88M14.47 14.48 20 20M8.12 8.12 12 12" />
    </svg>
  )
}

function NeedleIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  )
}

function StackIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
    </svg>
  )
}

function StarIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01Z" />
    </svg>
  )
}

const reasons = [
  {
    Icon: ScissorsIcon,
    title: 'In-House Manufacturing',
    body: 'Our own cutter master and skilled karigars — consistent quality and pricing, no middleman markup.',
  },
  {
    Icon: NeedleIcon,
    title: 'Custom to Your Design',
    body: 'Send a photo or sample. We stitch to your specification, sizes and colours for your market.',
  },
  {
    Icon: StackIcon,
    title: 'Reliable Bulk Capacity',
    body: 'Around 500 costumes a month with dependable lead times — plan your season with confidence.',
  },
  {
    Icon: StarIcon,
    title: '13 Years of Curation',
    body: '700+ reviews and over a decade of rental data guide every design we put into production.',
  },
]

function WhyUs() {
  return (
    <section
      id="why-us"
      className="scroll-mt-24 bg-gradient-to-b from-[#FDF8F1] to-[#FBF3E9]"
    >
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <Reveal>
          <p className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-[#B8863B] mb-4">
            Why buy from Sadguru
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="font-display text-[2rem] leading-[1.1] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08] text-gray-900 mb-5 max-w-2xl">
            A manufacturing partner,
            <br className="hidden sm:block" /> not just a reseller.
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mb-12 md:mb-14">
            Since 2013 we've rented and studied thousands of costumes — so we know
            exactly what sells, and we make it ourselves.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {reasons.map(({ Icon, title, body }, i) => (
            <Reveal
              key={title}
              delay={220 + i * 90}
              y={20}
              className="group bg-white border border-[#B8863B]/12 rounded-2xl p-5 sm:p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#7A1F2B]/5 hover:border-[#B8863B]/35"
            >
              <span className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-[#FBF3E9] border border-[#B8863B]/15 text-[#B8863B] mb-5 transition-colors group-hover:bg-[#F5E6D3]">
                <Icon className="w-5 h-5" />
              </span>
              <h3 className="font-display-sm text-lg text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default WhyUs