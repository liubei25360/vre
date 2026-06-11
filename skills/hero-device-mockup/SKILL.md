---
name: hero-device-mockup
description: Isometric 2.5D device mockup with embedded video clip-path. Shows a phone/screen PNG with video content perfectly masked into the screen area. Uses clip-path for precise embedding. Ideal for showcasing app demos, UI recordings, or final output previews.
category: execution
tags: [mockup, device, phone, screen, clip-path, isometric, demo, showcase]
dependencies: [remotion]
version: 1.0.0
---

# HeroDeviceMockup

An isometric 2.5D device mockup that embeds video or image content into a phone/laptop screen frame using CSS `clip-path`. The device floats with a breathing animation inherited from SpatialGlassContainer-like physics.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Content to embed in screen |
| `deviceType` | `"phone" \| "laptop"` | `"phone"` | Device shape |
| `durationInFrames` | `number` | `150` | Breathing cycle |
| `width` | `number \| string` | `"55%"` | Mockup width |
| `backgroundColor` | `string` | `"transparent"` | Outer background |
| `deviceColor` | `string` | `"#1a1a2e"` | Device bezel color |
| `glowColor` | `string` | `"rgba(100,210,255,0.2)"` | Device glow |

## Usage

```tsx
<HeroDeviceMockup deviceType="phone">
  <Video src={staticFile("demo.mp4")} />
</HeroDeviceMockup>
```

Built for `vibe-coding-video` skill library.
