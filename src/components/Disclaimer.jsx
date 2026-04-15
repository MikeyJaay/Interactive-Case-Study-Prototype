import { useState, useEffect } from 'react'

export default function Disclaimer({ onEnter }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Lock scroll while modal is open
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => setVisible(true), 80)
    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className="disclaimer-backdrop">
      <div className={`disclaimer-card${visible ? ' in' : ''}`}>
        <div className="disclaimer-eyebrow">Proof of Concept</div>
        <h2 className="disclaimer-title">Interactive Case Study</h2>
        <p className="disclaimer-body">
          This is a proof of concept project exploring interactive case studies.
          It is <strong>not affiliated with Codility or Unity</strong> and is
          intended for educational purposes only.
        </p>
        <p className="disclaimer-body">
          The content shown is based on Codility&apos;s publicly available,
          ungated case study with Unity (as of April&nbsp;2026).
        </p>
        <div className="disclaimer-actions">
          <button className="disclaimer-primary" onClick={onEnter}>
            Enter Prototype →
          </button>
          <a
            className="disclaimer-secondary"
            href="https://www.codility.com/solutions/customers/unity-success-story/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Codility&apos;s Live Study ↗
          </a>
        </div>
      </div>
    </div>
  )
}
