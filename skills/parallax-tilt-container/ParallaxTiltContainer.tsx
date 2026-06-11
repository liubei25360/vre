import React from "react";
import { useCurrentFrame, spring } from "remotion";

interface ParallaxTiltContainerProps {
  children?: React.ReactNode;
  durationInFrames?: number;
  width?: string; height?: string;
  tiltIntensity?: number;
  glareColor?: string;
  borderRadius?: number;
  style?: React.CSSProperties;
}

export const ParallaxTiltContainer: React.FC<ParallaxTiltContainerProps> = ({
  children, durationInFrames = 240, width = "75%", height = "70%",
  tiltIntensity = 1, glareColor = "rgba(255,255,255,0.2)", borderRadius = 24, style
}) => {
  const frame = useCurrentFrame();
  const cycle = durationInFrames;
  const phase = (frame % cycle) / cycle;
  const rotateX = Math.sin(phase * Math.PI * 2) * 8 * tiltIntensity;
  const rotateY = Math.cos(phase * Math.PI * 2) * 12 * tiltIntensity;
  const glareX = 50 + Math.cos(phase * Math.PI * 2) * 40;
  const glareY = 50 + Math.sin(phase * Math.PI * 2) * 30;

  return (
    <div style={{ perspective: "1000px", width, height, margin:"0 auto", ...style }}>
      <div style={{
        position:"relative", width:"100%", height:"100%", borderRadius,
        background: "rgba(15,15,30,0.7)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)", boxShadow:"0 20px 60px rgba(0,0,0,0.5)",
        transform: `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
        transformStyle: "preserve-3d", overflow:"hidden",
        display:"flex", alignItems:"center", justifyContent:"center",
      }}>
        {children}
        <div style={{
          position:"absolute", inset:0, pointerEvents:"none",
          background: `radial-gradient(ellipse at ${glareX}% ${glareY}%, ${glareColor} 0%, transparent 60%)`,
          borderRadius
        }} />
      </div>
    </div>
  );
};
