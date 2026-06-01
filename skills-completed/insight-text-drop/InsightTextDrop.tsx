import React from "react";
import { useCurrentFrame, spring, interpolate } from "remotion";

interface InsightTextDropProps {
  text: string;
  subtext?: string;
  durationInFrames?: number;
  startFrame?: number;
  textColor?: string;
  sweepColor?: string;
  fontSize?: number | string;
  fontFamily?: string;
  backgroundColor?: string;
  style?: React.CSSProperties;
}

export const InsightTextDrop: React.FC<InsightTextDropProps> = ({
  text,
  subtext = "",
  durationInFrames = 90,
  startFrame = 5,
  textColor = "#e2e8f0",
  sweepColor = "#fbbf24",
  fontSize = "5vw",
  fontFamily = "'Georgia', 'Times New Roman', serif",
  backgroundColor = "#0a0a0a",
  style,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  const dropSpring = spring({
    frame: relativeFrame,
    fps: 30,
    config: { damping: 8, mass: 0.7, stiffness: 100 },
    durationInFrames: 18,
  });

  const translateY = interpolate(dropSpring, [0, 1], [-80, 0]);
  const opacity = interpolate(dropSpring, [0, 0.2, 1], [0, 1, 1]);
  const scale = interpolate(dropSpring, [0, 1], [0.85, 1]);

  const sweepDelay = 16;
  const sweepFrame = Math.max(0, relativeFrame - sweepDelay);
  const sweepPos = interpolate(sweepFrame, [0, 20], [-120, 120]);

  const subSpring = spring({
    frame: Math.max(0, relativeFrame - 8),
    fps: 30,
    config: { damping: 12, mass: 0.3, stiffness: 80 },
    durationInFrames: 14,
  });
  const subOpacity = subSpring;

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "6vw",
    boxSizing: "border-box",
    ...style,
  };

  return (
    <div style={containerStyle}>
      <div
        style={{
          position: "relative",
          display: "inline-block",
          transform: `translateY(${translateY}px) scale(${scale})`,
          opacity,
        }}
      >
        <h1
          style={{
            fontFamily,
            fontSize,
            fontWeight: 700,
            color: textColor,
            textAlign: "center",
            lineHeight: 1.3,
            margin: 0,
            position: "relative",
            background: sweepFrame > 0
              ? `linear-gradient(90deg, ${textColor} 0%, ${textColor} ${sweepPos - 30}%, ${sweepColor} ${sweepPos}%, ${textColor} ${sweepPos + 30}%, ${textColor} 100%)`
              : textColor,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: sweepFrame > 0 ? "transparent" : textColor,
            backgroundClip: "text",
          }}
        >
          {text}
        </h1>
      </div>
      {subtext && (
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "2.5vw",
            fontWeight: 300,
            color: "rgba(255,255,255,0.5)",
            marginTop: "2vw",
            marginBottom: 0,
            opacity: subOpacity,
            transform: `translateY(${interpolate(subSpring, [0, 1], [8, 0])}px)`,
          }}
        >
          {subtext}
        </p>
      )}
    </div>
  );
};
