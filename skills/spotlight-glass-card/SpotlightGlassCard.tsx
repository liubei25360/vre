import React from "react";
import { useCurrentFrame, spring, interpolate } from "remotion";

interface SpotlightGlassCardProps {
  children?: React.ReactNode;
  durationInFrames?: number;
  width?: string; height?: string;
  borderRadius?: number;
  glowColor?: string;
  borderColor?: string;
  style?: React.CSSProperties;
}

export const SpotlightGlassCard: React.FC<SpotlightGlassCardProps> = ({
  children, durationInFrames = 180, width = "80%", height = "60%",
  borderRadius = 24, glowColor = "#64d2ff", borderColor = "rgba(255,255,255,0.08)",
  style
}) => {
  const frame = useCurrentFrame();
  const cycle = durationInFrames * 1.5;
  const angle = ((frame % cycle) / cycle) * 360;
  const spotlightX = 50 + Math.cos((angle * Math.PI) / 180) * 45;
  const spotlightY = 50 + Math.sin((angle * Math.PI) / 180) * 45;

  return (
    <div style={{
      width, height, borderRadius, position:"relative", overflow:"hidden",
      background: "rgba(10,10,20,0.5)", backdropFilter: "blur(18px)", WebkitBackdropFilter: "blur(18px)",
      border: `1px solid ${borderColor}`,
      boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
      ...style
    }}>
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        background: `radial-gradient(ellipse 25% 40% at ${spotlightX}% ${spotlightY}%, ${glowColor}20 0%, transparent 70%)`
      }} />
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        background: `conic-gradient(from ${angle}deg at ${spotlightX}% ${spotlightY}%, transparent 40%, ${glowColor}08 50%, transparent 60%)`
      }} />
      <div style={{
        position:"absolute", top:0, left:0, right:0, bottom:0, padding:"3vw",
        display:"flex", alignItems:"center", justifyContent:"center"
      }}>
        {children}
      </div>
    </div>
  );
};
