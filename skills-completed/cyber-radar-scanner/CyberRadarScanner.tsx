import React from "react";
import { useCurrentFrame } from "remotion";

interface CyberRadarScannerProps {
  children?: React.ReactNode;
  scanDuration?: number;
  scanColor?: string;
  scanWidth?: number;
  glowSpread?: number;
  style?: React.CSSProperties;
}

export const CyberRadarScanner: React.FC<CyberRadarScannerProps> = ({
  children,
  scanDuration = 60,
  scanColor = "#38bdf8",
  scanWidth = 4,
  glowSpread = 60,
  style,
}) => {
  const frame = useCurrentFrame();
  const phase = (frame % scanDuration) / scanDuration;
  const scanY = phase * 100;

  const overlayStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    ...style,
  };

  return (
    <div style={overlayStyle}>
      {children}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `
            linear-gradient(
              0deg,
              ${scanColor}00 0%,
              ${scanColor}08 ${scanY - 3}%,
              ${scanColor}18 ${scanY - 1.5}%,
              ${scanColor}40 ${scanY - 0.3}%,
              ${scanColor}60 ${scanY}%,
              ${scanColor}40 ${scanY + 0.3}%,
              ${scanColor}18 ${scanY + 1.5}%,
              ${scanColor}08 ${scanY + 3}%,
              ${scanColor}00 100%
            )
          `,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: `${scanY}%`,
          height: `${scanWidth}px`,
          background: scanColor,
          boxShadow: `
            0 0 ${scanWidth * 4}px ${scanColor},
            0 0 ${scanWidth * 12}px ${scanColor},
            0 0 ${scanWidth * 24}px ${scanColor}
          `,
          pointerEvents: "none",
          opacity: 0.9,
        }}
      />
    </div>
  );
};
