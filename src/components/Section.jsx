import { cx } from './utils'

/**
 * Standard section layout: on large screens the heading sits in a sticky
 * left column and the content fills the right; on mobile they stack.
 */
export function Section({ id, title, intro, children, className, wide = false }) {
  const headingId = `${id}-heading`
  return (
    <section id={id} aria-labelledby={headingId} className={cx('border-t border-line', className)}>
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28">
        <div className={cx('grid gap-10', wide ? 'lg:grid-cols-1' : 'lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16')}>
          <header className={cx(!wide && 'lg:sticky lg:top-28 lg:self-start')}>
            <h2 id={headingId} className="text-3xl font-semibold text-ink sm:text-4xl">
              {title}
            </h2>
            {intro && <p className="mt-4 max-w-md text-muted">{intro}</p>}
          </header>
          <div className="min-w-0">{children}</div>
        </div>
      </div>
    </section>
  )
}
