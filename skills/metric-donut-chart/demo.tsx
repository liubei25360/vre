import { AbsoluteFill, Sequence } from "remotion";
import { MetricDonutChart } from "./MetricDonutChart";

export const MetricDonutChartDemo: React.FC = () => (
  <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 40%,#1a1a2e,#020617)", display:"flex", alignItems:"center", justifyContent:"center", gap:"4vw" }}>
    <MetricDonutChart value={87} max={100} label="完成率" primaryColor="#4ade80" />
  </AbsoluteFill>
);
