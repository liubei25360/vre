---
name: macos-glass-window
description: Skeuomorphic macOS glass window frame that auto-applies a polished window chrome (traffic light buttons, dark translucent title bar) around any content. Leverages SpatialGlassContainer for the glass material and shadows. Perfect for displaying screenshots, code, or UI mockups with a native app feel.
category: execution
tags: [macos, window, glass, skeuomorphic, traffic-lights, title-bar, screenshot, frame]
dependencies: [remotion]
version: 1.0.0
---

# MacOsGlassWindow

A full macOS-inspired window chrome wrapper. Automatically renders red/yellow/green traffic light dots and a dark glass title bar on top of your content. The window body uses SpatialGlassContainer's frosted glass material with perspective tilt and breathing float.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Content inside the window |
| `title` | `string` | `"Untitled"` | Title bar text |
| `durationInFrames` | `number` | `150` | Breathing cycle duration |
| `width` | `number \| string` | `"88%"` | Window width |
| `maxHeight` | `number \| string` | `"85%"` | Window max height |
| `borderRadius` | `number` | `16` | Window corner radius |
| `blurAmount` | `number` | `18` | Glass blur intensity |
| `borderGlowColor` | `string` | `"rgba(100,210,255,0.3)"` | Glass border glow |

## Design Principles

- **Authentic macOS ratios**: Traffic light circles are 12px diameter, spaced 8px apart, 20px from the left edge, vertically centered in a 36px title bar. Red (#ff5f57), yellow (#febc2e), green (#28c840).
- **Title bar is part of the glass**: The title bar area is the top section of the glass container, with a slightly darker background and a subtle bottom divider line.
- **Delegates to SpatialGlassContainer**: All glass rendering, perspective, breathing, and shadow logic comes from the core SpatialGlassContainer component. This skill is purely the macOS chrome layer.

## Usage

```tsx
import { MacOsGlassWindow } from "../skills/macos-glass-window";

<MacOsGlassWindow title="Dashboard — Production">
  <img src={staticFile("screenshot1.png")} style={{ width: "100%" }} />
</MacOsGlassWindow>
```

## Dependencies

- `remotion` — `useCurrentFrame`, `spring`, `interpolate`
- `SpatialGlassContainer` — Glass material base

---

Built for `vibe-coding-video` skill library.
