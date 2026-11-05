import { about } from '../data/content'
import { Section } from '../components/Section'

export function About() {
  return (
    <Section id="about" title="About me" intro="Infrastructure and operations by trade, software developer by drive.">
      <div className="max-w-2xl space-y-5 text-ink-soft">
        {about.paragraphs.map((p, i) => (
          <p key={i} className={i === 0 ? 'text-xl leading-relaxed text-ink' : undefined}>
            {p}
          </p>
        ))}
      </div>

      <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
        {about.focus.map((f) => (
          <div key={f.title} className="bg-raised p-6">
            <dt className="font-display text-lg font-semibold text-ink">{f.title}</dt>
            <dd className="mt-1.5 text-[0.97rem] text-muted">{f.text}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-12 border-l-2 border-accent pl-6">
        <h3 className="text-xl font-semibold text-ink">Where I am heading</h3>
        <p className="mt-2 max-w-2xl text-ink-soft">{about.goals}</p>
      </div>
    </Section>
  )
}
