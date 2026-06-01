import React from "react";
import { useCurrentFrame } from "remotion";

interface ScatterPoint { x: number; y: number; label?: string; group?: number; value?: number; }

interface VectorSpacePlotterProps {
  points: ScatterPoint[];
  durationInFrames?: number;
  startFrame?: number;
  primaryColor?: string;
  gridColor?: string;
  glowColor?: string;
  style?: React.CSSProperties;
}

export const VectorSpacePlotter: React.FC<VectorSpacePlotterProps> = ({
  points, durationInFrames = 90, startFrame = 5,
  primaryColor = "#818cf8", gridColor = "rgba(255,255,255,0.04)", glowColor = "#818cf8",
  style
}) => {
  const frame = useCurrentFrame(); const rf = Math.max(0, frame - startFrame);
  const t = Math.min(1, rf / (durationInFrames * 0.7));
  const svgW = 400; const svgH = 400;
  const maxVal = Math.max(...points.map(p => Math.abs(p.value || 1)), 1);
  const gridLines = 8;

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: "100%", height: "100%", ...style }}>
      {Array.from({ length: gridLines + 1 }).map((_, i) => {
        const pos = (i / gridLines) * svgW;
        return <React.Fragment key={i}>
          <line x1={pos} y1={0} x2={pos} y2={svgH} stroke={gridColor} strokeWidth="1" />
          <line x1={0} y1={pos} x2={svgW} y2={pos} stroke={gridColor} strokeWidth="1" />
        </React.Fragment>;
      })}
      {points.map((p, i) => {
        const px = ((p.x + 1) / 2) * svgW * 0.85 + svgW * 0.075;
        const py = svgH * 0.925 - ((p.y + 1) / 2) * svgH * 0.85;
        const r = Math.max(3, ((p.value || 5) / maxVal) * 18);
        const fadeT = Math.max(0, t - i * 0.02);
        const opacity = Math.min(1, fadeT * 1.5);
        return (
          <g key={i}>
            <line x1={px} y1={py} x2={px} y2={svgH * 0.925} stroke={primaryColor} opacity={opacity * 0.2} strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1={px} y1={py} x2={svgW * 0.075} y2={py} stroke={primaryColor} opacity={opacity * 0.2} strokeWidth="0.5" strokeDasharray="4 4" />
            <circle cx={px} cy={py} r={r} fill="none" stroke={primaryColor} strokeWidth="1.5" opacity={opacity}
              style={{ filter: `drop-shadow(0 0 ${r * 0.6}px ${glowColor})` }} />
            {p.label && <text x={px} y={py - r - 4} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8" fontFamily="monospace" opacity={opacity}>{p.label}</text>}
          </g>
        );
      })}
    </svg>
  );
};
