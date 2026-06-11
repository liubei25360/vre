import React from "react";
import { useCurrentFrame, spring } from "remotion";

interface BentoBlock { id: string; area: string; title: string; content: string; bg: string; accent: string; }
interface BentoGridMorpherProps {
  blocks: BentoBlock[];
  focusBlock?: number;
  durationInFrames?: number;
  startFrame?: number;
  style?: React.CSSProperties;
}

export const BentoGridMorpher: React.FC<BentoGridMorpherProps> = ({
  blocks, focusBlock = 0, durationInFrames = 90, startFrame = 10, style
}) => {
  const frame = useCurrentFrame(); const rf = Math.max(0, frame - startFrame);
  const layout = blocks.map((b,i) => {
    const isFocused = i === focusBlock;
    const scale = isFocused ? 1.15 : 0.9;
    const colSpan = isFocused ? 2 : 1; const rowSpan = isFocused ? 2 : 1;
    return [colSpan, rowSpan] as const;
  });

  return (
    <div style={{
      display:"grid", gridTemplateColumns:"repeat(4,1fr)", gridAutoRows:"1fr",
      gap:"1.5vw", padding:"2vw", width:"100%", height:"100%", boxSizing:"border-box",
      fontFamily:"'Inter',sans-serif",
      ...style
    }}>
      {blocks.map((b,i) => {
        const isFocused = i === focusBlock;
        const stagger = Math.abs(i - focusBlock) * 4;
        const t = spring({ frame: Math.max(0, rf - stagger), fps: 30, config:{damping:12,mass:0.4,stiffness:80}, durationInFrames: 24 });
        const [col, row] = layout[i];
        const scale = 0.92 + t * (isFocused ? 0.1 : -0.03);
        const opacity = 0.8 + t * (isFocused ? 0.2 : -0.1);
        return (
          <div key={b.id} style={{
            gridColumn: `span ${col}`, gridRow: `span ${row}`,
            background: b.bg, borderRadius: 20, border: `1px solid ${b.accent}`, overflow:"hidden",
            transform: `scale(${scale})`, opacity, transition:"transform 0.3s, opacity 0.3s",
            padding:"1.5vw", display:"flex", flexDirection:"column", justifyContent:"center",
            boxShadow: isFocused?`0 0 40px ${b.accent}`:undefined
          }}>
            <div style={{ fontSize:"2vw", fontWeight:800, color:b.accent, marginBottom:"0.5vw" }}>{b.title}</div>
            <div style={{ fontSize:"1.4vw", color:"rgba(255,255,255,0.5)" }}>{b.content}</div>
          </div>
        );
      })}
    </div>
  );
};
