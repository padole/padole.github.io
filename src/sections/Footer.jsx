import { ArrowUp, Mail } from 'lucide-react'
import { navLinks, profile } from '../data/content'
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons'
import { isPlaceholder, isUsableLink } from '../components/utils'

export function Footer() {
  const year = new Date().getFullYear()
  const socials = [
    isUsableLink(profile.social.linkedin) && { href: profile.social.linkedin, label: 'LinkedIn', Icon: LinkedinIcon, external: true },
    isUsableLink(profile.social.github) && { href: profile.social.github, label: 'GitHub', Icon: GithubIcon, external: true },
    !isPlaceholder(profile.email) && { href: `mailto:${profile.email}`, label: 'Email', Icon: Mail },
  ].filter(Boolean)

  return (
    <footer className="border-t border-line bg-sunken">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-12 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <a href="#top" className="inline-flex items-center gap-3 rounded-lg">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent font-display text-[0.95rem] font-bold text-accent-ink">
              PA
            </span>
            <span className="font-display text-lg font-semibold text-ink">{profile.name}</span>
          </a>
          <p className="mt-3 text-sm text-muted">{profile.role}</p>
          {socials.length > 0 && (
            <ul className="mt-5 flex gap-2" aria-label="Social links">
              {socials.map(({ href, label, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={external ? `${label} (opens in a new tab)` : label}
                    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-line text-ink-soft transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon size={18} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 text-sm sm:grid-cols-3">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className="text-ink-soft transition-colors hover:text-accent">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col-reverse gap-4 px-5 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {year} {profile.name}. All rights reserved.</p>
          <a href="#top" className="inline-flex items-center gap-1.5 self-start rounded-lg text-ink-soft hover:text-accent sm:self-auto">
            <ArrowUp size={15} aria-hidden="true" />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
