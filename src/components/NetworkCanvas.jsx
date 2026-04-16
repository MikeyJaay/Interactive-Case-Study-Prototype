import { useEffect, useRef } from 'react'

const CONFIGS = {
  normal: { count: 55,  maxDist: 150, speed: 0.38, lineAlpha: 0.18, dotAlpha: 0.28, dotR: 2   },
  high:   { count: 100, maxDist: 180, speed: 0.42, lineAlpha: 0.32, dotAlpha: 0.50, dotR: 2.5 },
}

export default function NetworkCanvas({ intensity = 'normal' }) {
  const canvasRef = useRef(null)
  const cfg = CONFIGS[intensity] ?? CONFIGS.normal

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const particles = Array.from({ length: cfg.count }, () => ({
      x: Math.random() * (canvas.offsetWidth  || 800),
      y: Math.random() * (canvas.offsetHeight || 400),
      vx: (Math.random() - 0.5) * cfg.speed,
      vy: (Math.random() - 0.5) * cfg.speed,
    }))

    function resize() {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      for (const p of particles) {
        if (p.x > canvas.width)  p.x = Math.random() * canvas.width
        if (p.y > canvas.height) p.y = Math.random() * canvas.height
      }
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    function draw() {
      const W = canvas.width
      const H = canvas.height
      ctx.clearRect(0, 0, W, H)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x += W
        if (p.x > W) p.x -= W
        if (p.y < 0) p.y += H
        if (p.y > H) p.y -= H
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < cfg.maxDist) {
            const alpha = (1 - dist / cfg.maxDist) * cfg.lineAlpha
            ctx.strokeStyle = `rgba(255,210,63,${alpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      for (const p of particles) {
        ctx.fillStyle = `rgba(255,210,63,${cfg.dotAlpha})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, cfg.dotR, 0, Math.PI * 2)
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return <canvas ref={canvasRef} className="network-canvas" aria-hidden="true" />
}
