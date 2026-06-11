---
name: spatial-glass-container
description: 2.5D spatial glass container with backdrop blur, glowing border, multi-layer environmental shadow, and Z-axis breathing float. Replaces harsh rectangular screenshots with premium glass morphism. Core carrier for all 2D content.
category: core
tags: [glass, morphism, 3d, perspective, float, backdrop-filter, shadow]
dependencies: [remotion]
version: 1.0.0
---

# SpatialGlassContainer

A premium 2.5D glass container that wraps any content (screenshots, code, UI mockups) in a frosted glass frame with physical refraction, glowing borders, and soft Z-axis breathing animation. The ultimate replacement for plain rectangular screenshots.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | — | Content to be wrapped in glass |
| `durationInFrames` | `number` | `150` | Total frame count for the breathing cycle |
| `width` | `number \| string` | `"85%"` | Container width |
| `height` | `number \| string` | `"75%"` | Container height |
| `borderRadius` | `number` | `24` | Corner radius in px |
| `blurAmount` | `number` | `20` | Backdrop filter blur intensity |
| `borderGlowColor` | `string` | `"rgba(100, 210, 255, 0.35)"` | Glowing border color |
| `backgroundColor` | `string` | `"rgba(10, 10, 20, 0.45)"` | Frosted glass tint |
| `shadowColor` | `string` | `"rgba(100, 180, 255, 0.2)"` | Environmental shadow color |
| `rotateX` | `number` | `5` | Perspective tilt X (degrees) |
| `rotateY` | `number` | `-8` | Perspective tilt Y (degrees) |
| `floatIntensity` | `number` | `1` | Z-axis breathing amplitude multiplier |
| `style` | `React.CSSProperties` | `{}` | Container style overrides |

## Design Principles

- **Glass morphism**: `backdrop-filter: blur()` creates real frosted glass by blurring what's behind the container, not just a translucent overlay.
- **3D perspective**: A subtle `rotateX(5deg) rotateY(-8deg)` gives the container spatial depth — it doesn't look flat.
- **Breathing float**: The Z-axis `translateZ` oscillates slowly via a `Math.sin` curve, giving a calm "alive" feeling. Not linear, not aggressive.
- **Multi-layer shadow**: Three shadow layers — near (tight, dark), mid (colored environmental), far (wide, faint). This creates depth without looking heavy.
- **Border rim light**: A dual-layer glow around the perimeter — one subtle continuous glow, one brighter rim on the top-left edge simulating light catch.

## Usage

```tsx
import { SpatialGlassContainer } from "../skills/spatial-glass-container";

<SpatialGlassContainer
  borderGlowColor="rgba(0, 255, 136, 0.4)"
  shadowColor="rgba(0, 255, 136, 0.15)"
>
  <img src="screenshot.png" style={{ width: "100%", borderRadius: "12px" }} />
</SpatialGlassContainer>
```

## Dependencies

- `remotion` — `useCurrentFrame`

---

Built for `vibe-coding-video` skill library.
