import { AbsoluteFill } from "remotion";
import { NeonTypewriter } from "./NeonTypewriter";

export const NeonTypewriterDemo: React.FC = () => {
  return (
    <AbsoluteFill>
      <NeonTypewriter
        text="npx create-video@latest --blank"
        durationInFrames={150}
        primaryColor="#64d2ff"
        typingSpeed={4}
        fontSize="5.5vw"
        glowIntensity={1.2}
      />
    </AbsoluteFill>
  );
};
