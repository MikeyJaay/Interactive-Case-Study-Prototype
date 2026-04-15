import { useRef, useState, useEffect } from 'react'
import { useInView } from '../hooks/useInView'

const GAP = 20

const PLATFORMS = [
  { name: 'Gaming',              desc: 'Powers 71% of the top 1,000 mobile games worldwide.',            accent: 'G' },
  { name: 'AR / VR',             desc: 'The leading real-time platform for immersive XR experiences.',   accent: 'X' },
  { name: 'Automotive',          desc: 'Real-time design and simulation used by all top 10 auto OEMs.',  accent: 'A' },
  { name: 'Film & VFX',          desc: 'Real-time rendering for productions like The Jungle Book.',      accent: 'F' },
  { name: 'Construction',        desc: 'Safety training and BIM visualization at scale.',                accent: 'C' },
  { name: 'Aerospace',           desc: 'Simulation environments for NASA and defense programs.',         accent: 'S' },
  { name: 'Architecture',        desc: 'Immersive design walkthroughs before a single brick is laid.',   accent: 'B' },
  { name: 'Autonomous Vehicles', desc: 'Synthetic data and simulation for self-driving AI training.',    accent: 'V' },
  { name: 'Finance',             desc: 'Real-time data visualization for trading floors and analysts.',  accent: 'D' },
]

export default function UnityPlatformsCarousel() {
  const [sectionRef, inView] = useInView()
  const trackRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    function onScroll() {
      const card = track.firstElementChild
      if (!card) return
      const cardWidth = card.offsetWidth
      const index = Math.round(track.scrollLeft / (cardWidth + GAP))
      setActiveIndex(Math.max(0, Math.min(index, PLATFORMS.length - 1)))
    }

    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  function scrollToIndex(i) {
    const track = trackRef.current
    if (!track) return
    const card = track.firstElementChild
    if (!card) return
    const cardWidth = card.offsetWidth
    track.scrollTo({ left: i * (cardWidth + GAP), behavior: 'smooth' })
  }

  const scrollPrev = () => scrollToIndex(Math.max(0, activeIndex - 1))
  const scrollNext = () => scrollToIndex(Math.min(PLATFORMS.length - 1, activeIndex + 1))

  return (
    <section
      ref={sectionRef}
      className={`platforms-section${inView ? ' in' : ''}`}
    >
      <div className="platforms-hd">
        <div className="sec-label">Unity Platform</div>
        <h2 className="platforms-title">
          Built Across <em>Every</em> Industry
        </h2>
        <p className="platforms-sub">
          The same platform powering Unity&apos;s hiring transformation is deployed
          across industries you might not expect.
        </p>
      </div>

      <div className="carousel-wrap">
        <div className="carousel-track" ref={trackRef}>
          {PLATFORMS.map((p, i) => (
            <div className="carousel-card" key={i}>
              <div className="cc-accent">{p.accent}</div>
              <div className="cc-name">{p.name}</div>
              <div className="cc-desc">{p.desc}</div>
            </div>
          ))}
        </div>

        <div className="carousel-controls">
          <button className="carousel-btn" onClick={scrollPrev} aria-label="Previous slide">
            ‹
          </button>
          <div className="carousel-dots">
            {PLATFORMS.map((_, i) => (
              <button
                key={i}
                className={`dot${activeIndex === i ? ' active' : ''}`}
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
          <button className="carousel-btn" onClick={scrollNext} aria-label="Next slide">
            ›
          </button>
        </div>
      </div>
    </section>
  )
}
