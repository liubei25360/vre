import React from "react";
import { useCurrentFrame } from "remotion";

interface Node {
  x: 0; y: 0; label: string;
}
interface Route {
  from: number; to: number; color: string;
}

interface GlobalDataRouteProps {
  nodes: Node[]; routes: Route[];
  pulseDuration?: number;
  primaryColor?: string;
  nodeRadius?: number;
  style?: React.CSSProperties;
}

export const GlobalDataRoute: React.FC<GlobalDataRouteProps> = ({
  nodes, routes, pulseDuration = 120, primaryColor = "#64d2ff", nodeRadius = 8, style
}) => {
  const frame = useCurrentFrame();
  const phase = (frame % pulseDuration) / pulseDuration;
  const svgW = 400; const svgH = 400;

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: "100%", height: "100%", ...style }}>
      <defs>
        {routes.map((r,i) => (
          <linearGradient key={i} id={`gr-${i}`} x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor={r.color} stopOpacity="0.1" />
            <stop offset={`${Math.max(0,phase*100-5)}%`} stopColor={r.color} stopOpacity="1" />
            <stop offset={`${phase*100}%`} stopColor={r.color} stopOpacity="1" />
            <stop offset={`${Math.min(100,phase*100+5)}%`} stopColor={r.color} stopOpacity="0.5" />
            <stop offset="100%" stopColor={r.color} stopOpacity="0.1" />
          </linearGradient>
        ))}
      </defs>
      {routes.map((r,i) => {
        const from = nodes[r.from]; const to = nodes[r.to];
        return <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke={`url(#gr-${i})`} strokeWidth="2" strokeLinecap="round" />;
      })}
      {nodes.map((n,i) => {
        const isActive = phase > 0.3 && phase < 0.7 && i % 3 === 0;
        return <circle key={i} cx={n.x} cy={n.y} r={nodeRadius} fill={primaryColor}
          opacity={isActive ? 1 : 0.6}
          style={{ filter: isActive ? `drop-shadow(0 0 ${nodeRadius*2}px ${primaryColor})` : undefined }} />;
      })}
    </svg>
  );
};
