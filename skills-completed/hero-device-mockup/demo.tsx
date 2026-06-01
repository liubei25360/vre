import { AbsoluteFill, useCurrentFrame } from "remotion";
import { HeroDeviceMockup } from "./HeroDeviceMockup";

export const HeroDeviceMockupDemo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 50% 40%, #1e293b, #020617)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <HeroDeviceMockup deviceType="phone">
        <img src="https://placehold.co/500x900/0d1117/c9d1d9?text=App+Demo" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
      </HeroDeviceMockup>
    </AbsoluteFill>
  );
};
