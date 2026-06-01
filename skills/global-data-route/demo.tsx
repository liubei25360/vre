import { AbsoluteFill } from "remotion";
import { GlobalDataRoute } from "./GlobalDataRoute";

const nodes = [
  {x:200,y:40,label:"SF"}, {x:320,y:100,label:"NY"}, {x:80,y:280,label:"SG"},
  {x:200,y:360,label:"JP"}, {x:340,y:280,label:"LD"}, {x:80,y:120,label:"DE"},
];
const routes = [
  {from:0,to:1,color:"#38bdf8"}, {from:1,to:4,color:"#4ade80"},
  {from:0,to:5,color:"#fb923c"}, {from:5,to:2,color:"#c084fc"},
  {from:2,to:3,color:"#38bdf8"}, {from:4,to:3,color:"#fbbf24"},
];

export const GlobalDataRouteDemo: React.FC = () => (
  <AbsoluteFill style={{ background: "#020617", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ width: "80%" }}>
      <GlobalDataRoute nodes={nodes} routes={routes} pulseDuration={100} primaryColor="#38bdf8" />
    </div>
  </AbsoluteFill>
);
