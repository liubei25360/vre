import React from "react";
import { useCurrentFrame, spring, interpolate } from "remotion";

interface KineticChapterTitleProps {
  title: string;
  subtitle?: string;
  durationInFrames?: number;
  entranceFrame?: number;
  fontSize?: number | string;
  textColor?: string;
  backgroundColor?: string;
  accentColor?: string;
  shakeIntensity?: number;
  fontFamily?: string;

  style?: React.CSSProperties;
}

export const KineticChapterTitle: React.FC<KineticChapterTitleProps> = ({
  title,
  subtitle = "",
  durationInFrames = 90,
  entranceFrame = 5,
  fontSize = "10vw",
  textColor = "#ffffff",
  backgroundColor = "#0a0a0a",
  accentColor = "#64d2ff",
  shakeIntensity = 1,
  fontFamily = "'Inter', sans-serif",

  style,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - entranceFrame;

  const titleSpring = spring({
    frame: relativeFrame,
    fps: 30,
    config: { damping: 8, mass: 0.6, stiffness: 120 },
    durationInFrames: 20,
  });

  const titleScale = interpolate(titleSpring, [0, 0.5, 1], [0.3, 1.12, 1]);
  const titleOpacity = interpolate(titleSpring, [0, 0.15, 1], [0, 1, 1]);

  const subtitleDelay = 6;
  const subtitleFrame = Math.max(0, relativeFrame - subtitleDelay);
  const subtitleSpring = spring({
    frame: subtitleFrame,
    fps: 30,
    config: { damping: 12, mass: 0.4, stiffness: 80 },
    durationInFrames: 16,
  });

  const subtitleOpacity = subtitleSpring;
  const subtitleY = interpolate(subtitleSpring, [0, 1], [12, 0]);

  const shakeDuration = 8;
  const shakeActive = relativeFrame >= 0 && relativeFrame < shakeDuration;

  const getShakeOffset = (): { x: number; y: number } => {
    if (!shakeActive) return { x: 0, y: 0 };

    const shakeProgress = spring({
      frame: relativeFrame,
      fps: 30,
      config: { damping: 6, mass: 0.3, stiffness: 200 },
      durationInFrames: shakeDuration,
    });

    const amplitude = (1 - shakeProgress) * 4 * shakeIntensity;

    const phaseX = relativeFrame * 2.7;
    const phaseY = relativeFrame * 3.9;

    const x = Math.sin(phaseX) * amplitude * (1 - shakeProgress * 0.8);
    const y = Math.cos(phaseY) * amplitude * (1 - shakeProgress * 0.8);

    return { x, y };
  };

  const shake = getShakeOffset();

  const letterSpacing = `${interpolate(titleSpring, [0, 0.4, 1], [0.5, 0.08, 0.02])}em`;

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    ...style,
  };

  const textBlockStyle: React.CSSProperties = {
    transform: `translate(${shake.x}px, ${shake.y}px)`,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "4vw",
  };

  return (
    <div style={containerStyle}>
      <div style={textBlockStyle}>
        <h1
          style={{
            fontFamily,
            fontSize,
            fontWeight: 900,
            color: textColor,
            lineHeight: 1.05,
            margin: 0,
            transform: `scale(${titleScale})`,
            opacity: titleOpacity,
            letterSpacing,
            textShadow: titleSpring > 0.3 && titleSpring < 0.7
              ? `0 0 ${Math.round(Math.max(0, (1 - titleSpring) * 40))}px ${accentColor}`
              : "none",
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            style={{
              fontFamily,
              fontSize: "3.5vw",
              fontWeight: 400,
              color: accentColor,
              marginTop: "1.5vw",
              marginBottom: 0,
              opacity: subtitleOpacity,
              transform: `translateY(${subtitleY}px)`,
              letterSpacing: "0.15em",
            }}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
