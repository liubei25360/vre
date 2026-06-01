import { AbsoluteFill, Sequence } from "remotion";
import { ConfettiBurst } from "./ConfettiBurst";

export const ConfettiBurstDemo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "5vw",
          fontWeight: 900,
          color: "#4ade80",
          textShadow: "0 0 20px #4ade80",
        }}
      >
        BUILD PASSED
      </div>
      <ConfettiBurst startFrame={15} color="#4ade80" />
      <Sequence from={70}>
        <ConfettiBurst startFrame={0} color="#fbbf24" spreadRadius={250} particleCount={20} />
      </Sequence>
    </AbsoluteFill>
  );
};
