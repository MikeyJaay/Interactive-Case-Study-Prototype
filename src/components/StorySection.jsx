import { useState, useEffect } from 'react'
import { useInView } from '../hooks/useInView'
import { fmtN } from '../utils/format'
import { countUp } from '../utils/countUp'
import NetworkCanvas from './NetworkCanvas'

export default function StorySection({
  id,
  flip = false,
  sectionNum,
  label,
  title,
  paragraphs,
  statValue,
  statSuffix = '',
  statLabel,
  networkBg = false,
  children,
}) {
  const [ref, inView] = useInView()
  const [dispStat, setDispStat] = useState('0')
  const [statIn, setStatIn] = useState(false)

  useEffect(() => {
    if (!inView) return
    // Slight delay so the section fade-in starts first
    const t = setTimeout(() => {
      setStatIn(true)
      countUp(setDispStat, statValue, v => fmtN(v) + statSuffix, 0, 1100)
    }, 180)
    return () => clearTimeout(t)
  }, [inView]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section
      id={id}
      ref={ref}
      className={`story${flip ? ' flip' : ''}${inView ? ' in' : ''}${networkBg ? ' story--network' : ''}`}
    >
      {networkBg && <NetworkCanvas />}
      <div className="text">
        <div className="sec-label">
          {sectionNum}&nbsp;·&nbsp;{label}
        </div>
        <h2>{title}</h2>
        {paragraphs.map((p, i) => (
          <p key={i} className="story-p" style={{ '--i': i }}>{p}</p>
        ))}
      </div>

      <div className="card-col">
        {/* Stat block — sits above input card, draws eye before interaction */}
        <div className={`story-stat${statIn ? ' in' : ''}`}>
          <div className="story-stat-num">{dispStat}</div>
          <div className="story-stat-lbl">{statLabel}</div>
        </div>
        {children}
      </div>
    </section>
  )
}
