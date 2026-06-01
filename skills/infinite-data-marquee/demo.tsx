import { AbsoluteFill } from "remotion";
import { InfiniteDataMarquee } from "./InfiniteDataMarquee";

const items = [
  "v2.7.1 · Production Deploy","4.2M Requests/min","99.97% Uptime SLA",
  "GPU Cluster: 8x A100","Latency P99: 12ms","Active Users: 48.2K",
  "CDN Edge: 14 nodes","Throughput: 1.8 TB/h","DB Replicas: 6"
];

export const InfiniteDataMarqueeDemo: React.FC = () => (
  <AbsoluteFill style={{ background: "#020617" }}>
    <InfiniteDataMarquee items={items} speed={1.2} primaryColor="#38bdf8" />
  </AbsoluteFill>
);
