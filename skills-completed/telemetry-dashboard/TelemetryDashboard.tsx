import React from "react";
import { useCurrentFrame , interpolate, spring } from "remotion";

interface TelemetryRow {
  label: string; value: number; max: number; unit?: string; color?: string;
}

interface TelemetryDashboardProps {
  rows: TelemetryRow[];
  durationInFrames?: number;
  startFrame?: number;
  barHeight?: number;
  primaryColor?: string;
  style?: React.CSSProperties;
}

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }

export const TelemetryDashboard: React.FC<TelemetryDashboardProps> = ({
  rows, durationInFrames = 120, startFrame = 10, barHeight = 28,
  primaryColor = "#64d2ff", style,
}) => {
  const frame = useCurrentFrame();
  const rf = Math.max(0, frame - startFrame);

  return (
    <div style={{ padding:"3vw", color:"#e2e8f0", fontFamily:"'JetBrains Mono',monospace", ...style }}>
      {rows.map((row,i) => {
        const stagger = i * 8;
        const rf2 = Math.max(0, rf - stagger);
        const t = Math.max(0, Math.min(1, rf2 / 55));
        const pct = (row.value / row.max) * easeOutCubic(t);
        const barW = `${pct * 100}%`;
        const color = row.color || primaryColor;
        const displayVal = Math.round(row.value * easeOutCubic(t));
        return (
          <div key={i} style={{ marginBottom:"2vw" }}>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:"1.8vw", marginBottom:"0.5vw" }}>
              <span style={{ color:"rgba(255,255,255,0.6)" }}>{row.label}</span>
              <span style={{ color }}>{displayVal}{row.unit || ""}</span>
            </div>
            <div style={{ width:"100%", height:barHeight, background:"rgba(255,255,255,0.04)", borderRadius:barHeight, overflow:"hidden" }}>
              <div style={{ width:barW, height:"100%", background:`linear-gradient(90deg,${color}66,${color})`, borderRadius:barHeight,
                boxShadow:`0 0 ${barHeight}px ${color}66`, transition:"width 0.05s" }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
