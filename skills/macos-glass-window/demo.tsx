import { AbsoluteFill, Img, staticFile } from "remotion";
import { MacOsGlassWindow } from "./MacOsGlassWindow";

export const MacOsGlassWindowDemo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(ellipse at 50% 40%, #1e293b, #020617)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <MacOsGlassWindow
        title="hyperframes — packages/core/src/runtime/adapters/three.ts"
        borderGlowColor="rgba(100, 210, 255, 0.35)"
      >
        <Img
          src={staticFile("screenshot1.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </MacOsGlassWindow>
    </AbsoluteFill>
  );
};
