---
name: smart-camera-rig
description: Screen Studio 风格丝滑局部放大平移。用 spring 驱动的 scale + translate 实现苹果级运镜，引导观众视线聚焦关键区域。绝对弃用线性动画。
category: core
tags: [camera, zoom, pan, spring, focus, viewport, smooth]
dependencies: [remotion]
version: 1.0.0
---

# SmartCameraRig

A Screen Studio-inspired smart camera controller. Instead of linear keyframe pans, every movement is driven by Remotion's `spring()` — producing Apple-level inertia and cushioning. Guides the viewer's eye to specific regions in vertical video where horizontal content (code, UI, diagrams) would otherwise be hard to read.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Content to be filmed |
| `cameraFrames` | `CameraFrame[]` | `[]` | Array of camera waypoints |
| `baseScale` | `number` | `1` | Default zoom: 1 = fit, 1.5 = 150% |
| `springConfig` | `SpringConfig` | `{ damping: 12 }` | Physics tuning |
| `smoothing` | `number` | `0.6` | 0=snappy, 1=very floaty |
| `backgroundColor` | `string` | `"transparent"` | Rig background |

### `CameraFrame`

```ts
interface CameraFrame {
  atFrame: number;      // When to arrive at this waypoint
  scale?: number;        // Target zoom level
  x?: number;            // Focus X offset (px, from center)
  y?: number;            // Focus Y offset (px, from center)
  springConfig?: {        // Per-waypoint physics override
    damping?: number;
    mass?: number;
    stiffness?: number;
  };
}
```

## Design Principles

- **Spring physics only**: NO `interpolate()` on camera transform. Every `scale()` and `translate()` is computed by `spring()`, giving genuine iPhone-level inertia.
- **Waypoint system**: Define `CameraFrame[]` like keyframes. The rig auto-interpolates between them using spring physics.
- **Center origin**: All `x`/`y` offsets are relative to the center of the frame. `x: 0, y: 0` = dead center.
- **Overshoot on arrival**: Springs naturally overshoot before settling. This is the "Apple feel" — never damp it to zero.

## Usage

```tsx
import { SmartCameraRig } from "../skills/smart-camera-rig";

const cameraFrames = [
  { atFrame: 0, scale: 1, x: 0, y: 0 },
  { atFrame: 40, scale: 1.6, x: -120, y: 80 },   // zoom into top-left
  { atFrame: 90, scale: 1.3, x: 80, y: -60 },     // pan to bottom-right
  { atFrame: 140, scale: 1, x: 0, y: 0 },         // pull back
];

<SmartCameraRig cameraFrames={cameraFrames}>
  <img src="code-screenshot.png" />
</SmartCameraRig>
```

## Dependencies

- `remotion` — `useCurrentFrame`, `spring`

---

Built for `vibe-coding-video` skill library.
