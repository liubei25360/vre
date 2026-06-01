import React from "react";
import { AbsoluteFill, Sequence, useCurrentFrame, Img, staticFile } from "remotion";
import { CyberProgressTracker } from "./CyberProgressTracker";
import type { StepConfig } from "./CyberProgressTracker";

const DemoStep: React.FC<{
  title: string;
  subtitle: string;
  bg: string;
  color: string;
}> = ({ title, subtitle, bg, color }) => (
  <AbsoluteFill
    style={{
      background: bg,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "2vw",
    }}
  >
    <h1
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "7vw",
        fontWeight: 900,
        color,
        margin: 0,
      }}
    >
      {title}
    </h1>
    <p
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "2.5vw",
        color: "rgba(255,255,255,0.5)",
        margin: 0,
      }}
    >
      {subtitle}
    </p>
  </AbsoluteFill>
);

const demoSteps: StepConfig[] = [
  { id: "analyze", label: "分析 Prompt", atFrame: 30 },
  { id: "timeline", label: "生成时间线", atFrame: 65 },
  { id: "render", label: "渲染输出", atFrame: 100 },
  { id: "publish", label: "发布上线", atFrame: 135 },
];

export const CyberProgressTrackerDemo: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={40}>
        <DemoStep
          title="分析"
          subtitle="AI 解析 Prompt 意图"
          bg="linear-gradient(135deg, #0f172a, #1e1b4b)"
          color="#818cf8"
        />
      </Sequence>
      <Sequence from={40} durationInFrames={40}>
        <DemoStep
          title="生成"
          subtitle="时间线 + 动画编排"
          bg="linear-gradient(135deg, #0f172a, #0b3d2e)"
          color="#4ade80"
        />
      </Sequence>
      <Sequence from={80} durationInFrames={40}>
        <DemoStep
          title="渲染"
          subtitle="Remotion GPU 渲染"
          bg="linear-gradient(135deg, #0f172a, #2d1b0e)"
          color="#fb923c"
        />
      </Sequence>
      <Sequence from={120} durationInFrames={40}>
        <DemoStep
          title="发布"
          subtitle="推送至全平台"
          bg="linear-gradient(135deg, #0f172a, #0b2847)"
          color="#38bdf8"
        />
      </Sequence>

      <CyberProgressTracker
        steps={demoSteps}
        durationInFrames={160}
        position="bottom"
        barColor="#64d2ff"
        nodeRadius={12}
        barHeight={6}
      />
    </AbsoluteFill>
  );
};
