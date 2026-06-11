import React from "react";

export const EFFECT_THEME = {
  textPrimary: "#EAF6FF",
  textSecondary: "#BFD4E6",
  textMuted: "#8EA7BB",
  accentCyan: "#5BE7FF",
  accentBlue: "#2F7BFF",
  accentWarm: "#FFB36A",
  accentDanger: "#FF7A6B",
  surfaceDark: "rgba(6, 14, 26, 0.42)",
  surfaceMid: "rgba(10, 24, 42, 0.28)",
  borderCold: "rgba(91, 231, 255, 0.28)",
};

export const SAFE_X = 84;
export const SAFE_Y = 154;
export const SAFE_W = 912;
export const SAFE_H = 1612;

export const OverlayContrastField: React.FC<{
  top?: number;
  centerY?: number;
  width?: number;
  height?: number;
}> = ({
  top = 240,
  centerY = 860,
  width = 820,
  height = 980,
}) => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 540 - width / 2,
          top,
          width,
          height,
          borderRadius: 999,
          background:
            "radial-gradient(ellipse, rgba(4,12,24,0.42) 0%, rgba(4,12,24,0.26) 38%, rgba(4,12,24,0.06) 72%, transparent 100%)",
          filter: "blur(26px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 540 - (width - 120) / 2,
          top: centerY - 180,
          width: width - 120,
          height: 360,
          borderRadius: 999,
          background:
            "radial-gradient(ellipse, rgba(91,231,255,0.12) 0%, rgba(47,123,255,0.06) 34%, transparent 75%)",
          filter: "blur(34px)",
          opacity: 0.8,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 540 - (width - 220) / 2,
          top: centerY + 180,
          width: width - 220,
          height: 120,
          borderRadius: 999,
          background:
            "radial-gradient(ellipse, rgba(255,179,106,0.12) 0%, rgba(255,179,106,0.04) 45%, transparent 100%)",
          filter: "blur(28px)",
          pointerEvents: "none",
        }}
      />
    </>
  );
};
