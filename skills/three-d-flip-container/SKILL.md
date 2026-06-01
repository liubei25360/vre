---
name: three-d-flip-container
description: Front-back 3D flip container for dramatic comparison reveals. The card rotates 180 degrees around the Y-axis with spring physics, showing the front face (e.g. a Prompt) and then the back face (e.g. generated code). Uses backface-visibility: hidden for clean transitions.
category: execution
tags: [flip, 3d, rotateY, backface, comparison, reveal, card, spring]
dependencies: [remotion]
version: 1.0.0
---

# 3DFlipContainer

A 3D card that flips 180° around the Y-axis to reveal its back face. The transition is driven by Remotion's `spring()` for smooth deceleration — the card overshoots slightly before settling, giving a satisfying weighty feel. Perfect for "Prompt → Output" or "Before → After" comparisons.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `front` | `ReactNode` | — | Content on the front face |
| `back` | `ReactNode` | — | Content on the back face |
| `flipStartFrame` | `number` | `30` | When the flip begins |
| `flipDurationFrames` | `number` | `36` | How long the flip takes |
| `holdFrontFrames` | `number` | `90` | How long to show front (before first flip) |
| `holdBackFrames` | `number` | `30` | How long to show back |
| `width` | `number \| string` | `"85%"` | Card width |
| `height` | `number \| string` | `"75%"` | Card height |
| `borderRadius` | `number` | `20` | Card corner radius |
| `perspective` | `number` | `1500` | 3D perspective intensity |
| `frontBg` | `string` | `"#0d1117"` | Front face background |
| `backBg` | `string` | `"#0b1a2e"` | Back face background |

## Design Principles

- **Y-axis spring flip**: The card rotates around its own Y-axis with `rotateY(0° → 180°)` driven by a single `spring()` call. The spring's slight overshoot creates a visceral bounce.
- **Mid-flip crossover**: At ~45% progress, the front face fades to 0 and the back face fades to 1, creating a clean pop-reveal at the exact midpoint.
- **`backface-visibility: hidden`**: Both faces use CSS `backface-visibility: hidden` so the wrong face never shows through during the rotation.
- **Shadow & border**: A deep box-shadow and subtle white border frame both faces identically, anchoring the card in 3D space.

## Timing Breakdown

| Frame | What Happens |
|-------|-------------|
| 0–30 | Front face visible, rotateY = 0° |
| 30–66 | Spring-driven flip: rotateY 0° → 180° |
| 66–96 | Back face visible, rotateY = 180° |

## Usage

```tsx
import { ThreeDFlipContainer } from "../skills/three-d-flip-container";

<ThreeDFlipContainer
  front={<PromptFace />}
  back={<CodeFace />}
  flipStartFrame={45}
  flipDurationFrames={40}
/>
```

## Dependencies

- `remotion` — `useCurrentFrame`, `spring`, `interpolate`

---

Built for `vibe-coding-video` skill library.
