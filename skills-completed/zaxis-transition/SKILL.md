---
name: zaxis-transition
description: Z-axis deep-dive transition engine. The outgoing frame falls backward into Z-depth with motion blur while the incoming frame flies in from behind the camera. Maximizes the 9:16 vertical depth perception. Ideal for chapter switches, theory-to-practice handoffs.
category: core
tags: [transition, z-axis, 3d, perspective, motion-blur, depth, dive, fly-in]
dependencies: [remotion]
version: 1.0.0
---

# ZAxisTransition

A cinematic Z-axis transition that squeezes vertical depth out of 9:16 aspect ratio. The old scene falls inward (scale < 1, opacity decay, motion blur) while the new scene surges in from behind the camera (scale > 1 → 1). The overlap creates a genuine "passing through" feel rather than a dissolve.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `[ReactNode, ReactNode]` | — | `[outgoingScene, incomingScene]` |
| `transitionStartFrame` | `number` | `0` | Frame to start the transition |
| `transitionDurationFrames` | `number` | `30` | How long the overlap lasts |
| `backgroundColor` | `string` | `"#020617"` | Background visible behind the gap |
| `motionBlurLayers` | `number` | `6` | Ghost layers for fake motion blur |

## Design Principles

- **No dissolve, no wipe**: Pure Z-axis spatial transition. The outgoing frame literally moves away from the viewer; the incoming frame literally moves toward them.
- **Motion blur ghosting**: During the transition, the moving frame renders N extra copies at fractional offsets with decreasing opacity. This creates convincing motion blur without needing WebGL.
- **Perspective camera**: Uses `perspective(800px)` on the container, giving a strong vanishing point feel — exactly what vertical 9:16 needs to feel 3D.
- **Scale crossover**: Outgoing goes 1 → 0.3. Incoming goes 2.5 → 1. They cross at scale ≈ 0.85, creating a tunnel moment.
- **Spring exit, spring entry**: Both the fall-away and fly-in use `spring()` curves with different configs: outgoing is "heavy fall" (high mass), incoming is "snappy land" (high damping).

## Timing Breakdown

| Frame | Outgoing | Incoming |
|-------|----------|----------|
| `start` | scale 1, opacity 1 | hidden |
| `start + 25%` | scale 0.75, opacity 0.7 | scale 2.5, opacity 0.3 |
| `start + 50%` | scale 0.45, opacity 0.25 | scale 1.15, opacity 0.85 |
| `start + 75%` | scale 0.3, opacity 0 | scale 1.02, opacity 0.98 |
| `start + 100%` | hidden | scale 1, opacity 1 |

## Usage

```tsx
import { ZAxisTransition } from "../skills/zaxis-transition";

<ZAxisTransition
  transitionStartFrame={120}
  transitionDurationFrames={36}
>
  <SceneA />  {/* first child = outgoing */}
  <SceneB />  {/* second child = incoming */}
</ZAxisTransition>
```

## Dependencies

- `remotion` — `useCurrentFrame`, `spring`, `interpolate`

---

Built for `vibe-coding-video` skill library.
