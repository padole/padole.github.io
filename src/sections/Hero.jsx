import { ArrowRight, Download, MapPin } from 'lucide-react'
import { about, hero, profile } from '../data/content'
import { Portrait } from '../components/Portrait'
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons'
import { isPlaceholder, isUsableLink } from '../components/utils'

// Sets `hero.highlight` in the serif accent; falls back to plain text if it isn't found
function Headline() {
  const i = hero.highlight ? hero.headline.indexOf(hero.highlight) : -1
  if (i < 0) return hero.headline
  return (
    <>
      {hero.headline.slice(0, i)}
      <em className="text-serif-accent">{hero.highlight}</em>
      {hero.headline.slice(i + hero.highlight.length)}
    </>
  )
}

const socials = [
  { href: profile.social.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
  { href: profile.social.github, label: 'GitHub', Icon: GithubIcon },
].filter((s) => isUsableLink(s.href))

export function Hero() {
  const firstName = profile.name.split(' ')[0]

  return (
    <section id="top" aria-labelledby="hero-heading" className="relative isolate overflow-hidden pt-16">
      {/* Background: a spotlight behind the portrait, a dot field and fine grain */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="spotlight absolute inset-0" />
        <div className="dot-field absolute inset-0" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)] items-center gap-16 px-5 pb-16 pt-12 sm:px-8 md:pt-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12 lg:pb-20">
        <div className="hero-in">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.92rem] text-muted">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-raised/70 px-3.5 py-1.5 text-ink-soft">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
              </span>
              {profile.availability}
            </span>
            {!isPlaceholder(profile.location) && (
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={15} aria-hidden="true" />
                {profile.location}
              </span>
            )}
          </p>

          <p className="mt-9 flex items-center gap-3 text-lg text-ink-soft">
            <span aria-hidden="true" className="h-px w-10 bg-[linear-gradient(90deg,var(--accent),var(--accent-3))]" />
            <span>
              Hello, I’m <span className="font-semibold text-ink">{profile.name}</span>
            </span>
          </p>

          <h1
            id="hero-heading"
            className="mt-4 text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.03em] text-ink sm:text-[3.5rem] lg:text-[3.5rem] xl:text-[3.95rem]"
          >
            <Headline />
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-soft">{hero.intro}</p>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 font-semibold text-bg transition-shadow duration-300 hover:shadow-[0_14px_40px_-12px_var(--glow)]"
            >
              View my work
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--accent),var(--accent-3))] text-white transition-transform duration-300 group-hover:rotate-[-45deg]">
                <ArrowRight size={18} aria-hidden="true" />
              </span>
            </a>
            <a href="#contact" className="link-underline font-semibold text-ink">
              Let’s talk
            </a>
            <a
              href={profile.cv}
              download="Peter-Adole-CV.pdf"
              className="inline-flex items-center gap-2 font-medium text-muted transition-colors hover:text-accent"
            >
              <Download size={17} aria-hidden="true" />
              Download CV
            </a>
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-accent"
              >
                <Icon size={19} />
                <span className="sr-only">{firstName} on {label} (opens in a new tab)</span>
              </a>
            ))}
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-8 sm:grid-cols-4">
            {about.focus.map((f, i) => (
              <div key={f.title}>
                <dt className="font-mono text-[0.72rem] tracking-[0.14em] text-accent">0{i + 1}</dt>
                <dd className="mt-1.5 font-display text-[1.02rem] font-semibold leading-snug text-ink">{f.title}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="hero-in-late">
          <Portrait src={profile.photo} name={profile.name} latest={hero.latest} badge={hero.badge} />
        </div>
      </div>

      {/* Tech stack strip */}
      <div className="marquee relative border-y border-line/70 py-4" aria-label="Technologies I work with">
        <div className="marquee-track flex w-max gap-10">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center gap-10" aria-hidden={copy === 1 || undefined}>
              {hero.stack.map((t) => (
                <li key={t} className="flex items-center gap-10 whitespace-nowrap font-display text-lg font-medium text-muted">
                  {t}
                  <span className="h-1 w-1 rounded-full bg-line-strong" aria-hidden="true" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
