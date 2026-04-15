export function fmtN(n) {
  return Math.round(n).toLocaleString()
}

export function fmtD(n) {
  n = Math.round(n)
  if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return '$' + Math.round(n / 1_000) + 'K'
  return '$' + n
}

export function fmtP(n) {
  return Math.round(n) + '%'
}
