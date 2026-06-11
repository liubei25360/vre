import { AbsoluteFill } from "remotion";
import { DynamicMapTracer } from "./DynamicMapTracer";

const path = Array.from({length:15},(_,i)=>({
  x1: 100+Math.cos(i*0.8)*150, y1:150+Math.sin(i*0.8)*120,
  x2: 100+Math.cos((i+1)*0.8)*150, y2:150+Math.sin((i+1)*0.8)*120,
}));

export const DynamicMapTracerDemo: React.FC = () => (
  <AbsoluteFill style={{ background:"#020617", display:"flex",alignItems:"center",justifyContent:"center" }}>
    <div style={{ width:"85%" }}><DynamicMapTracer path={path} durationPerSegment={15} primaryColor="#38bdf8" /></div>
  </AbsoluteFill>
);
