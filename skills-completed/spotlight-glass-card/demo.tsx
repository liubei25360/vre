import { AbsoluteFill, Sequence } from "remotion";
import { SpotlightGlassCard } from "./SpotlightGlassCard";

export const SpotlightGlassCardDemo: React.FC = () => (
  <AbsoluteFill style={{ background: "#020617", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <SpotlightGlassCard glowColor="#38bdf8">
      <div style={{ textAlign: "center", color: "#e2e8f0", fontFamily: "'Inter',sans-serif" }}>
        <div style={{ fontSize: "4vw", fontWeight: 900, color: "#38bdf8" }}>Edge Glow</div>
        <div style={{ fontSize: "2vw", opacity: 0.5, marginTop: "1vw" }}>Auto-cruising spotlight</div>
      </div>
    </SpotlightGlassCard>
  </AbsoluteFill>
);
