import React from "react";
import { useCurrentFrame, interpolate, spring } from "remotion";

interface DataMetricCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  durationInFrames?: number;
  startFrame?: number;
  countingFrames?: number;
  fontSize?: number | string;
  labelSize?: number | string;
  primaryColor?: string;
  backgroundColor?: string;
  glowColor?: string;
  decimals?: number;

  style?: React.CSSProperties;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export const DataMetricCounter: React.FC<DataMetricCounterProps> = ({
  value,
  prefix = "",
  suffix = "",
  durationInFrames = 90,
  startFrame = 5,
  countingFrames = 45,
  fontSize = "12vw",
  labelSize = "3vw",
  primaryColor = "#64d2ff",
  backgroundColor = "#0a0a0f",
  glowColor = "#64d2ff",
  decimals = 0,

  style,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  const countingProgress = Math.min(1, relativeFrame / countingFrames);
  const eased = countingProgress <= 0 ? 0 : easeOutCubic(countingProgress);
  const displayValue = Math.min(value, value * eased);

  const formatted = displayValue.toFixed(decimals);
  const targetFormatted = value.toFixed(decimals);

  const doneFrame = startFrame + countingFrames;
  const isDone = frame >= doneFrame;

  const getDigitGlow = (charIndex: number): string => {
    const digitStartFrame = doneFrame + charIndex * 1.5;
    const digitDelay = frame - digitStartFrame;

    if (digitDelay < 0) return "none";

    const digitGlow = spring({
      frame: digitDelay,
      fps: 30,
      config: { damping: 8, mass: 0.3, stiffness: 120 },
      durationInFrames: 6,
    });

    if (digitGlow < 0.01) return "none";

    const intensity = digitGlow * 20;
    return [
      `0 0 ${intensity}px ${glowColor}`,
      `0 0 ${intensity * 2}px ${glowColor}`,
      `0 0 ${intensity * 3}px ${glowColor}`,
    ].join(", ");
  };

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    ...style,
  };

  const numberContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "center",
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
  };

  const prefixSuffixStyle: React.CSSProperties = {
    fontSize: labelSize,
    fontWeight: 400,
    color: "rgba(255,255,255,0.6)",
    lineHeight: 1,
  };

  const renderDigits = () => {
    const chars: React.ReactNode[] = [];

    for (let i = 0; i < formatted.length; i++) {
      const char = formatted[i];
      const isGlowing = isDone || (frame > doneFrame);

      chars.push(
        <span
          key={i}
          style={{
            fontSize,
            fontWeight: 800,
            color: primaryColor,
            lineHeight: 1,
            display: "inline-block",
            textShadow: isGlowing ? getDigitGlow(i) : "none",
            minWidth: char === "," || char === "." ? "0.3em" : "0.6em",
            textAlign: "center",
            transition: "text-shadow 0.1s ease",
          }}
        >
          {char}
        </span>,
      );
    }

    return chars;
  };

  return (
    <div style={containerStyle}>
      <div style={numberContainerStyle}>
        {prefix ? <span style={prefixSuffixStyle}>{prefix}</span> : null}
        <span style={{ display: "flex", alignItems: "baseline" }}>
          {renderDigits()}
        </span>
        {suffix ? <span style={prefixSuffixStyle}>{suffix}</span> : null}
      </div>
    </div>
  );
};
