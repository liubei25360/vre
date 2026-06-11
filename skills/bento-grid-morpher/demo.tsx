import { AbsoluteFill, Sequence } from "remotion";
import { BentoGridMorpher } from "./BentoGridMorpher";

const blocks = [
  {id:"a",area:"a",title:"Render",content:"GPU-accelerated video pipeline",bg:"rgba(56,189,248,0.08)",accent:"#38bdf8"},
  {id:"b",area:"b",title:"AI",content:"Prompt-to-video intelligence",bg:"rgba(74,222,128,0.08)",accent:"#4ade80"},
  {id:"c",area:"c",title:"Editor",content:"Visual timeline composer",bg:"rgba(251,146,60,0.08)",accent:"#fb923c"},
  {id:"d",area:"d",title:"Export",content:"Multi-format output engine",bg:"rgba(192,132,252,0.08)",accent:"#c084fc"},
];

export const BentoGridMorpherDemo: React.FC = () => (
  <AbsoluteFill style={{ background: "#020617", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <BentoGridMorpher blocks={blocks} focusBlock={0} />
  </AbsoluteFill>
);
