const ICONS = {
  users: (
    <svg viewBox="0 0 24 24">
      <circle cx="9" cy="7" r="4" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      <path d="M21 21v-2a4 4 0 0 0-3-3.87" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  dollar: (
    <svg viewBox="0 0 24 24">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
}

/**
 * @param {{
 *   icon: 'users' | 'clock' | 'dollar'
 *   label: string
 *   sub: string
 *   value: string
 *   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
 *   placeholder: string
 *   min?: number
 *   step?: number
 *   prefix?: string
 *   hint: string
 *   runningShow: boolean
 *   runningLabel: string
 *   runningValue: string
 * }} props
 */
export default function InputCard({
  icon,
  label,
  sub,
  value,
  onChange,
  placeholder,
  min = 0,
  step = 1,
  prefix,
  hint,
  runningShow,
  runningLabel,
  runningValue,
}) {
  const filled = value !== '' && value !== undefined

  return (
    <div className={`input-card${filled ? ' filled' : ''}`}>
      <div className="ic-icon">{ICONS[icon]}</div>
      <div className="ic-label">{label}</div>
      <div className="ic-sub">{sub}</div>
      <div className="inp-wrap">
        {prefix && <span className="inp-pre">{prefix}</span>}
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`num-input${prefix ? ' has-pre' : ''}`}
        />
      </div>
      <div className="inp-hint">{hint}</div>
      <div className={`running${runningShow ? ' show' : ''}`}>
        <span className="run-l">{runningLabel}</span>
        <span className="run-v">{runningValue}</span>
      </div>
    </div>
  )
}
