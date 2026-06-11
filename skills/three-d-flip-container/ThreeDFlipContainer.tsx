import React from "react";
import { useCurrentFrame, spring, interpolate } from "remotion";

interface ThreeDFlipContainerProps {
  front: React.ReactNode;
  back: React.ReactNode;
  flipStartFrame?: number;
  flipDurationFrames?: number;
  holdFrontFrames?: number;
  holdBackFrames?: number;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  perspective?: number;
  frontBg?: string;
  backBg?: string;

  style?: React.CSSProperties;
}

export const ThreeDFlipContainer: React.FC<ThreeDFlipContainerProps> = ({
  front,
  back,
  flipStartFrame = 30,
  flipDurationFrames = 36,
  holdFrontFrames = 90,
  holdBackFrames = 30,
  width = "85%",
  height = "75%",
  borderRadius = 20,
  perspective = 1500,
  frontBg = "#0d1117",
  backBg = "#0b1a2e",

  style,
}) => {
  const frame = useCurrentFrame();

  const phase1End = flipStartFrame;
  const phase2End = flipStartFrame + flipDurationFrames;

  let rotateY = 0;
  let frontOpacity = 1;
  let backOpacity = 0;
  let isFlipping = false;

  if (frame < phase1End) {
    rotateY = 0;
    frontOpacity = 1;
    backOpacity = 0;
  } else if (frame >= phase1End && frame < phase2End) {
    isFlipping = true;
    const flipFrame = frame - phase1End;
    const flipSpring = spring({
      frame: flipFrame,
      fps: 30,
      config: { damping: 10, mass: 0.8, stiffness: 80 },
      durationInFrames: flipDurationFrames,
    });
    rotateY = flipSpring * 180;
    frontOpacity = interpolate(flipSpring, [0, 0.45, 0.55, 1], [1, 0, 0, 0]);
    backOpacity = interpolate(flipSpring, [0, 0.45, 0.55, 1], [0, 0, 1, 1]);
  } else {
    rotateY = 180;
    frontOpacity = 0;
    backOpacity = 1;
  }

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width,
    height,
    perspective: `${perspective}px`,
    ...style,
  };

  const cardStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    transformStyle: "preserve-3d",
    transform: `rotateY(${rotateY}deg)`,
  };

  const faceStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    borderRadius: `${borderRadius}px`,
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    border: "1px solid rgba(255,255,255,0.08)",
  };

  const frontStyle: React.CSSProperties = {
    ...faceStyle,
    background: frontBg,
    opacity: frontOpacity,
    pointerEvents: frontOpacity > 0.01 ? "auto" : "none",
  };

  const backStyle: React.CSSProperties = {
    ...faceStyle,
    background: backBg,
    transform: "rotateY(180deg)",
    opacity: backOpacity,
    pointerEvents: backOpacity > 0.01 ? "auto" : "none",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={frontStyle}>
          {front}
        </div>
        <div style={backStyle}>
          {back}
        </div>
      </div>
    </div>
  );
};
