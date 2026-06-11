import { AbsoluteFill, Sequence } from "remotion";
import { ParallaxTiltContainer } from "./ParallaxTiltContainer";

export const ParallaxTiltContainerDemo: React.FC = () => (
  <AbsoluteFill style={{ background: "#020617", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <ParallaxTiltContainer>
      <div style={{ textAlign: "center", color: "#e2e8f0", fontFamily: "'Inter',sans-serif" }}>
        <div style={{ fontSize: "5vw", fontWeight: 900, color: "#64d2ff" }}>Parallax</div>
        <div style={{ fontSize: "2vw", opacity: 0.5, marginTop: "1vw" }}>Gravity-driven 3D tilt</div>
      </div>
    </ParallaxTiltContainer>
  </AbsoluteFill>
);
