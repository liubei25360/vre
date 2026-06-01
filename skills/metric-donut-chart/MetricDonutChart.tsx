import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

interface MetricDonutChartProps {
  value: number;
  max?: number;
  label?: string;
  durationInFrames?: number;
  startFrame?: number;
  size?: number;
  strokeWidth?: number;
  primaryColor?: string;
  trackColor?: string;
  fontSize?: string;
  style?: React.CSSProperties;
}

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }

export const MetricDonutChart: React.FC<MetricDonutChartProps> = ({
  value, max = 100, label = "",
  durationInFrames = 90, startFrame = 5, size = 280, strokeWidth = 24,
  primaryColor = "#4ade80", trackColor = "rgba(255,255,255,0.06)",
  fontSize = "4vw", style,
}) => {
  const frame = useCurrentFrame();
  const rf = Math.max(0, frame - startFrame);
  const t = Math.min(1, rf / (durationInFrames * 0.6));
  const pct = Math.min(1, value / max);
  const animatedPct = pct * easeOutCubic(t);

  const radius = (size - strokeWidth) / 2;
  const circum = 2 * Math.PI * radius;
  const offset = circum * (1 - animatedPct);
  const cx = size / 2; const cy = size / 2;

  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", ...style }}>
      <svg width={size} height={size} style={{ transform:"rotate(-90deg)" }}>
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke={trackColor} strokeWidth={strokeWidth} />
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke={primaryColor} strokeWidth={strokeWidth}
          strokeDasharray={circum} strokeDashoffset={offset} strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 ${strokeWidth/3}px ${primaryColor})`, transition:"stroke-dashoffset 0.1s" }} />
      </svg>
      <div style={{ position:"absolute", textAlign:"center" }}>
        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize, fontWeight:800, color:primaryColor,
          textShadow:`0 0 ${strokeWidth}px ${primaryColor}` }}>
          {Math.round(value * animatedPct)}
        </div>
        {label && <div style={{ fontFamily:"'Inter',sans-serif", fontSize:"2vw", color:"rgba(255,255,255,0.5)", marginTop:"0.5vw" }}>{label}</div>}
      </div>
    </div>
  );
};
