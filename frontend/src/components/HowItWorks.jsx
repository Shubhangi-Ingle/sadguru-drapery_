import { Link } from 'react-router-dom'
import Reveal from './Reveal'

const steps = [
    {
        title: 'Share your requirement',
        body: 'Send design photos or a sample with quantities, sizes and your target rate. WhatsApp is fine.',
    },
    {
        title: 'Get your bulk rate',
        body: 'We quote per design, based on quantity, fabric and the amount of work involved.',
    },
    {
        title: 'Approve a sample',
        body: 'We stitch one piece first so you can confirm fabric, fit and finish before production starts.',
    },
    {
        title: 'We produce your order',
        body: 'Cut and stitched in our own unit, tracked against the delivery date we agreed.',
    },
    {
        title: 'Dispatched to you',
        body: 'Packed and sorted by size, then shipped pan-India by transport or courier.',
    },
]

const terms = [
    { label: 'Minimum order', value: '20 pieces per design' },
    { label: 'Typical lead time', value: '15–20 days' },
    { label: 'Sampling', value: 'Charges adjusted in bulk order' },
]

function HowItWorks() {
    return (
        <section id="how-it-works" className="scroll-mt-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">

                <Reveal>
                    <p className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-[#B8863B] mb-4">
                        How bulk ordering works
                    </p>
                </Reveal>

                <Reveal delay={80}>
                    <h2 className="font-display text-[2rem] leading-[1.1] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08] text-gray-900 mb-5 max-w-2xl">
                        From enquiry to delivery,
                        <br className="hidden sm:block" /> in five steps.
                    </h2>
                </Reveal>

                <Reveal delay={150}>
                    <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-2xl mb-14 md:mb-16">
                        No agents, no back-and-forth through a middleman — you deal directly with
                        the unit making your costumes.
                    </p>
                </Reveal>

                {/* Timeline */}
                <div className="relative">
                    {/* connector — horizontal on desktop */}
                    <div
                        aria-hidden="true"
                        className="hidden md:block absolute top-6 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B8863B]/45 to-transparent"
                    />
                    {/* connector — vertical on mobile */}
                    <div
                        aria-hidden="true"
                        className="md:hidden absolute top-6 bottom-8 left-6 w-px bg-gradient-to-b from-[#B8863B]/45 via-[#B8863B]/30 to-transparent"
                    />

                    <div className="grid md:grid-cols-5 gap-y-8 md:gap-x-6">
                        {steps.map((step, i) => (
                            <Reveal
                                key={step.title}
                                delay={220 + i * 100}
                                y={18}
                                className="relative flex md:block gap-4 md:gap-0"
                            >
                                <span className="relative z-10 shrink-0 w-12 h-12 rounded-full bg-white ring-1 ring-[#B8863B]/35 shadow-sm flex items-center justify-center">
                                    <span className="font-display text-lg text-[#B8863B] leading-none pt-0.5">
                                        {i + 1}
                                    </span>
                                </span>

                                <div className="md:mt-6 md:pr-4">
                                    <h3 className="font-display-sm text-base sm:text-lg text-gray-900 mb-1.5 leading-snug">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{step.body}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>

                {/* Terms strip + CTA */}
                <Reveal delay={760} y={20}>
                    <div className="mt-14 md:mt-16 rounded-2xl bg-gradient-to-br from-[#FDF8F1] to-[#FBF3E9] border border-[#B8863B]/15 p-6 sm:p-8">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 flex-1">
                                {terms.map((term) => (
                                    <div key={term.label}>
                                        <p className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[#B8863B] mb-1.5">
                                            {term.label}
                                        </p>
                                        <p className="text-sm font-semibold text-gray-900 leading-snug">
                                            {term.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <Link
                                to="/#quote"
                                className="btn-shine shrink-0 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#8B2432] to-[#5C1620] hover:from-[#7A1F2B] hover:to-[#4a1119] text-white font-semibold text-sm sm:text-base px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg shadow-[#7A1F2B]/25 hover:-translate-y-0.5 hover:shadow-xl"
                            >
                                Request Bulk Quote
                                <svg
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                                    className="w-4 h-4" aria-hidden="true"
                                >
                                    <path d="M5 12h14M13 6l6 6-6 6" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </Reveal>

            </div>
        </section>
    )
}

export default HowItWorks