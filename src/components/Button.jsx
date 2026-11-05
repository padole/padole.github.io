import { cx } from './utils'

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[0.95rem] font-semibold transition-[background-color,color,border-color,box-shadow,transform] duration-200 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60'

const variants = {
  primary:
    'bg-accent text-accent-ink shadow-[0_8px_28px_-10px_var(--glow)] hover:bg-accent-strong hover:shadow-[0_10px_34px_-8px_var(--glow)]',
  secondary: 'border border-line-strong bg-raised text-ink hover:border-accent hover:text-accent',
  ghost: 'text-ink-soft hover:text-accent hover:bg-accent-soft',
}

/** Renders an <a> when given `href`, otherwise a <button>. */
export function Button({ href, variant = 'primary', className, children, ...props }) {
  const classes = cx(base, variants[variant], className)
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }
  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  )
}
