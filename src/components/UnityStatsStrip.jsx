const STATS = [
  { value: '2.5B',   label: 'Monthly Active End-Users' },
  { value: '5B+',    label: 'Monthly App Downloads' },
  { value: '94/100', label: 'Top Game Studios Use Unity' },
  { value: '10/10',  label: 'Top Auto Manufacturers' },
  { value: '120M+',  label: 'Monthly Voice & Text Users' },
  { value: '190+',   label: 'Countries with Unity Creators' },
]

// Items duplicated for seamless marquee loop
const ITEMS = [...STATS, ...STATS]

export default function UnityStatsStrip() {
  return (
    <div className="stats-strip" aria-hidden="true">
      <div className="stats-strip-track">
        {ITEMS.map((s, i) => (
          <div className="strip-item" key={i}>
            <span className="strip-val">{s.value}</span>
            <span className="strip-lbl">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
