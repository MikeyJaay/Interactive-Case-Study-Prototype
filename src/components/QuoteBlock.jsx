import { useInView } from '../hooks/useInView'

export default function QuoteBlock({ quote, name, title }) {
  const [ref, inView] = useInView(0.1)

  return (
    <div ref={ref} className={`quote-block${inView ? ' in' : ''}`}>
      <div className="qb-inner">
        <blockquote className="qb-text">{quote}</blockquote>
        <div className="qb-attr">
          <span className="qb-name">{name}</span>
          <span className="qb-sep">·</span>
          <span className="qb-title">{title}</span>
        </div>
      </div>
    </div>
  )
}
