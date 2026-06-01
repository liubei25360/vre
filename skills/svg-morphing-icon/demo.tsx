import { AbsoluteFill, Sequence } from "remotion";
import { SvgMorphingIcon } from "./SvgMorphingIcon";

export const SvgMorphingIconDemo: React.FC = () => (
  <AbsoluteFill style={{ background: "#020617", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <Sequence from={0} durationInFrames={80}>
      <SvgMorphingIcon from="bug" to="shield" primaryColor="#38bdf8" size={300} />
    </Sequence>
    <Sequence from={80} durationInFrames={80}>
      <SvgMorphingIcon from="gear" to="star" primaryColor="#4ade80" size={300} />
    </Sequence>
  </AbsoluteFill>
);
