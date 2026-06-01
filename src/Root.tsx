import { Composition } from "remotion";
import { NeonTypewriterDemo } from "../skills/neon-typewriter/demo";
import { SpatialGlassContainerDemo } from "../skills/spatial-glass-container/demo";
import { SmartCameraRigDemo } from "../skills/smart-camera-rig/demo";
import { ZAxisTransitionDemo } from "../skills/zaxis-transition/demo";
import { KineticChapterTitleDemo } from "../skills/kinetic-chapter-title/demo";

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
      <Composition
        id="SmartCameraRigDemo"
        component={SmartCameraRigDemo}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ZAxisTransitionDemo"
        component={ZAxisTransitionDemo}
        durationInFrames={120}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="KineticChapterTitleDemo"
        component={KineticChapterTitleDemo}
        durationInFrames={270}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
