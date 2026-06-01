---
name: data-metric-counter
description: High-frequency number odometer with ease-out roll, glow burst on completion, and prefix/suffix labels. Use for showcasing view counts, lines of code, time saved, or any numerical achievement in vertical short-form video.
category: structure
tags: [counter, odometer, number, metric, data, roll, glow, achievement]
dependencies: [remotion]
version: 1.0.0
---

# DataMetricCounter

A premium number counter that counts up from 0 to a target value with a satisfying ease-out curve. Each digit position is styled independently for a stacked "odometer" feel. On reaching the final value, a glow pulse animates through the number.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | Target value to count to **(required)** |
| `prefix` | `string` | `""` | Text before the number |
| `suffix` | `string` | `""` | Text after the number |
| `durationInFrames` | `number` | `90` | Total frames |
| `startFrame` | `number` | `5` | When counting begins |
| `countingFrames` | `number` | `45` | How long the count takes |
| `fontSize` | `number \| string` | `"12vw"` | Number size |
| `labelSize` | `number \| string` | `"3vw"` | Prefix/suffix size |
| `primaryColor` | `string` | `"#64d2ff"` | Number color |
| `backgroundColor` | `string` | `"#0a0a0f"` | Background |
| `glowColor` | `string` | `"#64d2ff"` | Completion glow color |
| `decimals` | `number` | `0` | Decimal places (0 = integer) |

## Design Principles

- **Ease-out counting**: The counter starts fast and decelerates as it approaches the target, never overshooting. Uses `interpolate` with a cubic ease-out clamped at the target.
- **Digit-level glow on completion**: Each digit pulses with a glow effect when the counting finishes, one by one in a ripple sequence.
- **Clean typography**: Large bold numbers with tight monospace feel. Prefix/suffix are smaller and lighter weight.
- **Zero is instant**: If value is 0, it displays immediately without animation.

## Timing Breakdown

| Frame | What Happens |
|-------|-------------|
| 0–5 | Counter visible at 0 |
| 5–50 | Numbers count up fast → slow (ease-out) |
| 50–55 | Glow burst on final digits (ripple left to right) |
| 55–90 | Hold steady, glow fades |

## Usage

```tsx
import { DataMetricCounter } from "../skills/data-metric-counter";

<DataMetricCounter
  value={12400}
  prefix="活跃用户 "
  suffix=" 人"
  primaryColor="#38bdf8"
  glowColor="#38bdf8"
/>
```

## Theme Variants

| Variant | `primaryColor` | Mood |
|---------|---------------|------|
| Sky Blue | `#38bdf8` | Calm data |
| Emerald | `#4ade80` | Growth / success |
| Amber | `#fb923c` | Warning / attention |
| Rose | `#fb7185` | Alert / urgent |

## Dependencies

- `remotion` — `useCurrentFrame`, `interpolate`, `spring`

---

Built for `vibe-coding-video` skill library.
