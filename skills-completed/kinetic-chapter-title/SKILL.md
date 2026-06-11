---
name: kinetic-chapter-title
description: Brutalist bold chapter title with explosive scale impact and camera shake. Full-screen center-left aligned massive typography that SLAMS into view. Used for chapter openings, shock value reveals (like "0 COST"), and attention-grabbing statements.
category: structure
tags: [title, kinetic, bold, impact, camera-shake, scale, chapter, reveal]
dependencies: [remotion]
version: 1.0.0
---

# KineticChapterTitle

A purely typographic, brutally bold title card. Full-screen centered text with explosive scale-in that overshoots and settles — paired with subtle camera shake for raw kinetic energy. No decorations, no gradients, just brute-force typography impact.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | Main title text **(required)** |
| `subtitle` | `string` | `""` | Smaller secondary line below |
| `durationInFrames` | `number` | `90` | Total frames |
| `entranceFrame` | `number` | `5` | When to trigger the impact |
| `fontSize` | `number \| string` | `"10vw"` | Title size |
| `textColor` | `string` | `"#ffffff"` | Title color |
| `backgroundColor` | `string` | `"#0a0a0a"` | Background |
| `accentColor` | `string` | `"#64d2ff"` | Subtitle / underline color |
| `shakeIntensity` | `number` | `1` | Camera shake multiplier |
| `fontFamily` | `string` | `"'Inter', sans-serif"` | Title font (bold sans-serif) |

## Design Principles

- **Scale impact with overshoot**: Title enters at scale 0.3 → springs to 1.15 → settles at 1.0. The 15% overshoot is the "punch" moment.
- **Camera shake**: For 6 frames after impact, the entire container jitters on X/Y by ±3px, decaying with spring physics. No linear jitter — it must feel like a genuine shockwave.
- **Pure typography**: No borders, no glass, no boxes. Just text on background. The word IS the visual.
- **Weight contrast**: Title is 900 weight (Black), subtitle is 400 weight (Regular) in accent color, creating instant hierarchy.

## Timing Breakdown

| Frame | What Happens |
|-------|-------------|
| 0–5 | Hold — black screen |
| 5–12 | Title bursts in: scale 0.3 → 1.15 (spring) |
| 5–11 | Camera shake active (6 frames) |
| 8–15 | Subtitle fades in with stagger delay |
| 15–90 | Hold — title sits at scale 1.0 |

## Usage

```tsx
import { KineticChapterTitle } from "../skills/kinetic-chapter-title";

<KineticChapterTitle
  title="0 成本"
  subtitle="从截图到视频·一键生成"
  accentColor="#ff6b6b"
/>
```

## Dependencies

- `remotion` — `useCurrentFrame`, `spring`, `interpolate`

---

Built for `vibe-coding-video` skill library.
