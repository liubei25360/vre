import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, interpolate, staticFile, Img } from "remotion";
import { ParallaxTiltContainer } from "../../skills/parallax-tilt-container/ParallaxTiltContainer";
import { SmartCameraRig } from "../../skills/smart-camera-rig/SmartCameraRig";

interface CameraFrame {
  atFrame: number;
  scale?: number;
  x?: number;
  y?: number;
}

export const ProScreenshotShowcase: React.FC = () => {
  const frame = useCurrentFrame();

  const cameraFrames: CameraFrame[] = [
    { atFrame: 0, scale: 1, x: 0, y: 0 },
    { atFrame: 55, scale: 1.4, x: 0, y: -15 },
    { atFrame: 105, scale: 1.4, x: 0, y: -15 },
    { atFrame: 138, scale: 1, x: 0, y: 0 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse 70% 50% at 50% 35%, #1a1a3e 0%, #020617 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ParallaxTiltContainer
        durationInFrames={240}
        width="92%"
        height="85%"
        tiltIntensity={0.6}
        borderRadius={28}
      >
        <SmartCameraRig cameraFrames={cameraFrames} baseScale={1}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Img
              src={staticFile("screenshot.png")}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                borderRadius: "12px",
                boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
              }}
            />
          </div>
        </SmartCameraRig>
      </ParallaxTiltContainer>
    </AbsoluteFill>
  );
};
