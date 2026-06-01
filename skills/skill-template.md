---
name: <skill-name>
description: <one-line description of what this skill does and when to use it>
category: <core | structure | theory | execution | svg-data | html-interactive>
tags: [<tag1>, <tag2>]
dependencies: [<required-libraries>]
version: 1.0.0
---

# <Skill Display Name>

<2-3 sentence overview of the visual effect and its purpose.>

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `text` | `string` | `""` | Content to display |
| `durationInFrames` | `number` | `90` | Total animation duration |
| `style` | `React.CSSProperties` | `{}` | Container style overrides |
| `theme` | `ThemeConfig` | `defaultTheme` | Color palette configuration |

## Theme Config

```ts
interface ThemeConfig {
  primary: string;      // Main glow color
  background: string;   // Container background
  accent: string;       // Secondary highlight
}
```

## Usage

```tsx
import { <ComponentName> } from "../skills/<skill-name>";

<ComponentName
  text="Your content here"
  durationInFrames={120}
  theme={{
    primary: "#64d2ff",
    background: "#0a0a0a",
    accent: "#ff6b6b"
  }}
/>
```

## Behavior Timeline

| Frame Range | What Happens |
|-------------|-------------|
| 0 – N | Describe entrance / build-up |
| N – M | Describe hold / loop phase |
| M – DURATION | Describe exit / fade-out |

## Design Principles

- Principle 1: <describe>
- Principle 2: <describe>
- Principle 3: <describe>

## Dependencies

- `remotion` (useCurrentFrame, interpolate, spring)
- `<list additional deps>`

## Examples

See `demo.tsx` for a standalone Remotion composition.

## Credits

<inspiration references, design sources>
