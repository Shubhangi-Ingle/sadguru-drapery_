export function pageview(path) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', { page_path: path })
  }
}

export function trackEvent(eventName, params = {}) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params)
  }
}