import { AbsoluteFill, Sequence } from "remotion";
import { KineticChapterTitle } from "./KineticChapterTitle";

export const KineticChapterTitleDemo: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={90}>
        <KineticChapterTitle
          title="零成本"
          subtitle="从截图到视频 · 一键生成"
          accentColor="#ff6b6b"
          fontSize="11vw"
          shakeIntensity={1.3}
        />
      </Sequence>
      <Sequence from={90} durationInFrames={90}>
        <KineticChapterTitle
          title="降维打击"
          subtitle="Remotion + AI · 次世代视频工厂"
          accentColor="#64d2ff"
          fontSize="9vw"
          backgroundColor="#0d1117"
        />
      </Sequence>
      <Sequence from={180} durationInFrames={90}>
        <KineticChapterTitle
          title="即刻开始"
          subtitle="第一章 · 基础架构"
          accentColor="#4ade80"
          fontSize="10vw"
          backgroundColor="#0a0f0a"
        />
      </Sequence>
    </AbsoluteFill>
  );
};
