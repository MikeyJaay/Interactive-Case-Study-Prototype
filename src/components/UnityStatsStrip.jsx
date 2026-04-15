import { useRef, useEffect } from 'react'

const STATS = [
  { value: '2.5B',   label: 'Monthly Active End-Users' },
  { value: '5B+',    label: 'Monthly App Downloads' },
  { value: '94/100', label: 'Top Game Studios Use Unity' },
  { value: '10/10',  label: 'Top Auto Manufacturers' },
  { value: '120M+',  label: 'Monthly Voice & Text Users' },
  { value: '190+',   label: 'Countries with Unity Creators' },
]

// Three copies so there's always a full visible set on either side of the seam
const ITEMS = [...STATS, ...STATS, ...STATS]

const SPEED = 0.6 // px per frame at 60fps

export default function UnityStatsStrip() {
  const trackRef = useRef(null)
  const posRef = useRef(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const track = trackRef.current
    if (!track) return

    function tick() {
      {
        posRef.current += SPEED
        // Wrap when we've scrolled one full set (1/3 of total width)
        const loopWidth = track.scrollWidth / 3
        if (posRef.current >= loopWidth) {
          posRef.current -= loopWidth
        }
        track.style.transform = `translateX(-${posRef.current}px)`
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div className="stats-strip" aria-hidden="true">
      <div className="stats-strip-track" ref={trackRef}>
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
