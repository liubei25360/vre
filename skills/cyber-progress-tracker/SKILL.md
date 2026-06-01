---
name: cyber-progress-tracker
description: Holographic cyber progress bar with current spread animation and node pulse network. Sits edge-to-edge on the screen. When current reaches a node, it triggers a bright flash and reveals a micro glowing label. Perfect for SOP flow indicators (Step 1 → Step 2 → Step 3).
category: structure
tags: [progress, cyber, holographic, nodes, current, timeline, steps, edge-bar]
dependencies: [remotion]
version: 1.0.0
---

# CyberProgressTracker

A full-width holographic progress bar that clings to the screen edge. A current line spreads from left to right, tracing through circular nodes. When a node is reached, it pulses with a glow burst and reveals a micro label. Ideal for showing sequential process steps in tutorial videos.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `steps` | `StepConfig[]` | — | Array of step definitions **(required)** |
| `durationInFrames` | `number` | `150` | Total animation duration |
| `barHeight` | `number` | `6` | Progress bar thickness (px) |
| `nodeRadius` | `number` | `10` | Step node circle radius (px) |
| `barColor` | `string` | `"#64d2ff"` | Active bar / node color |
| `trackColor` | `string` | `"rgba(255,255,255,0.08)"` | Inactive track color |
| `labelColor` | `string` | `"#e2e8f0"` | Node label text color |
| `position` | `"top" \| "bottom"` | `"top"` | Edge to pin the bar |

### `StepConfig`

```ts
interface StepConfig {
  id: string;
  label: string;
  atFrame?: number;       // Override auto-paced timing
}
```

If `atFrame` is not provided, steps are auto-paced evenly across `durationInFrames`.

## Design Principles

- **Current spread**: The progress bar fills from left to right with a `spring()`-driven wipe. A brighter leading edge simulates the "current front" moving.
- **Node arrival burst**: When the current reaches a node (center of the circle), the node overscales briefly (1 → 1.8 → 1) with a glow pulse. The label fades in with a 3-frame stagger.
- **MotionBlur-style trail**: Behind the leading edge, the bar brightness decays slightly (95% opacity at the tail), giving a subtle current-follows-the-leader feel.
- **Edge anchored**: The bar is fixed to the screen edge with `position: absolute`, zero margin, spanning full width with `left: 0, right: 0`.

## Timing Breakdown

| Frame | What Happens |
|-------|-------------|
| 0–N | Empty track visible |
| Step N arrival | Node pulse (scale overshoot) + label fade-in |
| Between steps | Current line smoothly interpolates between nodes |
| After last step | All nodes glowing + bar full |

## Usage

```tsx
import { CyberProgressTracker } from "../skills/cyber-progress-tracker";

const steps = [
  { id: "1", label: "分析 Prompt" },
  { id: "2", label: "生成时间线" },
  { id: "3", label: "渲染输出" },
];

<CyberProgressTracker steps={steps} durationInFrames={200} />
```

## Dependencies

- `remotion` — `useCurrentFrame`, `spring`, `interpolate`

---

Built for `vibe-coding-video` skill library.
