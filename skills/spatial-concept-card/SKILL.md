---
name: spatial-concept-card
description: Multiple frosted glass cards floating at different Z-depths with real depth-of-field blur. Cards at different distances have varying Gaussian blur to simulate camera focus. Perfect for presenting multiple concepts or steps layered in 3D space.
category: theory
tags: [card, stack, depth, blur, focus, layered, glass, concept, z-axis]
dependencies: [remotion]
version: 1.0.0
---

# SpatialConceptCard

A set of frosted glass cards that float at different Z-depth levels. Cards farther from the camera focus point are blurred with `filter: blur()` — creating genuine depth-of-field bokeh. The camera focus drifts slowly through the card stack.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cards` | `ConceptCardData[]` | `[]` | Array of card definitions |
| `focusFrame` | `number` | `0` | Which card is in focus (index) |
| `spacing` | `number` | `80` | Z spacing between cards (px) |
| `blurAtDepth` | `number` | `4` | Blur px per depth level away from focus |
| `cardWidth` | `string` | `"75%"` | Card width |

### ConceptCardData
```ts
{ title: string; body: string; accent?: string }
```

Built for `vibe-coding-video` skill library.
