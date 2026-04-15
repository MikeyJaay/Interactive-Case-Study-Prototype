/**
 * Animates a value from 0 to `target` using an easeOutCubic curve.
 * Calls `setter` on each frame with the formatted string.
 *
 * @param {(val: string) => void} setter - React setState or similar
 * @param {number} target
 * @param {(v: number) => string} fmt
 * @param {number} [delay=0] - ms before animation starts
 * @param {number} [dur=1300] - animation duration in ms
 */
export function countUp(setter, target, fmt, delay = 0, dur = 1300) {
  setTimeout(() => {
    const start = performance.now()
    function frame(now) {
      const p = Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setter(fmt(eased * target))
      if (p < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }, delay)
}
