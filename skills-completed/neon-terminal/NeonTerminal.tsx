import React from "react";
import { useCurrentFrame, spring, interpolate } from "remotion";

interface CodeLine {
  text: string;
  prefix?: string;
  highlightColor?: string;
}

interface NeonTerminalProps {
  lines: CodeLine[];
  activeLine?: number;
  durationInFrames?: number;
  fontSize?: number | string;
  lineHeight?: number;
  backgroundColor?: string;
  textColor?: string;
  dimmedOpacity?: number;
  primaryColor?: string;
  fontFamily?: string;

  style?: React.CSSProperties;
}

const defaultColors = {
  bg: "#0d1117",
  text: "#c9d1d9",
  primary: "#64d2ff",
  dim: 0.5,
};

export const NeonTerminal: React.FC<NeonTerminalProps> = ({
  lines,
  activeLine = 0,
  durationInFrames = 150,
  fontSize = "2.2vw",
  lineHeight = 1.9,
  backgroundColor = defaultColors.bg,
  textColor = defaultColors.text,
  dimmedOpacity = defaultColors.dim,
  primaryColor = defaultColors.primary,
  fontFamily = "'JetBrains Mono', 'Fira Code', monospace",

  style,
}) => {
  const frame = useCurrentFrame();

  const terminalStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor,
    fontFamily,
    fontSize,
    color: textColor,
    padding: "4vw",
    boxSizing: "border-box",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    ...style,
  };

  return (
    <div style={terminalStyle}>
      {lines.map((line, i) => {
        const isHighlighted = i === activeLine;
        const lineNum = i + 1;

        const lineOpacity = isHighlighted ? 1 : dimmedOpacity;

        const prefix = line.prefix || (i === 0 ? ">" : "  ");
        const isPrompt = i === 0 || (line.prefix && line.prefix.includes("$"));

        const prefixColor = isPrompt ? "#4ade80" : "rgba(255,255,255,0.25)";

        const highlightColor = line.highlightColor || primaryColor;

        return (
          <div
            key={i}
            style={{
              display: "flex",
              lineHeight,
              opacity: lineOpacity,
              transition: "opacity 0.3s ease",
            }}
          >
            <span
              style={{
                color: "rgba(255,255,255,0.18)",
                minWidth: "3vw",
                textAlign: "right",
                marginRight: "1.5vw",
                flexShrink: 0,
                userSelect: "none",
              }}
            >
              {String(lineNum).padStart(2, " ")}
            </span>
            <span style={{ color: prefixColor, flexShrink: 0 }}>
              {prefix}
            </span>
            <span
              style={{
                color: isHighlighted ? highlightColor : textColor,
                whiteSpace: "pre",
                textShadow: isHighlighted
                  ? `0 0 8px ${highlightColor}, 0 0 16px ${highlightColor}66`
                  : "none",
              }}
            >
              {line.text}
            </span>
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          bottom: "3vw",
          left: "4vw",
          right: "4vw",
          height: "2px",
          background: `linear-gradient(90deg, ${primaryColor}00, ${primaryColor}, ${primaryColor}00)`,
          opacity: 0.4,
        }}
      />
    </div>
  );
};
