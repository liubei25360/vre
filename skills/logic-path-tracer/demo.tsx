import { AbsoluteFill } from "remotion";
import { LogicPathTracer } from "./LogicPathTracer";

const nodes = [
  {id:"start",x:200,y:30,label:"Start"},{id:"check",x:200,y:120,label:"Check?"},
  {id:"a",x:100,y:220,label:"If Yes"},{id:"b",x:300,y:220,label:"Else"},
  {id:"end",x:200,y:340,label:"Done"},
];
const edges = [
  {from:"start",to:"check",label:""},{from:"check",to:"a",label:"",branch:"if" as const},
  {from:"check",to:"b",label:"",branch:"else" as const},{from:"a",to:"end",label:""},{from:"b",to:"end",label:""},
];

export const LogicPathTracerDemo: React.FC = () => (
  <AbsoluteFill style={{ background: "#020617", display:"flex",alignItems:"center",justifyContent:"center" }}>
    <LogicPathTracer nodes={nodes} edges={edges} durationInFrames={120} />
  </AbsoluteFill>
);
