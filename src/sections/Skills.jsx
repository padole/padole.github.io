import { Cloud, Code, Server, Shield } from 'lucide-react'
import { skillLayers } from '../data/content'
import { Section } from '../components/Section'

const ICONS = { code: Code, cloud: Cloud, server: Server, shield: Shield }

export function Skills() {
  return (
    <Section
      id="skills"
      title="Technical skills"
      intro="Grouped as layers of the stack, from the network edge up to the applications people use every day."
    >
      <ol className="relative space-y-3" aria-label="Skill layers, from applications down to the network">
        {skillLayers.map((layer, i) => {
          const Icon = ICONS[layer.icon] ?? Code
          return (
            <li
              key={layer.id}
              className="group relative rounded-2xl border border-line bg-raised p-5 transition-colors hover:border-line-strong sm:p-6"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="flex items-center gap-4 sm:w-64 sm:shrink-0">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    <Icon size={21} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{layer.title}</h3>
                    <p className="text-sm text-muted">{layer.summary}</p>
                  </div>
                </div>
                <ul className="flex flex-wrap gap-2 sm:pt-1" aria-label={`${layer.title} skills`}>
                  {layer.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-line bg-sunken px-3 py-1.5 text-[0.9rem] font-medium text-ink-soft"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {i < skillLayers.length - 1 && (
                <span aria-hidden="true" className="absolute -bottom-3 left-[2.65rem] h-3 w-px bg-line-strong sm:left-[2.9rem]" />
              )}
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
