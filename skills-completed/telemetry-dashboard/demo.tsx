import { AbsoluteFill } from "remotion";
import { TelemetryDashboard } from "./TelemetryDashboard";

const rows = [
  { label:"GPU Core", value:94, max:100, unit:"%", color:"#4ade80" },
  { label:"VRAM", value:52, max:64, unit:"GB", color:"#38bdf8" },
  { label:"FPS", value:29.7, max:30, unit:"", color:"#fbbf24" },
  { label:"Latency", value:12, max:50, unit:"ms", color:"#fb923c" },
  { label:"Memory", value:38, max:64, unit:"GB", color:"#c084fc" },
];

export const TelemetryDashboardDemo: React.FC = () => (
  <AbsoluteFill style={{ background:"#020617", display:"flex", alignItems:"center", justifyContent:"center" }}>
    <div style={{ width:"85%", background:"rgba(10,10,20,0.6)", borderRadius:20, border:"1px solid rgba(255,255,255,0.06)", padding:"2vw" }}>
      <TelemetryDashboard rows={rows} />
    </div>
  </AbsoluteFill>
);
