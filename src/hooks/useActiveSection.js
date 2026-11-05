import { useEffect, useState } from 'react'

/** Returns the id of the section currently in view, for highlighting the nav. */
export function useActiveSection(ids) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length || !('IntersectionObserver' in window)) return

    const visible = new Map()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0))
        let best = ''
        let bestRatio = 0
        visible.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            best = id
            bestRatio = ratio
          }
        })
        setActive(best)
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.01, 0.25, 0.5, 1] },
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}
