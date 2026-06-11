---
name: confetti-burst
description: Minimal geometric celebration particles with gold glow. Uses simple lines and geometric dots instead of flashy confetti paper. Bursts from center with spring physics decay. Ideal for success moments: code runs, build passes, milestone reached.
category: execution
tags: [confetti, particles, celebration, success, burst, gold, geometric]
dependencies: [remotion]
version: 1.0.0
---

# ConfettiBurst

A minimalist geometric celebration effect. Instead of colorful paper confetti, it uses clean lines and dots with a warm gold glow — fitting the tech video aesthetic. Particles burst from a center point with `spring()` physics for natural decay.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `particleCount` | `number` | `30` | Number of particles |
| `durationInFrames` | `number` | `60` | Total frames |
| `startFrame` | `number` | `0` | When burst triggers |
| `color` | `string` | `"#fbbf24"` | Particle glow color |
| `spreadRadius` | `number` | `300` | Max spread distance (px) |
| `lineLength` | `number` | `40` | Line particle length |

Built for `vibe-coding-video` skill library.
