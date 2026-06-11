import React from "react";
import { useCurrentFrame } from "remotion";

interface InfiniteDataMarqueeProps {
  items: string[];
  durationInFrames?: number;
  direction?: "up" | "down";
  speed?: number;
  perspective?: number;
  primaryColor?: string;
  fontSize?: string;
  style?: React.CSSProperties;
}

export const InfiniteDataMarquee: React.FC<InfiniteDataMarqueeProps> = ({
  items, durationInFrames = 120, direction = "down", speed = 1,
  perspective = 400, primaryColor = "#64d2ff", fontSize = "1.6vw", style
}) => {
  const frame = useCurrentFrame();
  const dir = direction === "down" ? -1 : 1;
  const offset = (frame * speed * 2) % (items.length * 60);
  const tripled = [...items, ...items, ...items];

  return (
    <div style={{ width:"100%", height:"100%", overflow:"hidden", position:"relative", ...style }}>
      <div style={{
        position:"absolute", left:"5%", right:"5%", bottom:0, top:0,
        perspective: `${perspective}px`,
      }}>
        <div style={{
          transform: `rotateX(25deg) translateY(${offset * dir}px)`,
          transformStyle: "preserve-3d",
        }}>
          {tripled.map((item,i) => (
            <div key={i} style={{
              padding: "1.2vw 0", textAlign:"center", fontFamily:"'JetBrains Mono',monospace",
              fontSize, color: primaryColor, opacity: 0.6 + Math.random()*0.4,
              textShadow: `0 0 10px ${primaryColor}`,
            }}>{item}</div>
          ))}
        </div>
      </div>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:"20%",
        background:"linear-gradient(0deg,transparent 0%,#020617 100%)", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"20%",
        background:"linear-gradient(180deg,transparent 0%,#020617 100%)", pointerEvents:"none" }} />
    </div>
  );
};
