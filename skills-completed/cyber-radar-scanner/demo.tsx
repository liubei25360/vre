import React from "react";
import { useCurrentFrame } from "remotion";
import { CyberRadarScanner } from "./CyberRadarScanner";
import { NeonTerminal } from "../neon-terminal/NeonTerminal";

const codeLines = [
  { text: "npx vibe-code render --style holo" },
  { text: "" },
  { text: "Building composition tree...", prefix: "  " },
  { text: "Loading shader pipeline...", prefix: "  " },
  { text: "Compiling timeline...", prefix: "  " },
  { text: "Rendering frame 47/300...", prefix: "  " },
  { text: "Encoding h264 output...", prefix: "  " },
  { text: "" },
  { text: "// GPU accelerated · 8 workers", prefix: "  " },
];

export const CyberRadarScannerDemo: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", background: "#0d1117" }}>
      <CyberRadarScanner scanDuration={80} scanColor="#38bdf8" glowSpread={80}>
        <NeonTerminal
          lines={codeLines}
          activeLine={3}
          primaryColor="#38bdf8"
          fontSize="2vw"
        />
      </CyberRadarScanner>
    </div>
  );
};
