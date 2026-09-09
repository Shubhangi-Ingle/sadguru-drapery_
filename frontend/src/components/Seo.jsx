import { useEffect } from 'react'

const SITE_NAME = 'Sadguru Costume'
const SITE_URL = 'https://sadgurudrapery.shop'
const DEFAULT_DESCRIPTION =
  'Rent or bulk-order traditional and dance costumes for kids — Bharatanatyam, folk, western, and more. Based in Pimpri-Chinchwad, Pune. Enquire on WhatsApp for pricing and availability.'
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`

function setMeta(name, content, attr = 'name') {
  if (!content) return
  let el = document.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(url) {
  let el = document.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', url)
}

function Seo({ title, description, image, path = '' }) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | ${SITE_NAME}`
      : `${SITE_NAME} — Kids Dance & Traditional Costume Rentals`
    const desc = description || DEFAULT_DESCRIPTION
    const img = image || DEFAULT_IMAGE
    const url = `${SITE_URL}${path}`

    document.title = fullTitle

    setMeta('description', desc)

    setMeta('og:title', fullTitle, 'property')
    setMeta('og:description', desc, 'property')
    setMeta('og:image', img, 'property')
    setMeta('og:url', url, 'property')
    setMeta('og:type', 'website', 'property')
    setMeta('og:site_name', SITE_NAME, 'property')

    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', fullTitle)
    setMeta('twitter:description', desc)
    setMeta('twitter:image', img)

    setCanonical(url)
  }, [title, description, image, path])

  return null
}

export default Seo