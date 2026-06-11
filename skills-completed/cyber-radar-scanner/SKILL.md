---
name: cyber-radar-scanner
description: Holographic laser scan line that sweeps across code/UI surfaces. The scan line creates intense fluorescent highlights wherever it passes, simulating an AI "scanning" or "thinking" state. Perfect for filling waiting time during render or processing phases.
category: svg-data
tags: [radar, scan, laser, holographic, sweep, highlight, think, processing]
dependencies: [remotion]
version: 1.0.0
---

# CyberRadarScanner

A glowing laser scan line that periodically sweeps top-to-bottom across a surface. Content beneath the scan line gets a bright cyan highlight with a glowing trail above and below. Ideal for "AI thinking..." or "Processing..." interstitial moments in tutorial videos.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Content being scanned |
| `scanDuration` | `number` | `60` | Frames per one full scan cycle |
| `scanColor` | `string` | `"#38bdf8"` | Scan line glow color |
| `scanWidth` | `number` | `4` | Scan line thickness (px) |
| `glowSpread` | `number` | `60` | Vertical glow spread (px) |

Built for `vibe-coding-video`.
