import { Composition } from "remotion";
import { NeonTypewriterDemo } from "../skills/neon-typewriter/demo";

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
    </>
  );
};
