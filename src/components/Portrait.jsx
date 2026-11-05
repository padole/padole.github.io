import { useState } from 'react'
import { ArrowUpRight, Sparkles } from 'lucide-react'

/*
 * Hero portrait: an arched photo frame with an offset outline, a slowly
 * spinning text badge and a frosted "latest project" card.
 */
function SpinningBadge({ text }) {
  return (
    <div aria-hidden="true" className="glass absolute -left-1 top-[14%] h-28 w-28 rounded-full sm:-left-10 sm:h-32 sm:w-32">
      <svg viewBox="0 0 120 120" className="spin-slow h-full w-full">
        <defs>
          <path id="badge-circle" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
        </defs>
        <text fill="var(--ink-soft)" fontFamily="var(--font-mono)" fontSize="9.5" fontWeight="500">
          <textPath href="#badge-circle" textLength="276" lengthAdjust="spacing">
            {text.toUpperCase()}
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 m-auto flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--accent),var(--accent-3))] text-white shadow-[0_8px_24px_-8px_var(--glow)]">
        <Sparkles size={18} />
      </span>
    </div>
  )
}

export function Portrait({ src, name, latest, badge }) {
  const [failed, setFailed] = useState(!src)
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)

  return (
    <div className="relative mx-auto w-full max-w-[400px] pb-10 pt-4 sm:pb-6">
      {/* Offset outline behind the frame */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-6 top-4 translate-x-4 translate-y-4 rounded-b-[2rem] rounded-t-[999px] border border-line-strong sm:bottom-2" />

      {/* Arched frame */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-b-[2rem] rounded-t-[999px] bg-[linear-gradient(160deg,var(--accent-soft),var(--bg-sunken))] shadow-[0_40px_80px_-40px_var(--glow)] ring-1 ring-line-strong">
        {!failed ? (
          <img
            src={src}
            alt={`Portrait of ${name}`}
            width="800"
            height="1000"
            fetchPriority="high"
            className="h-full w-full object-cover object-top"
            onError={() => setFailed(true)}
          />
        ) : (
          <div role="img" aria-label={`${name} monogram`} className="flex h-full w-full items-center justify-center">
            <span className="font-display text-7xl font-semibold text-accent">{initials}</span>
          </div>
        )}
        {/* Subtle tint at the base so the card reads */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[rgba(4,16,31,0.35)] to-transparent" />
      </div>

      <SpinningBadge text={badge} />

      {latest && (
        <a
          href="#projects"
          className="float-slow glass group absolute -right-3 bottom-0 flex items-center gap-3 rounded-2xl py-3 pl-3 pr-4 sm:-right-10"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft font-display text-sm font-semibold text-accent">
            {latest.title
              .split(' ')
              .map((w) => w[0])
              .join('')
              .slice(0, 2)}
          </span>
          <span className="min-w-0">
            <span className="block font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">Latest project</span>
            <span className="block text-[0.95rem] font-semibold leading-tight text-ink">{latest.title}</span>
            <span className="block text-[0.8rem] text-muted">{latest.detail}</span>
          </span>
          <ArrowUpRight size={18} aria-hidden="true" className="ml-1 shrink-0 text-muted transition-colors group-hover:text-accent" />
        </a>
      )}
    </div>
  )
}
