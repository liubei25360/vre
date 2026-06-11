import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { SpatialGlassContainer } from "./SpatialGlassContainer";

const FakeCodeSnippet: React.FC = () => {
  const lines = [
    { text: "// AI Video Pipeline", indent: 0, color: "#6a9955" },
    { text: "import { neuralRender } from 'remotion/ai'", indent: 0, color: "#569cd6" },
    { text: "", indent: 0, color: "transparent" },
    { text: "const video = await neuralRender({", indent: 0, color: "#d4d4d4" },
    { text: '  prompt: "cyberpunk city at night",', indent: 2, color: "#ce9178" },
    { text: "  fps: 30,", indent: 2, color: "#b5cea8" },
    { text: "  duration: 5,", indent: 2, color: "#b5cea8" },
    { text: "  style: 'glass-morphism',", indent: 2, color: "#ce9178" },
    { text: "});", indent: 0, color: "#d4d4d4" },
  ];

  return (
    <div
      style={{
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontSize: "2.2vw",
        lineHeight: 1.8,
        padding: "2vw",
        color: "#d4d4d4",
      }}
    >
      {lines.map((line, i) => (
        <div key={i} style={{ paddingLeft: `${line.indent * 1.5}vw`, color: line.color }}>
          {line.text || "\u00A0"}
        </div>
      ))}
    </div>
  );
};

export const SpatialGlassContainerDemo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 50% 30%, #0d1b2a, #020810)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <SpatialGlassContainer
        blurAmount={22}
        borderGlowColor="rgba(100, 210, 255, 0.4)"
        shadowColor="rgba(100, 180, 255, 0.25)"
        floatIntensity={1.2}
      >
        <FakeCodeSnippet />
      </SpatialGlassContainer>
    </AbsoluteFill>
  );
};
