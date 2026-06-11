import { AbsoluteFill } from "remotion";
import { NeuralProcessingBox } from "./NeuralProcessingBox";

export const NeuralProcessingBoxDemo: React.FC = () => (
  <AbsoluteFill style={{ background:"#020617", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"3vw" }}>
    <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"3vw", color:"#818cf8", textShadow:"0 0 20px #818cf8" }}>
      AI Processing...
    </div>
    <NeuralProcessingBox nodeCount={50} primaryColor="#818cf8" />
  </AbsoluteFill>
);
