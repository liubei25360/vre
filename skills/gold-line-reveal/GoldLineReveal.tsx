import React from "react";
import { useCurrentFrame, spring, interpolate } from "remotion";

interface GoldLineRevealProps {
  startFrame?: number;
  lineWidth?: string;
  lineColor?: string;
  glowColor?: string;
  durationInFrames?: number;
  style?: React.CSSProperties;
}

export const GoldLineReveal: React.FC<GoldLineRevealProps> = ({
  startFrame = 0,
  lineWidth = "60%",
  lineColor = "#D4AF37",
  glowColor = "#D4AF37",
  durationInFrames = 30,
  style,
}) => {
  const frame = useCurrentFrame();
  const rf = Math.max(0, frame - startFrame);

  const lineSpring = spring({
    frame: rf,
    fps: 30,
    config: { damping: 12, mass: 0.4, stiffness: 80 },
    durationInFrames,
  });

  const scaleX = lineSpring;
  const opacity = interpolate(lineSpring, [0, 0.3, 1], [0, 0.6, 1]);

  return (
    <div
      style={{
        width: lineWidth,
        height: "1px",
        margin: "0 auto",
        border: "none",
        background: lineColor,
        transformOrigin: "center",
        transform: `scaleX(${scaleX})`,
        opacity,
        boxShadow: opacity > 0.5
          ? [`0 0 6px ${glowColor}`, `0 0 14px ${glowColor}66`].join(", ")
          : "none",
        ...style,
      }}
    />
  );
};
