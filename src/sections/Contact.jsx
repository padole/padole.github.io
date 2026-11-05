import { useState } from 'react'
import { AlertCircle, Check, Loader, Mail, MapPin, Send } from 'lucide-react'
import { profile } from '../data/content'
import { Section } from '../components/Section'
import { GithubIcon, LinkedinIcon } from '../components/BrandIcons'
import { cx, isPlaceholder, isUsableLink } from '../components/utils'

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || ''
const EMAIL_OK = !isPlaceholder(profile.email) && profile.email.includes('@')
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const empty = { name: '', email: '', subject: '', message: '', company_site: '' }

function validate(v) {
  const e = {}
  if (!v.name.trim()) e.name = 'Enter your name.'
  if (!v.email.trim()) e.email = 'Enter your email address.'
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'Enter a valid email address, like name@company.com.'
  if (v.message.trim().length < 10) e.message = 'Write a message of at least 10 characters.'
  return e
}

function Field({ id, label, error, optional, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between text-sm font-medium text-ink">
        {label}
        {optional && <span className="text-xs font-normal text-muted">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1.5 text-sm text-red-500 dark:text-red-400">
          <AlertCircle size={14} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

const inputCls = (err) =>
  cx(
    'w-full rounded-xl border bg-sunken px-4 py-3 text-[0.98rem] text-ink placeholder:text-muted/70 transition-colors focus:outline-none focus:ring-2 focus:ring-accent/40',
    err ? 'border-red-500/70 focus:border-red-500' : 'border-line focus:border-accent',
  )

export function Contact() {
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | mailto | error
  const [errorMsg, setErrorMsg] = useState('')

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }))
  }

  async function onSubmit(e) {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      document.getElementById(`cf-${Object.keys(found)[0]}`)?.focus()
      return
    }
    if (values.company_site) return // bot filled the hidden field

    const subject = values.subject.trim() || `Portfolio enquiry from ${values.name.trim()}`

    if (FORM_ENDPOINT) {
      setStatus('sending')
      try {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: values.name.trim(),
            email: values.email.trim(),
            _replyto: values.email.trim(),
            _subject: subject,
            message: values.message.trim(),
          }),
        })
        if (!res.ok) throw new Error(`Status ${res.status}`)
        setStatus('sent')
        setValues(empty)
      } catch {
        setStatus('error')
        setErrorMsg(
          EMAIL_OK
            ? `The message could not be sent. Check your connection and try again, or email ${profile.email} directly.`
            : 'The message could not be sent. Check your connection and try again, or reach out on LinkedIn.',
        )
      }
      return
    }

    if (EMAIL_OK) {
      const body = `${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      setStatus('mailto')
      return
    }

    setStatus('error')
    setErrorMsg('The contact form is not connected yet. Add an email address or form endpoint as described in the README.')
  }

  const links = [
    EMAIL_OK && { href: `mailto:${profile.email}`, label: profile.email, Icon: Mail, name: 'Email' },
    isUsableLink(profile.social.linkedin) && {
      href: profile.social.linkedin,
      label: 'Connect on LinkedIn',
      Icon: LinkedinIcon,
      name: 'LinkedIn',
      external: true,
    },
    isUsableLink(profile.social.github) && {
      href: profile.social.github,
      label: 'Browse my code on GitHub',
      Icon: GithubIcon,
      name: 'GitHub',
      external: true,
    },
  ].filter(Boolean)

  return (
    <Section
      id="contact"
      title="Let's work together"
      intro="Hiring for an IT or infrastructure role, or need help with your network, Microsoft 365 or an internal tool? Send a message and I will get back to you."
    >
      <div className="space-y-6">
        <form onSubmit={onSubmit} noValidate className="rounded-2xl border border-line bg-raised p-6 sm:p-8" aria-describedby="cf-status">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="cf-name" label="Name" error={errors.name}>
              <input
                id="cf-name"
                name="name"
                autoComplete="name"
                value={values.name}
                onChange={set('name')}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'cf-name-error' : undefined}
                className={inputCls(errors.name)}
                placeholder="Your name"
              />
            </Field>
            <Field id="cf-email" label="Email" error={errors.email}>
              <input
                id="cf-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                value={values.email}
                onChange={set('email')}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'cf-email-error' : undefined}
                className={inputCls(errors.email)}
                placeholder="you@company.com"
              />
            </Field>
            <div className="sm:col-span-2">
              <Field id="cf-subject" label="Subject" optional>
                <input
                  id="cf-subject"
                  name="subject"
                  value={values.subject}
                  onChange={set('subject')}
                  className={inputCls()}
                  placeholder="Role, project or question"
                />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field id="cf-message" label="Message" error={errors.message}>
                <textarea
                  id="cf-message"
                  name="message"
                  rows={5}
                  value={values.message}
                  onChange={set('message')}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'cf-message-error' : undefined}
                  className={cx(inputCls(errors.message), 'resize-y')}
                  placeholder="Tell me a little about the role or what you need help with."
                />
              </Field>
            </div>
            {/* Honeypot: hidden from people, tempting to bots */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="cf-company">Company website</label>
              <input id="cf-company" tabIndex={-1} autoComplete="off" value={values.company_site} onChange={set('company_site')} />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 font-semibold text-accent-ink shadow-[0_8px_28px_-10px_var(--glow)] transition-colors hover:bg-accent-strong disabled:opacity-60"
            >
              {status === 'sending' ? (
                <Loader size={18} className="animate-spin" aria-hidden="true" />
              ) : (
                <Send size={18} aria-hidden="true" />
              )}
              {status === 'sending' ? 'Sending message…' : 'Send message'}
            </button>
            <div id="cf-status" role="status" aria-live="polite" className="text-sm">
              {status === 'sent' && (
                <p className="flex items-center gap-1.5 text-ok">
                  <Check size={16} aria-hidden="true" /> Message sent. I will reply as soon as I can.
                </p>
              )}
              {status === 'mailto' && (
                <p className="text-muted">Your email app should open with the message ready to send.</p>
              )}
              {status === 'error' && <p className="text-red-500 dark:text-red-400">{errorMsg}</p>}
            </div>
          </div>
        </form>

        <aside aria-label="Other ways to reach me" className={cx("grid gap-3 sm:grid-cols-3", !links.length && "hidden")}>
          {links.map(({ href, label, Icon, name, external }) => (
            <a
              key={name}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="flex items-center gap-3 rounded-2xl border border-line bg-raised p-4 transition-colors hover:border-accent"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Icon size={18} aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-ink">{name}</span>
                <span className="block truncate text-sm text-muted">{label}</span>
              </span>
            </a>
          ))}
        </aside>
        {!isPlaceholder(profile.location) && (
          <p className="flex items-center gap-2 px-1 text-sm text-muted">
            <MapPin size={15} aria-hidden="true" /> {profile.location}
          </p>
        )}
      </div>
    </Section>
  )
}
