import { AbsoluteFill, Sequence } from "remotion";
import { InsightTextDrop } from "./InsightTextDrop";

export const InsightTextDropDemo: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={90}>
        <InsightTextDrop
          text="真正的 AI 不是替代创作者"
          subtext="而是让创作门槛归零"
          sweepColor="#fbbf24"
        />
      </Sequence>
      <Sequence from={90} durationInFrames={90}>
        <InsightTextDrop
          text="从截图到视频"
          subtext="只需要一句话的时间"
          sweepColor="#64d2ff"
          backgroundColor="#0d1117"
        />
      </Sequence>
      <Sequence from={180} durationInFrames={90}>
        <InsightTextDrop
          text="你的每一个想法"
          subtext="都值得被看见"
          sweepColor="#4ade80"
          backgroundColor="#0a0f0a"
        />
      </Sequence>
    </AbsoluteFill>
  );
};
