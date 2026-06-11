import { AbsoluteFill, Sequence } from "remotion";
import { ThreeDFlipContainer } from "./ThreeDFlipContainer";

const PromptFace: React.FC = () => (
  <div
    style={{
      padding: "4vw",
      textAlign: "center",
      fontFamily: "'Inter', sans-serif",
    }}
  >
    <h2
      style={{
        color: "#818cf8",
        fontSize: "4vw",
        margin: 0,
        marginBottom: "2vw",
      }}
    >
      Prompt
    </h2>
    <p
      style={{
        color: "#c9d1d9",
        fontSize: "2.5vw",
        lineHeight: 1.7,
        margin: 0,
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      Generate a cyberpunk dashboard with neon charts, holographic panels, and dark glass morphism background
    </p>
  </div>
);

const CodeFace: React.FC = () => (
  <div
    style={{
      padding: "3vw",
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: "2vw",
      color: "#c9d1d9",
      lineHeight: 1.8,
    }}
  >
    <div style={{ color: "#6a9955" }}>// Generated Code</div>
    <div>
      <span style={{ color: "#569cd6" }}>import</span>{" "}
      <span style={{ color: "#4ade80" }}>Dashboard</span>{" "}
      <span style={{ color: "#569cd6" }}>from</span>{" "}
      <span style={{ color: "#ce9178" }}>"vibe-ui/dash"</span>
    </div>
    <div style={{ color: "#c9d1d9" }}>{""}</div>
    <div>
      <span style={{ color: "#569cd6" }}>const</span>{" "}
      <span style={{ color: "#38bdf8" }}>app</span>{" "}
      <span style={{ color: "#d4d4d4" }}>=</span>{" "}
      <span style={{ color: "#ce9178" }}>{`<Dashboard`}</span>
    </div>
    <div>
      {" "}
      <span style={{ color: "#ce9178" }}>theme</span>
      <span style={{ color: "#d4d4d4" }}>=</span>
      <span style={{ color: "#ce9178" }}>{`"neon"`}</span>
    </div>
    <div>
      {" "}
      <span style={{ color: "#ce9178" }}>charts</span>
      <span style={{ color: "#d4d4d4" }}>=</span>
      <span style={{ color: "#ce9178" }}>{`{[line, donut, radar]}`}</span>
    </div>
    <div>
      {" "}
      <span style={{ color: "#ce9178" }}>panels</span>
      <span style={{ color: "#d4d4d4" }}>=</span>
      <span style={{ color: "#ce9178" }}>{`{[stats, logs, alerts]}`}</span>
    </div>
    <div>
      <span style={{ color: "#ce9178" }}>{`/>`}</span>
    </div>
  </div>
);

export const ThreeDFlipContainerDemo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 50% 30%, #1a1a2e, #020617)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Sequence from={0} durationInFrames={120}>
        <ThreeDFlipContainer
          front={<PromptFace />}
          back={<CodeFace />}
          flipStartFrame={40}
          flipDurationFrames={36}
        />
      </Sequence>
      <Sequence from={120} durationInFrames={120}>
        <ThreeDFlipContainer
          front={<CodeFace />}
          back={<PromptFace />}
          flipStartFrame={40}
          flipDurationFrames={36}
          frontBg="#0b1a2e"
          backBg="#0d1117"
        />
      </Sequence>
    </AbsoluteFill>
  );
};
