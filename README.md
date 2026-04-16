![Codility × Unity Interactive Case Study](./public/codility-unity-thumbnail.png)

# Interactive Case Study — Codility × Unity

**Live Site → [interactive-case-study-michaeljaro.netlify.app](https://interactive-case-study-michaeljaro.netlify.app/)**

A proof-of-concept interactive ROI calculator built on top of Codility's publicly available Unity success story. The goal: transform a static PDF case study into a personalized, scroll-driven experience that lets prospects plug in their own numbers and see what Unity's results could look like for their team.

> **Disclaimer:** This project is not affiliated with Codility or Unity. It is intended for educational and portfolio purposes only. All content is based on Codility's publicly available, ungated case study with Unity (as of April 2026).

---

## What It Does

Users scroll through a narrative retelling of how Unity standardized their technical hiring with Codility — saving 2,200 engineering hours in 90 days. Along the way they're prompted to enter three numbers:

1. **Candidate volume** — how many engineering candidates their team assesses per quarter
2. **Review time per assessment** — current hours spent per candidate
3. **Engineer hourly rate** — fully-loaded cost used to calculate dollar-value ROI

After entering their numbers and submitting an email, a gated results section unlocks with personalized figures: hours recovered, dollar value saved, annualized savings, and a benchmark comparison against Unity's verified result.

---

## Features

- **Scroll-driven narrative** — three story sections (Challenge → Solution → Impact) with staggered entrance animations
- **Live ROI calculator** — computed values update as the user types; results stay gated until email submission
- **Animated particle network** — canvas-based connected-node animation renders as a background layer across all dark sections
- **Scrolling stats strip** — JS-driven infinite marquee of Unity platform stats (no CSS animation reset glitch)
- **Pull quote blocks** — three testimonials from the case study break up the story sections on a light warm-white background with yellow highlight treatment on key phrases
- **Disclaimer modal** — blocks interaction and scroll until the user acknowledges the proof-of-concept notice
- **Input pulse animation** — input cards gently pulse yellow to draw users in; animation stops once a value is entered
- **Count-up animations** — hero number and results cards animate in with easeOutCubic on scroll/unlock
- **Email gate** — results section is locked behind an email input; any entry unlocks (no data is collected or stored)

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 19 |
| Build tool | Vite 8 |
| Styling | Vanilla CSS (custom properties design system) |
| Animations | CSS transitions + `requestAnimationFrame` |
| Canvas | Native `<canvas>` API |
| Deployment | Netlify |

No external UI libraries, animation libraries, or CSS frameworks. All components are hand-rolled.

---

## Project Structure

```
src/
├── components/
│   ├── Hero.jsx               # Full-viewport opener with count-up animation
│   ├── StorySection.jsx       # Reusable narrative section (stat + copy + input card)
│   ├── InputCard.jsx          # Controlled number input with pulse animation
│   ├── QuoteBlock.jsx         # Light-background testimonial with highlight spans
│   ├── ResultsSection.jsx     # Email-gated ROI results with count-up cards
│   ├── NetworkCanvas.jsx      # Canvas particle web animation (normal / high intensity)
│   ├── UnityStatsStrip.jsx    # Infinite scrolling stats marquee (RAF-based)
│   ├── Disclaimer.jsx         # Entry modal with scroll lock
│   ├── ProgressBar.jsx        # Sticky scroll progress indicator
│   └── Footer.jsx             # Footer with GitHub + LinkedIn links
├── hooks/
│   └── useInView.js           # IntersectionObserver hook (fires once)
├── utils/
│   ├── countUp.js             # easeOutCubic RAF count-up utility
│   └── format.js              # fmtN / fmtD / fmtP number formatters
├── App.jsx                    # Root: state, computed values, page composition
└── index.css                  # All styles via CSS custom properties
```

---

## Running Locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

---

## Author

**Michael Jaroszynski**
[LinkedIn](https://www.linkedin.com/in/michaeljaro/) · [GitHub](https://github.com/MikeyJaay/Interactive-Case-Study-Prototype)
