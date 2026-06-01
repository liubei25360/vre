import React from "react";
import { AbsoluteFill, staticFile, Img } from "remotion";
import { ZAxisTransition } from "./ZAxisTransition";

const SceneCard: React.FC<{
  src: string;
  label: string;
  gradient: string;
}> = ({ src, label, gradient }) => {
  return (
    <AbsoluteFill
      style={{
        background: gradient,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "6%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          padding: "2vw 5vw",
          borderRadius: "99px",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontSize: "3.5vw",
            fontWeight: 800,
            color: "#e2e8f0",
            letterSpacing: "0.06em",
          }}
        >
          {label}
        </span>
      </div>
      <Img
        src={src}
        style={{
          width: "88%",
          borderRadius: "16px",
          boxShadow: "0 25px 80px rgba(0,0,0,0.6)",
        }}
      />
    </AbsoluteFill>
  );
};

export const ZAxisTransitionDemo: React.FC = () => {
  return (
    <ZAxisTransition
      transitionStartFrame={15}
      transitionDurationFrames={36}
      backgroundColor="#020617"
      motionBlurLayers={8}
    >
      <SceneCard
        src={staticFile("screenshot1.png")}
        label="BEFORE · AI Timeline v1"
        gradient="linear-gradient(135deg, #0f172a, #1e1b4b)"
      />
      <SceneCard
        src={staticFile("screenshot2.png")}
        label="AFTER · AI Timeline v2"
        gradient="linear-gradient(135deg, #0f172a, #0b3d2e)"
      />
    </ZAxisTransition>
  );
};
