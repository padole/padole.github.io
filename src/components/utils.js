/** True while a value still contains a [placeholder] from content.js. */
export const isPlaceholder = (value) => typeof value === 'string' && value.includes('[')

/** A link is usable when it is set and no longer a placeholder. */
export const isUsableLink = (value) => Boolean(value) && !isPlaceholder(value)

export const cx = (...classes) => classes.filter(Boolean).join(' ')
