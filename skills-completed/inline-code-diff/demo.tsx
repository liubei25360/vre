import { AbsoluteFill, Sequence } from "remotion";
import { InlineCodeDiff } from "./InlineCodeDiff";

const oldCode = ["function load(config) {", "  return fetch('/api/data');", "}", "", "function render(data) {", "  return <div>{data.title}</div>;", "}"];
const newCode = ["async function load(config) {", "  return fetch('/api/data');", "}", "", "function render(data) {", "  return <Card>{data.title}</Card>;", "}"];

export const InlineCodeDiffDemo: React.FC = () => (
  <AbsoluteFill style={{ background: "#0d1117", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <Sequence from={0} durationInFrames={80}>
      <InlineCodeDiff oldLines={oldCode} newLines={newCode} />
    </Sequence>
  </AbsoluteFill>
);
