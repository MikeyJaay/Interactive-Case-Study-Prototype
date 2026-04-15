import { useState, useEffect, useRef } from 'react'
import { useInView } from '../hooks/useInView'
import { fmtN, fmtD, fmtP } from '../utils/format'
import { countUp } from '../utils/countUp'

const LockIcon = () => (
  <svg viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

export default function ResultsSection({ computed }) {
  const { hrs, dlr, ann, pct } = computed

  const [sectionRef, inView] = useInView()

  // email gate
  const [email, setEmail] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [lockFading, setLockFading] = useState(false)

  // staggered card animations
  const [card1In, setCard1In] = useState(false)
  const [card2In, setCard2In] = useState(false)
  const [card3In, setCard3In] = useState(false)
  const [cmpIn, setCmpIn] = useState(false)
  const [ctaIn, setCtaIn] = useState(false)

  // animated display values
  const [dispHrs, setDispHrs] = useState('—')
  const [dispDlr, setDispDlr] = useState('—')
  const [dispAnn, setDispAnn] = useState('—')

  const unlockedRef = useRef(null)

  function handleUnlock() {
    setLockFading(true)
    setTimeout(() => setIsUnlocked(true), 500)

    setTimeout(() => {
      setCard1In(true)
      setTimeout(() => setCard2In(true), 130)
      setTimeout(() => setCard3In(true), 260)
      setTimeout(() => { setCmpIn(true); setCtaIn(true) }, 560)

      countUp(setDispHrs, hrs, v => fmtN(v) + ' hrs', 0)
      countUp(setDispDlr, dlr, v => fmtD(v), 150)
      countUp(setDispAnn, ann, v => fmtD(v), 300)
    }, 750)

    setTimeout(() => {
      unlockedRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 600)
  }

  // preview values (locked state) update live
  const pvHrs = hrs > 0 ? fmtN(hrs) + ' hrs' : '—'
  const pvDlr = dlr > 0 ? fmtD(dlr) : '—'
  const pvPct = hrs > 0 ? fmtP(pct) : '—'

  return (
    <section
      id="results-sec"
      ref={sectionRef}
      className={inView ? 'in' : ''}
    >
      <div className="res-hd">
        <div className="eyebrow" style={{ marginBottom: 10 }}>Your Personalized ROI</div>
        <div className="res-title">
          Here&apos;s What Your <em>Team</em> Could Save
        </div>
      </div>

      <div className="lock-wrap">
        {/* Preview stats (always rendered, blurred by overlay) */}
        <div className="stats-grid">
          <div className="stat-box hl">
            <div className="sb-l">Hours Recovered / Qtr</div>
            <div className="sb-v">{pvHrs}</div>
            <div className="sb-s">Engineering time returned</div>
          </div>
          <div className="stat-box">
            <div className="sb-l">Dollar Value Saved</div>
            <div className="sb-v">{pvDlr}</div>
            <div className="sb-s">Based on your eng. rate</div>
          </div>
          <div className="stat-box">
            <div className="sb-l">vs. Unity Benchmark</div>
            <div className="sb-v">{pvPct}</div>
            <div className="sb-s">Relative to Unity&apos;s result</div>
          </div>
        </div>

        {/* Lock overlay */}
        {!isUnlocked && (
          <div
            className="lock-overlay"
            style={{ opacity: lockFading ? 0 : 1, pointerEvents: lockFading ? 'none' : 'auto' }}
          >
            <div className="lock-ico"><LockIcon /></div>
            <div className="lock-t">Unlock Your Results</div>
            <div className="lock-s">Enter your work email to see your personalized ROI</div>
            <div className="email-row">
              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleUnlock()}
              />
              <button className="unlock-btn" onClick={handleUnlock}>
                Unlock →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Unlocked state */}
      <div
        id="unlocked"
        ref={unlockedRef}
        className={isUnlocked ? 'show' : ''}
      >
        <div className="ul-badge">✦&nbsp; ROI Unlocked</div>
        <div className="ul-title">Your Team&apos;s Potential Savings</div>
        <p className="ul-sub">
          Based on Unity&apos;s verified results with Codility — here&apos;s what standardizing
          your technical hiring could deliver.
        </p>

        <div className="res-cards">
          <div className={`rc${card1In ? ' in' : ''}`}>
            <div className="rc-l">Hours Recovered / Qtr</div>
            <div className="rc-v">{dispHrs}</div>
            <div className="rc-s">Engineering hours returned<br />to product work</div>
          </div>
          <div className={`rc${card2In ? ' in' : ''}`}>
            <div className="rc-l">Dollar Value Saved</div>
            <div className="rc-v">{dispDlr}</div>
            <div className="rc-s">Based on your engineer<br />hourly rate</div>
          </div>
          <div className={`rc${card3In ? ' in' : ''}`}>
            <div className="rc-l">Annualized Savings</div>
            <div className="rc-v">{dispAnn}</div>
            <div className="rc-s">Projected across<br />a full year</div>
          </div>
        </div>

        <div className={`cmp-row${cmpIn ? ' in' : ''}`}>
          <div className="cmp">
            <div className="cmp-l">Unity&apos;s Result (90 days)</div>
            <div className="cmp-v">2,200 hrs</div>
          </div>
          <div className="cmp-sep" />
          <div className="cmp">
            <div className="cmp-l">Your Estimate (Quarterly)</div>
            <div className="cmp-v">{fmtN(hrs)} hrs</div>
          </div>
          <div className="cmp-sep" />
          <div className="cmp">
            <div className="cmp-l">Relative Scale</div>
            <div className="cmp-v">{fmtP(pct)} of Unity</div>
          </div>
        </div>

        <div className={`cta-blk${ctaIn ? ' in' : ''}`}>
          <p className="cta-txt">
            Ready to put these numbers to work? See how Codility can transform your
            technical hiring process.
          </p>
          <button className="cta-btn">
            Schedule a Demo with Codility &nbsp;→
          </button>
        </div>
      </div>
    </section>
  )
}
