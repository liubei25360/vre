import { AbsoluteFill, Sequence } from "remotion";
import { NeonTerminal } from "./NeonTerminal";

const codeLines = [
  { text: "npx vibe-code generate --style cyber" },
  { text: "" },
  { text: 'import { NeuralRenderer } from "vibe-code/render"', prefix: "  " },
  { text: "", prefix: "  " },
  { text: "const pipeline = new NeuralRenderer({", prefix: "  " },
  { text: '  model: "hyper-4.5-turbo",', prefix: "    " },
  { text: '  resolution: "1080x1920",', prefix: "    " },
  { text: '  fps: 30,', prefix: "    " },
  { text: "});", prefix: "  " },
  { text: "", prefix: "  " },
  { text: "await pipeline.render({", prefix: "  " },
  { text: '  prompt: "cyberpunk dashboard UI",', prefix: "    " },
  { text: '  output: "./output/video.mp4",', prefix: "    " },
  { text: "});", prefix: "  " },
  { text: "", prefix: "  " },
  { text: "// ✅ Render complete in 4.2s", prefix: "  " },
];

export const NeonTerminalDemo: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={90}>
        <NeonTerminal lines={codeLines} activeLine={0} primaryColor="#4ade80" />
      </Sequence>
      <Sequence from={90} durationInFrames={60}>
        <NeonTerminal lines={codeLines} activeLine={4} primaryColor="#64d2ff" />
      </Sequence>
      <Sequence from={150} durationInFrames={60}>
        <NeonTerminal
          lines={codeLines}
          activeLine={10}
          primaryColor="#fb923c"
        />
      </Sequence>
      <Sequence from={210} durationInFrames={90}>
        <NeonTerminal
          lines={codeLines}
          activeLine={15}
          primaryColor="#4ade80"
        />
      </Sequence>
    </AbsoluteFill>
  );
};
