import { Composition } from "remotion";
import { NeonTypewriterDemo } from "../skills/neon-typewriter/demo";
import { SpatialGlassContainerDemo } from "../skills/spatial-glass-container/demo";

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="NeonTypewriterDemo"
        component={NeonTypewriterDemo}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="SpatialGlassContainerDemo"
        component={SpatialGlassContainerDemo}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
