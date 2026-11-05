import { useEffect, useState } from 'react'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { navLinks, profile } from '../data/content'
import { useActiveSection } from '../hooks/useActiveSection'
import { cx } from './utils'

const ids = navLinks.map((l) => l.id)

export function ThemeToggle({ theme, onToggle, className }) {
  const next = theme === 'dark' ? 'light' : 'dark'
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className={cx(
        'inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line text-ink-soft transition-colors hover:border-accent hover:text-accent',
        className,
      )}
    >
      {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  )
}

export function Navbar({ theme, onToggleTheme }) {
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu on Escape or when resizing up to desktop
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth >= 768 && setOpen(false)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled || open
          ? 'border-b border-line bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] backdrop-blur-xl'
          : 'border-b border-transparent',
      )}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="group flex items-center gap-3 rounded-lg" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent font-display text-[0.95rem] font-bold text-accent-ink">
            PA
          </span>
          <span className="font-display text-[1.05rem] font-semibold text-ink">{profile.name}</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          <ul className="flex items-center gap-1">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  aria-current={active === l.id ? 'true' : undefined}
                  className={cx(
                    'relative rounded-lg px-3 py-2 text-[0.92rem] font-medium transition-colors',
                    active === l.id ? 'text-accent' : 'text-ink-soft hover:text-ink',
                  )}
                >
                  {l.label}
                  <span
                    aria-hidden="true"
                    className={cx(
                      'absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent transition-transform duration-300',
                      active === l.id ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle theme={theme} onToggle={onToggleTheme} className="ml-3" />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line text-ink"
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-bg md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-5 py-4">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => {
                    // Unlock scrolling first, then jump to the section
                    e.preventDefault()
                    setOpen(false)
                    setTimeout(() => {
                      document.getElementById(l.id)?.scrollIntoView({ behavior: 'smooth' })
                      history.replaceState(null, '', `#${l.id}`)
                    }, 0)
                  }}
                  aria-current={active === l.id ? 'true' : undefined}
                  className={cx(
                    'block border-b border-line py-4 font-display text-2xl font-semibold',
                    active === l.id ? 'text-accent' : 'text-ink',
                  )}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
