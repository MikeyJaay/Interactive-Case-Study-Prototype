import { useEffect, useState } from 'react'
import { fmtN } from '../utils/format'

export default function Hero() {
  const [count, setCount] = useState('0')

  useEffect(() => {
    const target = 2200
    const dur = 1800
    let rafId

    const timer = setTimeout(() => {
      const start = performance.now()
      function frame(now) {
        const p = Math.min((now - start) / dur, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        setCount(fmtN(eased * target))
        if (p < 1) rafId = requestAnimationFrame(frame)
      }
      rafId = requestAnimationFrame(frame)
    }, 500)

    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section id="hero">
      <div className="eyebrow">
        <img src="/unity-logo.png" alt="Unity" className="eyebrow-logo eyebrow-logo--unity" />
        &nbsp;·&nbsp; Customer Story &nbsp;·&nbsp;
        <img src="/Codility_logo_light.png" alt="Codility" className="eyebrow-logo" />
      </div>
      <div className="hero-num">{count}</div>
      <div className="hero-unit">Engineering Hours Saved &nbsp;·&nbsp; 90 Days</div>
      <p className="hero-desc">
        Unity recovered <strong>2,200 hours of recruiting time</strong> in a single quarter.
        Enter your numbers below to see what that looks like for <strong>your team.</strong>
      </p>
      <div className="scroll-cta">
        <div className="scroll-line" />
        <span className="scroll-text">Enter your numbers</span>
      </div>
    </section>
  )
}
