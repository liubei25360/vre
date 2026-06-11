import React from "react";
import { SpatialGlassContainer } from "../spatial-glass-container/SpatialGlassContainer";

interface MacOsGlassWindowProps {
  children?: React.ReactNode;
  title?: string;
  durationInFrames?: number;
  width?: number | string;
  maxHeight?: number | string;
  borderRadius?: number;
  blurAmount?: number;
  borderGlowColor?: string;
  style?: React.CSSProperties;
}

const trafficLightColors = ["#ff5f57", "#febc2e", "#28c840"];

export const MacOsGlassWindow: React.FC<MacOsGlassWindowProps> = ({
  children,
  title = "Untitled",
  durationInFrames = 150,
  width = "88%",
  maxHeight = "85%",
  borderRadius = 16,
  blurAmount = 18,
  borderGlowColor = "rgba(100, 210, 255, 0.3)",
  style,
}) => {
  return (
    <SpatialGlassContainer
      durationInFrames={durationInFrames}
      width={width}
      borderGlowColor={borderGlowColor}
      blurAmount={blurAmount}
      borderRadius={borderRadius}
      style={{ flexDirection: "column", justifyContent: "flex-start", gap: 0, padding: 0, ...style }}
    >
      <div
        style={{
          width: "100%",
          height: "36px",
          minHeight: "36px",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          boxSizing: "border-box",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(0,0,0,0.25)",
          borderTopLeftRadius: `${borderRadius - 2}px`,
          borderTopRightRadius: `${borderRadius - 2}px`,
          gap: "12px",
        }}
      >
        <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
          {trafficLightColors.map((color) => (
            <div
              key={color}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: color,
                boxShadow: `0 0 2px ${color}66`,
              }}
            />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            textAlign: "center",
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "1.6vw",
            fontWeight: 500,
            color: "rgba(255,255,255,0.55)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </div>
        <div style={{ width: "52px", flexShrink: 0 }} />
      </div>

      <div
        style={{
          width: "100%",
          flex: 1,
          overflow: "hidden",
          borderBottomLeftRadius: `${borderRadius - 2}px`,
          borderBottomRightRadius: `${borderRadius - 2}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </SpatialGlassContainer>
  );
};
