import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }

    let raf
    let timer

    const goToTarget = (attempt = 0) => {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
      if (attempt < 10) {
        timer = setTimeout(() => goToTarget(attempt + 1), 50)
      }
    }

    raf = requestAnimationFrame(() => goToTarget())

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(timer)
    }
  }, [pathname, hash, key])

  return null
}

export default ScrollToTop