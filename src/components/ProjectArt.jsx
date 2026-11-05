/*
 * Schematic illustrations for project cards. They are clearly diagrams, not
 * screenshots — swap in a real screenshot per project via `image` in content.js.
 */
const S = {
  raised: 'var(--bg-raised)',
  sunken: 'var(--bg-sunken)',
  line: 'var(--line)',
  strong: 'var(--line-strong)',
  accent: 'var(--accent)',
  soft: 'var(--accent-soft)',
  muted: 'var(--muted)',
  ok: 'var(--ok)',
}

function Bar({ x, y, w, h = 7, fill = S.strong, o = 1 }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} opacity={o} />
}

function Window({ children }) {
  return (
    <>
      <rect x="20" y="18" width="360" height="222" rx="12" fill={S.raised} stroke={S.strong} />
      <path d="M20 44h360" stroke={S.line} />
      <circle cx="38" cy="31" r="4" fill={S.strong} />
      <circle cx="52" cy="31" r="4" fill={S.strong} />
      <circle cx="66" cy="31" r="4" fill={S.strong} />
      <rect x="130" y="25" width="140" height="12" rx="6" fill={S.sunken} />
      {children}
    </>
  )
}

function Access() {
  const rows = [
    { c: S.ok, w: 70 },
    { c: S.accent, w: 92 },
    { c: S.ok, w: 60 },
    { c: S.muted, w: 80 },
  ]
  return (
    <Window>
      {/* Request form */}
      <Bar x={40} y={62} w={70} h={8} fill={S.accent} />
      {[84, 116, 148].map((y) => (
        <g key={y}>
          <Bar x={40} y={y} w={40} h={5} fill={S.muted} o={0.6} />
          <rect x="40" y={y + 9} width="130" height="16" rx="5" fill={S.sunken} stroke={S.line} />
        </g>
      ))}
      <rect x="40" y="186" width="76" height="22" rx="7" fill={S.accent} />
      {/* Approval queue */}
      <rect x="190" y="58" width="172" height="166" rx="9" fill={S.sunken} />
      <Bar x={204} y={72} w={64} h={6} fill={S.muted} />
      {rows.map((r, i) => (
        <g key={i} transform={`translate(204 ${90 + i * 32})`}>
          <rect width="144" height="24" rx="6" fill={S.raised} stroke={S.line} />
          <Bar x={10} y={9} w={r.w - 20} h={6} />
          <rect x="104" y="6" width="32" height="12" rx="6" fill={r.c} opacity="0.85" />
        </g>
      ))}
    </Window>
  )
}

function Helpdesk() {
  const cols = [
    { x: 40, n: 3, label: 52 },
    { x: 152, n: 2, label: 64 },
    { x: 264, n: 3, label: 44 },
  ]
  return (
    <Window>
      {cols.map((c, ci) => (
        <g key={c.x}>
          <rect x={c.x} y="58" width="96" height="166" rx="9" fill={S.sunken} />
          <Bar x={c.x + 10} y={70} w={c.label} h={6} fill={S.muted} />
          {Array.from({ length: c.n }).map((_, i) => (
            <g key={i} transform={`translate(${c.x + 8} ${86 + i * 44})`}>
              <rect width="80" height="36" rx="6" fill={S.raised} stroke={ci === 1 && i === 0 ? S.accent : S.line} />
              <circle cx="11" cy="12" r="3.5" fill={i === 0 ? S.accent : ci === 2 ? S.ok : S.muted} />
              <Bar x={20} y={9} w={48} h={5} />
              <Bar x={10} y={23} w={36} h={4} fill={S.muted} o={0.5} />
            </g>
          ))}
        </g>
      ))}
    </Window>
  )
}

function Web() {
  return (
    <Window>
      <Bar x={40} y={58} w={40} h={8} fill={S.accent} />
      {[250, 280, 310].map((x) => (
        <Bar key={x} x={x} y={59} w={22} h={6} fill={S.muted} o={0.6} />
      ))}
      <rect x="40" y="78" width="322" height="70" rx="9" fill={S.soft} />
      <Bar x={56} y={96} w={150} h={10} fill={S.accent} o={0.8} />
      <Bar x={56} y={114} w={110} h={6} fill={S.muted} o={0.6} />
      <rect x="56" y="126" width="54" height="14" rx="5" fill={S.accent} />
      {[40, 150, 260].map((x) => (
        <g key={x}>
          <rect x={x} y="160" width="102" height="64" rx="8" fill={S.sunken} stroke={S.line} />
          <rect x={x + 10} y="170" width="18" height="18" rx="5" fill={S.soft} stroke={S.accent} strokeOpacity="0.5" />
          <Bar x={x + 10} y={196} w={60} h={5} />
          <Bar x={x + 10} y={207} w={44} h={4} fill={S.muted} o={0.5} />
        </g>
      ))}
    </Window>
  )
}

const ARTS = { access: Access, helpdesk: Helpdesk, web: Web }

export function ProjectArt({ kind, title }) {
  const Art = ARTS[kind] ?? Web
  return (
    <svg viewBox="0 0 400 250" className="block h-full w-full" role="img" aria-label={`Illustration for ${title}`}>
      <Art />
    </svg>
  )
}
