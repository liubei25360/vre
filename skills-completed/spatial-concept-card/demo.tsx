import { AbsoluteFill, Sequence } from "remotion";
import { SpatialConceptCard } from "./SpatialConceptCard";

const cards = [
  { title: "Prompt", body: "自然语言描述你想要的视频效果与节奏，AI 引擎解析意图与风格偏好。", accent: "#818cf8" },
  { title: "Timeline", body: "智能编排生成 30fps 时间线，自动匹配转场、特效与音频节奏点。", accent: "#4ade80" },
  { title: "Render", body: "Remotion 引擎 GPU 加速渲染，1080x1920 竖屏输出，秒级完成。", accent: "#fb923c" },
  { title: "Publish", body: "一键推送至全平台，支持格式适配、缩略图生成与 SEO 元数据。", accent: "#38bdf8" },
];

export const SpatialConceptCardDemo: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#020617" }}>
      <Sequence from={0} durationInFrames={90}>
        <SpatialConceptCard cards={cards} focusCard={0} spacing={80} />
      </Sequence>
      <Sequence from={90} durationInFrames={90}>
        <SpatialConceptCard cards={cards} focusCard={1} spacing={80} />
      </Sequence>
      <Sequence from={180} durationInFrames={90}>
        <SpatialConceptCard cards={cards} focusCard={2} spacing={80} />
      </Sequence>
      <Sequence from={270} durationInFrames={90}>
        <SpatialConceptCard cards={cards} focusCard={3} spacing={80} />
      </Sequence>
    </AbsoluteFill>
  );
};
