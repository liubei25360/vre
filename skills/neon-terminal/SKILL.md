---
name: neon-terminal
description: Dark hacker terminal for code display. Key lines are highlighted with neon glow while other lines auto-dim to 50%. Built-in line numbers, prompt prefixes, and syntax-aware color mapping. Perfect for showing commands, configs, or result output.
category: execution
tags: [terminal, code, neon, dark, syntax, prompt, highlight, dim]
dependencies: [remotion]
version: 1.0.0
---

# NeonTerminal

A dark-mode code terminal designed for short-form vertical video. Displays code with line numbers, shell-prompt prefixes, and a neon highlight on the currently "active" line. All other lines automatically dim to 50% opacity so the viewer's eye is laser-focused on the important line.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lines` | `CodeLine[]` | `[]` | Array of code lines to display |
| `activeLine` | `number` | `0` | Index of the highlighted line |
| `durationInFrames` | `number` | `150` | Display duration |
| `fontSize` | `number \| string` | `"2.2vw"` | Code text size |
| `lineHeight` | `number` | `1.9` | Line spacing multiplier |
| `backgroundColor` | `string` | `"#0d1117"` | Terminal background |
| `textColor` | `string` | `"#c9d1d9"` | Default text color |
| `dimmedOpacity` | `number` | `0.5` | Opacity of dimmed lines |
| `primaryColor` | `string` | `"#64d2ff"` | Highlight glow color |
| `fontFamily` | `string` | JetBrains Mono stack | Monospace font |

### `CodeLine`

```ts
interface CodeLine {
  text: string;
  prefix?: string;         // ">", "$", "  " etc
  highlightColor?: string; // Per-line glow override
}
```

## Design Principles

- **Focus through dimming**: Non-active lines dim to 50% opacity. The active line gets a `text-shadow` glow. Simple but extremely effective for directing attention in a 3-5 second clip.
- **Line numbers**: Right-aligned with muted color (`rgba(255,255,255,0.18)`), giving an IDE feel without being distracting.
- **Shell prompt**: First line by default gets a `>` prefix in green (`#4ade80`). Lines with `prefix` containing `$` also render as prompt. Other lines get `  ` indent.
- **Clean separation**: A subtle horizontal glow line at the bottom separates the terminal from the video background.

## Usage

```tsx
import { NeonTerminal } from "../skills/neon-terminal";

const lines = [
  { text: "npx vibe-code generate" },
  { text: 'import { render } from "vibe-code"', prefix: "  " },
  { text: "await render({ prompt: '...' })", prefix: "  " },
];

<NeonTerminal lines={lines} activeLine={2} primaryColor="#38bdf8" />
```

## Dependencies

- `remotion` — `useCurrentFrame`

---

Built for `vibe-coding-video` skill library.
