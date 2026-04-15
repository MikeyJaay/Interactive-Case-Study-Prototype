import { useEffect, useRef } from 'react'

export default function ProgressBar() {
  const barRef = useRef(null)

  useEffect(() => {
    function onScroll() {
      const scrolled = window.scrollY
      const total = document.body.scrollHeight - window.innerHeight
      if (barRef.current) {
        barRef.current.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%'
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div id="prog-wrap">
      <div id="prog" ref={barRef} />
    </div>
  )
}
