import { AbsoluteFill } from "remotion";
import { VectorSpacePlotter } from "./VectorSpacePlotter";

const points = [
  { x: -0.8, y: 0.6, label: "A", value: 8 }, { x: -0.2, y: -0.3, label: "B", value: 14 },
  { x: 0.5, y: 0.7, label: "C", value: 5 }, { x: 0.3, y: -0.7, label: "D", value: 11 },
  { x: 0.9, y: -0.1, label: "E", value: 7 }, { x: -0.6, y: -0.5, label: "F", value: 9 },
  { x: 0.1, y: 0.1, label: "G", value: 16 }, { x: -0.7, y: 0.2, label: "H", value: 6 },
];

export const VectorSpacePlotterDemo: React.FC = () => (
  <AbsoluteFill style={{ background: "#020617", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ width: "80%" }}><VectorSpacePlotter points={points} /></div>
  </AbsoluteFill>
);
