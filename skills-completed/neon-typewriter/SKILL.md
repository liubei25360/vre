---
name: neon-typewriter
description: Geek-style neon glow typewriter effect. Use when displaying code prompts, golden quotes, or core instructions with a cyberpunk aesthetic. Characters appear one by one with a bright flash on arrival, and a glowing cursor blinks at the end.
category: core
tags: [typewriter, neon, glow, cyberpunk, text-reveal, cursor]
dependencies: [remotion]
version: 1.0.0
---

# NeonTypewriter

A cyberpunk-inspired character-by-character text reveal. Each new character flashes with a neon glow burst on arrival. After the full text is rendered, a glowing rectangular cursor blinks at the end. Ideal for emphasizing AI prompts, code comments, or key takeaway lines in short-form vertical video.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | — | The full text to type out **(required)** |
| `durationInFrames` | `number` | `90` | Total frames for the animation |
| `startFrame` | `number` | `0` | Frame to begin typing |
| `typingSpeed` | `number` | `3` | Frames per character. Lower = faster typing |
| `fontSize` | `number \| string` | `"4.5vw"` | Font size (CSS units accepted) |
| `primaryColor` | `string` | `"#64d2ff"` | Main text / glow color |
| `backgroundColor` | `string` | `"#0a0a0f"` | Container background |
| `glowIntensity` | `number` | `1` | Glow multiplier (0.5 = subtle, 2 = intense) |
| `cursorBlinkRate` | `number` | `15` | Frames per cursor blink cycle |
| `align` | `"left" \| "center" \| "right"` | `"center"` | Text alignment |
| `fontFamily` | `string` | `"'JetBrains Mono', 'Fira Code', monospace"` | Font stack |
| `wrapperStyle` | `React.CSSProperties` | `{}` | Container style overrides |

## Design Principles

- **Flash on arrival**: Each new character emits a `text-shadow` glow spike on its first frame, then the glow decays exponentially over the next 3–4 frames. This mimics a CRT phosphor flash.
- **Cursor persistence**: After the last character, a rectangular block cursor appears. It blinks using a `spring()`-driven opacity curve — on for 10 frames, off for 5, producing a natural heartbeat-like pulse, not linear blinking.
- **Mono font + roomy tracking**: `letter-spacing: 0.08em` gives each character breathing room, crucial for vertical 9:16 readability.
- **Dark background mandatory**: The neon glow effect requires a dark background (`#0a0a0f`). Light themes destroy the aesthetic.

## Behavior Timeline

| Frame Range | What Happens |
|-------------|-------------|
| `startFrame` – `startFrame + text.length * typingSpeed` | Characters appear one-by-one with glow flash |
| `startFrame + text.length * typingSpeed` – `durationInFrames` | Cursor blinks at end of text |

## Usage

```tsx
import { NeonTypewriter } from "../skills/neon-typewriter";

<NeonTypewriter
  text="npx create-video@latest --blank"
  durationInFrames={120}
  primaryColor="#00ff88"
  typingSpeed={4}
  fontSize="5vw"
/>
```

## Theme Variants

| Variant | `primaryColor` | Mood |
|---------|---------------|------|
| Cyber Blue | `#64d2ff` | Default, calm tech |
| Terminal Green | `#00ff88` | Classic hacker vibe |
| Warning Amber | `#ffb347` | Urgency / emphasis |
| Hot Pink | `#ff6b9d` | Bold / energetic |

## Dependencies

- `remotion` — `useCurrentFrame`, `interpolate`, `spring`, `AbsoluteFill`

## Examples

Run the demo:
```bash
npx remotion studio src/index.ts
```

Then select the "NeonTypewriterDemo" composition.

---

Built for `vibe-coding-video` skill library.
