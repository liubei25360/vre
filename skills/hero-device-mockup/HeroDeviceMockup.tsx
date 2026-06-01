import React from "react";
import { useCurrentFrame } from "remotion";

interface HeroDeviceMockupProps {
  children?: React.ReactNode;
  deviceType?: "phone" | "laptop";
  durationInFrames?: number;
  width?: number | string;
  backgroundColor?: string;
  deviceColor?: string;
  glowColor?: string;
  style?: React.CSSProperties;
}

const PHONE_CLIP = "polygon(8% 4%, 92% 4%, 92% 96%, 8% 96%)";
const LAPTOP_CLIP = "polygon(4% 6%, 96% 6%, 92% 88%, 8% 88%)";

const PHONE_BEZEL = "polygon(5% 0%, 95% 0%, 95% 100%, 5% 100%, 5% 96%, 91% 96%, 91% 4%, 9% 4%, 9% 96%, 5% 96%)";

export const HeroDeviceMockup: React.FC<HeroDeviceMockupProps> = ({
  children,
  deviceType = "phone",
  durationInFrames = 150,
  width = "55%",
  backgroundColor = "transparent",
  deviceColor = "#1a1a2e",
  glowColor = "rgba(100,210,255,0.2)",
  style,
}) => {
  const frame = useCurrentFrame();
  const breathPhase = (frame / durationInFrames) * Math.PI * 2;
  const translateY = Math.sin(breathPhase) * 8;
  const rotateX = Math.sin(breathPhase * 0.6) * 2;

  const clipPath = deviceType === "phone" ? PHONE_CLIP : LAPTOP_CLIP;
  const bezelClip = deviceType === "phone" ? PHONE_BEZEL : undefined;

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width,
    aspectRatio: deviceType === "phone" ? "9 / 18" : "16 / 10",
    margin: "0 auto",
    perspective: "800px",
    ...style,
  };

  const deviceStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    background: deviceColor,
    borderRadius: deviceType === "phone" ? "12%" : "5%",
    boxShadow: `0 0 40px ${glowColor}, 0 30px 80px rgba(0,0,0,0.5)`,
    transform: `rotateX(${rotateX}deg) translateY(${translateY}px)`,
    overflow: "hidden",
  };

  const notchStyle: React.CSSProperties = deviceType === "phone" ? {
    position: "absolute",
    top: "2.5%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "30%",
    height: "2.5%",
    borderRadius: "0 0 999px 999px",
    background: "#000",
    zIndex: 2,
  } : {};

  const screenStyle: React.CSSProperties = {
    position: "absolute",
    top: "2.5%",
    left: deviceType === "phone" ? "6%" : "5%",
    right: deviceType === "phone" ? "6%" : "5%",
    bottom: deviceType === "phone" ? "2.5%" : "14%",
    background: "#000",
    borderRadius: deviceType === "phone" ? "9%" : "3%",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={containerStyle}>
      <div style={deviceStyle}>
        {deviceType === "phone" && <div style={notchStyle} />}
        <div style={screenStyle}>
          {children}
        </div>
        {deviceType === "phone" && (
          <div
            style={{
              position: "absolute",
              bottom: "6%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "28%",
              height: "1.5%",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.2)",
              zIndex: 2,
            }}
          />
        )}
      </div>
    </div>
  );
};
