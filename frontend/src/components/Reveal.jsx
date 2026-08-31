import { useEffect, useRef, useState } from 'react'

/**
 * Fades + rises children in when they scroll into view.
 *
 * <Reveal delay={120}>...</Reveal>
 * <Reveal as="li" y={16} once={false}>...</Reveal>
 */
function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  y = 24,
  once = true,
  threshold = 0.15,
  className = '',
  ...rest
}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Fallback for very old browsers / SSR
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold, rootMargin: '0px 0px -60px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [once, threshold])

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'reveal-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms`, '--reveal-y': `${y}px` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export default Reveal