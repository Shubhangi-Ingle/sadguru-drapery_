import { useState, useEffect } from 'react'
import Reveal from './Reveal'
import { getCategories } from '../api/categories'
import { WHATSAPP_NUMBER, PHONE_DISPLAY, HOURS, ADDRESS } from '../config'
import { trackEvent } from '../utils/analytics'

const quantities = ['1–9 (sample)', '10–24', '25–49', '50–99', '100+']

const contactRows = [
  { label: 'Call', value: PHONE_DISPLAY, href: `tel:+${WHATSAPP_NUMBER}` },
  { label: 'Hours', value: HOURS },
  { label: 'Unit', value: ADDRESS },
]

const fieldClass =
  'w-full rounded-lg border border-[#B8863B]/25 bg-[#FDF8F1] px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-colors focus:outline-none focus:border-[#7A1F2B] focus:ring-4 focus:ring-[#7A1F2B]/10'

const selectClass = `${fieldClass} appearance-none bg-[url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")] bg-[length:16px] bg-[right_0.75rem_center] bg-no-repeat pr-9`

const labelClass = 'block text-xs font-medium text-gray-600 mb-1'

function GetQuote() {
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({
    name: '', business: '', city: '', phone: '',
    category: '', quantity: quantities[1], message: '',
  })
  const [error, setError] = useState('')

  useEffect(() => {
    getCategories().then(setCategories).catch(() => setCategories([]))
  }, [])

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.name.trim() || !form.city.trim()) {
      setError('Please add your name and city so we can quote correctly.')
      return
    }
    setError('')

    const lines = [
      'Bulk quote enquiry — Sadguru Costume',
      '',
      `Name: ${form.name.trim()}`,
      form.business.trim() && `Business: ${form.business.trim()}`,
      `City: ${form.city.trim()}`,
      form.phone.trim() && `Phone: ${form.phone.trim()}`,
      form.category && `Category: ${form.category}`,
      `Quantity: ${form.quantity}`,
      form.message.trim() && `\nDetails: ${form.message.trim()}`,
    ].filter(Boolean)

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`
    trackEvent('quote_form_submit')
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="quote" className="scroll-mt-24 bg-gradient-to-b from-[#FBF3E9] to-[#F7EADB]">
      <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* Left — pitch + contact */}
          <div>
            <Reveal>
              <p className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-[#B8863B] mb-4">
                Get a quote
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h2 className="font-display text-[2rem] leading-[1.1] sm:text-4xl lg:text-[2.6rem] lg:leading-[1.08] text-gray-900 mb-4">
                Tell us what you need.
              </h2>
            </Reveal>

            <Reveal delay={150}>
              <p className="text-gray-600 text-base leading-relaxed mb-8 max-w-md">
                Share your requirement and we'll reply on WhatsApp with rates and lead
                time — usually the same day.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <dl className="divide-y divide-[#B8863B]/20 border-t border-b border-[#B8863B]/20 max-w-md">
                {contactRows.map((row) => (
                  <div key={row.label} className="flex gap-4 py-3">
                    <dt className="w-14 shrink-0 text-[13px] font-semibold text-[#B8863B]">
                      {row.label}
                    </dt>
                    <dd className="text-sm text-gray-800 leading-relaxed">
                      {row.href ? (
                        <a href={row.href} className="hover:text-[#7A1F2B] transition-colors">
                          {row.value}
                        </a>
                      ) : row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Right — form card */}
          <Reveal delay={180} y={20}>
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-lg shadow-[#7A1F2B]/5 ring-1 ring-[#B8863B]/15 p-5 sm:p-6"
              noValidate
            >
              <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
                <div>
                  <label htmlFor="q-name" className={labelClass}>Your Name</label>
                  <input id="q-name" type="text" value={form.name} onChange={set('name')}
                    placeholder="Rajesh Sharma" className={fieldClass} />
                </div>

                <div>
                  <label htmlFor="q-business" className={labelClass}>Business / Shop</label>
                  <input id="q-business" type="text" value={form.business} onChange={set('business')}
                    placeholder="Sharma Dance Wear" className={fieldClass} />
                </div>

                <div>
                  <label htmlFor="q-city" className={labelClass}>City</label>
                  <input id="q-city" type="text" value={form.city} onChange={set('city')}
                    placeholder="Nagpur" className={fieldClass} />
                </div>

                <div>
                  <label htmlFor="q-phone" className={labelClass}>WhatsApp Number</label>
                  <input id="q-phone" type="tel" inputMode="tel" value={form.phone} onChange={set('phone')}
                    placeholder="+91 …" className={fieldClass} />
                </div>

                <div>
                  <label htmlFor="q-category" className={labelClass}>Category</label>
                  <select id="q-category" value={form.category} onChange={set('category')} className={selectClass}>
                    <option value="">Select…</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                    <option value="Mixed / other">Mixed / other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="q-quantity" className={labelClass}>Approx. Quantity</label>
                  <select id="q-quantity" value={form.quantity} onChange={set('quantity')} className={selectClass}>
                    {quantities.map((q) => <option key={q} value={q}>{q}</option>)}
                  </select>
                </div>

                <div className="col-span-2">
                  <label htmlFor="q-message" className={labelClass}>Design details</label>
                  <textarea id="q-message" rows={3} value={form.message} onChange={set('message')}
                    placeholder="Colours, sizes, delivery date…"
                    className={`${fieldClass} resize-y`} />
                </div>
              </div>

              {error && (
                <p className="mt-3 text-[13px] text-[#7A1F2B] bg-[#F7E9EB] border border-[#7A1F2B]/15 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="btn-shine mt-5 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#20A44E] to-[#158A3E] hover:from-[#1c9346] hover:to-[#117535] text-white font-semibold text-[15px] px-5 py-3 rounded-lg transition-all duration-200 shadow-md shadow-green-700/20 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-green-600/30"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413A11.815 11.815 0 0012.05 0" />
                </svg>
                Send Enquiry on WhatsApp
              </button>

              <p className="mt-2.5 text-center text-[11px] text-gray-500">
                Opens WhatsApp with your details filled in — you send the message.
              </p>
            </form>
          </Reveal>

        </div>
      </div>
    </section>
  )
}

export default GetQuote