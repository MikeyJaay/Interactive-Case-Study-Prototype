import { useInView } from '../hooks/useInView'

/**
 * @param {{
 *   id: string
 *   flip?: boolean
 *   sectionNum: string
 *   label: string
 *   title: React.ReactNode
 *   paragraphs: string[]
 *   calloutNum: string
 *   calloutLabel: React.ReactNode
 *   children: React.ReactNode  // the InputCard
 * }} props
 */
export default function StorySection({
  id,
  flip = false,
  sectionNum,
  label,
  title,
  paragraphs,
  calloutNum,
  calloutLabel,
  children,
}) {
  const [ref, inView] = useInView()

  return (
    <section
      id={id}
      ref={ref}
      className={`story${flip ? ' flip' : ''}${inView ? ' in' : ''}`}
    >
      <div className="text">
        <div className="sec-label">
          {sectionNum}&nbsp;·&nbsp;{label}
        </div>
        <h2>{title}</h2>
        {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
        <div className="callout">
          <div className="callout-n">{calloutNum}</div>
          <div className="callout-l">{calloutLabel}</div>
        </div>
      </div>
      <div className="card-col">
        {children}
      </div>
    </section>
  )
}
