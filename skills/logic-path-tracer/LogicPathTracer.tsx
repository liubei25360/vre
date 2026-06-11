import React from "react";
import { useCurrentFrame, spring, interpolate } from "remotion";

interface LogicNode {
  id: string; x: number; y: number; label: string;
}
interface LogicEdge {
  from: string; to: string; label?: string; branch?: "if" | "else";
}

interface LogicPathTracerProps {
  nodes: LogicNode[]; edges: LogicEdge[];
  durationInFrames?: number; startFrame?: number;
  primaryColor?: string; ifColor?: string; elseColor?: string;
  style?: React.CSSProperties;
}

export const LogicPathTracer: React.FC<LogicPathTracerProps> = ({
  nodes, edges, durationInFrames = 120, startFrame = 10,
  primaryColor = "#64d2ff", ifColor = "#4ade80", elseColor = "#fb923c",
  style
}) => {
  const frame = useCurrentFrame(); const rf = Math.max(0, frame - startFrame);
  const totalEdges = edges.length;
  const segLen = durationInFrames / totalEdges;
  const svgW = 400; const svgH = 400;
  const nodeMap = new Map(nodes.map(n=>[n.id,n]));

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width:"100%",height:"100%", ...style }}>
      {edges.map((e,i) => {
        const from = nodeMap.get(e.from); const to = nodeMap.get(e.to);
        if (!from || !to) return null;
        const segStart = i * segLen; const segEnd = (i+1)*segLen;
        const edgeT = Math.max(0, Math.min(1, (rf - segStart) / (segLen*0.5)));
        const opacity = edgeT;
        const color = e.branch === "if" ? ifColor : e.branch === "else" ? elseColor : primaryColor;
        const strokeD = `${Math.min(100, edgeT*100)}%`;
        return (
          <g key={i}>
            <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={color} strokeWidth="2" opacity={0.2} />
            <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={color} strokeWidth="3" opacity={opacity}
              strokeDasharray={opacity>0.01 ? `300 300` : "0 300"}
              strokeDashoffset={`${300-Math.min(1,Math.max(0,(rf-segStart)/segLen))*300}`} strokeLinecap="round"
              style={{ filter: opacity>0.3?`drop-shadow(0 0 6px ${color})`:"none" }} />
          </g>
        );
      })}
      {nodes.map(n=>{
        const active = rf > 0 && rf < durationInFrames ? 1 : 0.4;
        return <g key={n.id}><circle cx={n.x} cy={n.y} r={10} fill={primaryColor} opacity={active}
          style={{ filter:`drop-shadow(0 0 ${8}px ${primaryColor})` }} />
        <text x={n.x} y={n.y+22} textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="monospace">{n.label}</text></g>;
      })}
    </svg>
  );
};
