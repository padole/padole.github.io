import { useMemo, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { projects } from '../data/content'
import { Section } from '../components/Section'
import { ProjectArt } from '../components/ProjectArt'
import { GithubIcon } from '../components/BrandIcons'
import { cx, isUsableLink } from '../components/utils'

function ProjectCard({ project, featured }) {
  const hasGithub = isUsableLink(project.github)
  const hasDemo = isUsableLink(project.demo)

  return (
    <article
      className={cx(
        'flex flex-col overflow-hidden rounded-2xl border border-line bg-raised transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-[0_24px_60px_-30px_var(--glow)]',
        featured && 'md:col-span-2 md:flex-row',
      )}
    >
      <div
        className={cx(
          'relative aspect-[16/10] shrink-0 overflow-hidden border-b border-line bg-sunken',
          featured && 'md:aspect-auto md:w-[55%] md:border-b-0 md:border-r',
        )}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-left-top"
          />
        ) : (
          <div className="flex h-full items-center p-3">
            <ProjectArt kind={project.art} title={project.title} />
          </div>
        )}
      </div>

      <div className={cx('flex flex-1 flex-col p-6 sm:p-7', featured && 'md:justify-center md:p-9')}>
        <p className="text-sm font-medium text-accent">{project.category}</p>
        <h3 className={cx('mt-1.5 font-semibold text-ink', featured ? 'text-2xl sm:text-3xl' : 'text-xl')}>
          {project.title}
        </h3>
        <p className="mt-3 text-[0.98rem] text-muted">{project.description}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies used">
          {project.stack.map((t) => (
            <li key={t} className="rounded-md bg-accent-soft px-2.5 py-1 text-[0.8rem] font-medium text-accent">
              {t}
            </li>
          ))}
        </ul>

        {(hasGithub || hasDemo) && (
          <div className="mt-auto flex flex-wrap gap-2 pt-6">
            {hasGithub && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-line-strong px-3.5 py-2 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
              >
                <GithubIcon size={16} />
                View code
                <span className="sr-only"> for {project.title} on GitHub (opens in a new tab)</span>
              </a>
            )}
            {hasDemo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-3.5 py-2 text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-strong"
              >
                <ExternalLink size={16} aria-hidden="true" />
                Live demo
                <span className="sr-only"> of {project.title} (opens in a new tab)</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export function Projects() {
  const categories = useMemo(() => ['All', ...new Set(projects.map((p) => p.category))], [])
  const [filter, setFilter] = useState('All')
  const shown = filter === 'All' ? projects : projects.filter((p) => p.category === filter)

  return (
    <Section
      id="projects"
      wide
      title="Projects"
      intro="Web applications I have designed and built end to end, from database and API to the interface people use: site access, approvals, ticketing, staff dining, attendance and online ordering."
    >
      <div className="-mt-2 mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFilter(c)}
            aria-pressed={filter === c}
            className={cx(
              'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
              filter === c
                ? 'border-accent bg-accent text-accent-ink'
                : 'border-line text-ink-soft hover:border-line-strong hover:text-ink',
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2" aria-live="polite">
        {shown.map((p, i) => {
          // Featured projects span the full row; so does the last card when it would sit alone
          const featuredCount = filter === 'All' ? shown.filter((x) => x.featured).length : 0
          const orphan = i === shown.length - 1 && (shown.length - featuredCount) % 2 === 1 && !(p.featured && filter === 'All')
          return <ProjectCard key={p.title} project={p} featured={(p.featured && filter === 'All') || orphan} />
        })}
      </div>
    </Section>
  )
}
