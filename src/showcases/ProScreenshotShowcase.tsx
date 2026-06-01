import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, interpolate, staticFile, Img } from "remotion";
import { ParallaxTiltContainer } from "../../skills/parallax-tilt-container/ParallaxTiltContainer";
import { MacOsGlassWindow } from "../../skills/macos-glass-window/MacOsGlassWindow";
import { SmartCameraRig } from "../../skills/smart-camera-rig/SmartCameraRig";
import { SpotlightGlassCard } from "../../skills/spotlight-glass-card/SpotlightGlassCard";

type CameraFrame = {
  atFrame: number;
  scale?: number;
  x?: number;
  y?: number;
};

export const ProScreenshotShowcase: React.FC = () => {
  const frame = useCurrentFrame();

  const cameraFrames: CameraFrame[] = [
    { atFrame: 0, scale: 1, x: 0, y: 0 },
    { atFrame: 55, scale: 1.42, x: 0, y: -15 },
    { atFrame: 105, scale: 1.42, x: 0, y: -15 },
    { atFrame: 135, scale: 1, x: 0, y: 0 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse 70% 50% at 50% 35%, #1a1a3e 0%, #020617 100%)",
      }}
    >
      <ParallaxTiltContainer
        durationInFrames={240}
        width="92%"
        height="85%"
        tiltIntensity={0.7}
        borderRadius={24}
      >
        <MacOsGlassWindow
          title="AI Video Pipeline — Production Dashboard"
          borderGlowColor="rgba(100, 210, 255, 0.3)"
          width="100%"
          borderRadius={20}
          style={{ maxHeight: "100%" }}
        >
          <SmartCameraRig
            cameraFrames={cameraFrames}
            baseScale={1}
          >
            <Img
              src={staticFile("screenshot.png")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: "8px",
              }}
            />
          </SmartCameraRig>
        </MacOsGlassWindow>
      </ParallaxTiltContainer>
    </AbsoluteFill>
  );
};
