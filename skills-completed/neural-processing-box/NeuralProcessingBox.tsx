import React from "react";
import { useCurrentFrame } from "remotion";

interface NodeConfig { x: number; y: number; }

interface NeuralProcessingBoxProps {
  nodeCount?: number;
  durationInFrames?: number;
  primaryColor?: string;
  width?: string;
  height?: string;
  style?: React.CSSProperties;
}

// Deterministic pseudo-random based on seed
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

export const NeuralProcessingBox: React.FC<NeuralProcessingBoxProps> = ({
  nodeCount = 40,
  durationInFrames = 120,
  primaryColor = "#818cf8",
  width = "85%",
  height = "60%",
  style,
}) => {
  const frame = useCurrentFrame();
  const scanPhase = (frame % (durationInFrames * 0.6)) / (durationInFrames * 0.6);
  const scanY = scanPhase * 100;

  const rng = seededRandom(42);
  const nodes: NodeConfig[] = [];
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({ x: 8 + rng() * 84, y: 8 + rng() * 84 });
  }

  const edges: [number,number][] = [];
  for (let i = 0; i < nodeCount; i++) {
    const conns = 1 + Math.floor(rng() * 3);
    for (let j = 0; j < conns; j++) {
      const target = Math.floor(rng() * nodeCount);
      if (target !== i) edges.push([i, target]);
    }
  }

  return (
    <div style={{
      width, height, margin:"0 auto", background:"rgba(8,8,24,0.8)", borderRadius:16,
      border:"1px solid rgba(129,140,248,0.15)", overflow:"hidden", position:"relative", ...style
    }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ position:"absolute", inset:0 }}>
        {edges.map(([a,b],i) => {
          const opacity = 0.08 + Math.sin(frame * 0.02 + i) * 0.04;
          return (
            <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
              stroke={primaryColor} strokeWidth="0.3" opacity={opacity} />
          );
        })}
        {nodes.map((n,i) => {
          const pulse = 2 + Math.sin(frame * 0.06 + i * 0.5) * 1;
          return (
            <circle key={i} cx={n.x} cy={n.y} r={pulse * 0.5} fill={primaryColor} opacity={0.4}
              style={{ filter: `drop-shadow(0 0 ${pulse}px ${primaryColor})` }} />
          );
        })}
      </svg>
      <div style={{
        position:"absolute", left:0, right:0, top:`${scanY}%`, height:"2px",
        background:primaryColor, boxShadow:`0 0 16px ${primaryColor}`, opacity:0.7
      }} />
      <div style={{ position:"absolute", inset:0, pointerEvents:"none",
        background:`linear-gradient(0deg,${primaryColor}00 0%,${primaryColor}04 ${scanY-2}%,${primaryColor}08 ${scanY}%,${primaryColor}04 ${scanY+2}%,${primaryColor}00 100%)` }} />
    </div>
  );
};
