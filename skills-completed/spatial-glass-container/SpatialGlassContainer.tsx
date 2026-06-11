import React from "react";
import { useCurrentFrame } from "remotion";

interface SpatialGlassContainerProps {
  children?: React.ReactNode;
  durationInFrames?: number;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  blurAmount?: number;
  borderGlowColor?: string;
  backgroundColor?: string;
  shadowColor?: string;
  rotateX?: number;
  rotateY?: number;
  floatIntensity?: number;
  style?: React.CSSProperties;
}

export const SpatialGlassContainer: React.FC<SpatialGlassContainerProps> = ({
  children,
  durationInFrames = 150,
  width = "85%",
  height = "75%",
  borderRadius = 24,
  blurAmount = 20,
  borderGlowColor = "rgba(100, 210, 255, 0.35)",
  backgroundColor = "rgba(10, 10, 20, 0.45)",
  shadowColor = "rgba(100, 180, 255, 0.2)",
  rotateX = 5,
  rotateY = -8,
  floatIntensity = 1,
  style,
}) => {
  const frame = useCurrentFrame();

  const breathPhase = (frame / durationInFrames) * Math.PI * 2;
  const translateZ = Math.sin(breathPhase) * 12 * floatIntensity;
  const breatheScale = 1 + Math.sin(breathPhase * 0.7) * 0.01 * floatIntensity;

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width,
    height,
    borderRadius: `${borderRadius}px`,
    background: backgroundColor,
    backdropFilter: `blur(${blurAmount}px) saturate(180%)`,
    WebkitBackdropFilter: `blur(${blurAmount}px) saturate(180%)`,
    border: `1px solid ${borderGlowColor}`,
    boxShadow: `
      0 0 30px ${shadowColor},
      0 20px 60px ${shadowColor},
      0 4px 12px rgba(0, 0, 0, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.1)
    `,
    transform: `
      perspective(1200px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateZ(${translateZ}px)
      scale(${breatheScale})
    `,
    transformStyle: "preserve-3d",
    overflow: "hidden",
    padding: "3px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ...style,
  };

  const innerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    borderRadius: `${borderRadius - 2}px`,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={containerStyle}>
      <div style={innerStyle}>
        {children}
      </div>
    </div>
  );
};
