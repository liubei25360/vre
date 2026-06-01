import React from "react";
import { useCurrentFrame } from "remotion";

interface LineSegment { x1: number; y1: number; x2: number; y2: number; }

interface DynamicMapTracerProps {
  path: LineSegment[];
  durationPerSegment?: number;
  startFrame?: number;
  primaryColor?: string;
  trailLength?: number;
  nodeInterval?: number;
  style?: React.CSSProperties;
}

export const DynamicMapTracer: React.FC<DynamicMapTracerProps> = ({
  path, durationPerSegment = 20, startFrame = 0,
  primaryColor = "#38bdf8", trailLength = 4, nodeInterval = 3,
  style
}) => {
  const frame = useCurrentFrame(); const rf = Math.max(0, frame - startFrame);
  const totalTime = path.length * durationPerSegment;
  const t = Math.min(1, rf / totalTime);
  const currentSeg = Math.min(path.length - 1, Math.floor(rf / durationPerSegment));
  const segProgress = (rf % durationPerSegment) / durationPerSegment;
  const cumLen: number[] = [0]; for (let i = 1; i <= path.length; i++) cumLen[i] = cumLen[i-1] + Math.hypot(path[i-1]?.x2??0-(path[i-1]?.x1??0), path[i-1]?.y2??0-(path[i-1]?.y1??0));
  const totalLen = cumLen[path.length];
  const trailDist = totalLen * 0.08;

  const svgW = 400; const svgH = 400;
  const maxX = Math.max(...path.flatMap(s => [s.x1,s.x2])); const minX = Math.min(...path.flatMap(s => [s.x1,s.x2]));
  const maxY = Math.max(...path.flatMap(s => [s.y1,s.y2])); const minY = Math.min(...path.flatMap(s => [s.y1,s.y2]));
  const scale = Math.min(svgW/(maxX-minX||1), svgH/(maxY-minY||1)) * 0.8;
  const cx = svgW/2 - (minX+maxX)/2*scale; const cy = svgH/2 - (minY+maxY)/2*scale;
  const tx = (x:number) => x*scale + cx; const ty = (y:number) => y*scale + cy;

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width:"100%",height:"100%", ...style }}>
      {path.map((s,i) => {
        const isDone = i < currentSeg; const isCurrent = i === currentSeg;
        const opacity = isDone ? 1 : isCurrent ? 0.3 + segProgress * 0.7 : 0.08;
        return <line key={i} x1={tx(s.x1)} y1={ty(s.y1)} x2={tx(s.x2)} y2={ty(s.y2)}
          stroke={primaryColor} strokeWidth="2" opacity={opacity} strokeLinecap="round" />;
      })}
      {(() => {
        const idx = currentSeg;
        if (idx < path.length) {
          const s = path[idx];
          const dx = tx(s.x2)-tx(s.x1); const dy = ty(s.y2)-ty(s.y1);
          const cx2 = tx(s.x1) + dx*segProgress; const cy2 = ty(s.y1) + dy*segProgress;
          return <circle cx={cx2} cy={cy2} r={6} fill={primaryColor}
            style={{ filter: `drop-shadow(0 0 10px ${primaryColor})` }} />;
        }
        return null;
      })()}
      {path.map((s,i) => {
        if (i % nodeInterval === 0 && i <= currentSeg) return (
          <circle key={`n${i}`} cx={tx(s.x1)} cy={ty(s.y1)} r={4} fill={primaryColor} opacity={i <= currentSeg ? 0.6 : 0.2} />);
        return null;
      })}
    </svg>
  );
};
