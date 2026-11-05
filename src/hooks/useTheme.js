import { useCallback, useEffect, useState } from 'react'

function readInitial() {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

/** Light/dark theme, persisted in localStorage and applied as a class on <html>. */
export function useTheme() {
  const [theme, setTheme] = useState(readInitial)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem('theme', theme)
    } catch {
      /* storage unavailable — theme still applies for this visit */
    }
  }, [theme])

  const toggle = useCallback(() => setTheme((t) => (t === 'dark' ? 'light' : 'dark')), [])
  return { theme, toggle }
}
