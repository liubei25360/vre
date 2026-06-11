import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { OverlayContrastField } from "../effect-system";

const FPS = 30;
const SAFE_X = 84;
const SAFE_Y = 154;
const SAFE_W = 912;
const SAFE_H = 1612;
const CENTER_X = SAFE_X + SAFE_W / 2;
const CENTER_Y = SAFE_Y + SAFE_H / 2;

const NODE_DIAMETER = 120;
const NODE_GAP = 180;

const TOP_ACTIVATE = 18; // 0.6s
const CURRENT_FLOW = TOP_ACTIVATE + 15; // +0.5s
const WARNING_START = CURRENT_FLOW + 12; // +0.4s

export const EFFECT_05_DURATION_FRAMES = 130;

const CircuitNode: React.FC<{
  label: string;
  subtitle: string;
  badLabel: string;
  cx: number;
  cy: number;
  isActive: boolean;
  isWarning: boolean;
  frame: number;
}> = ({ label, subtitle, badLabel, cx, cy, isActive, isWarning, frame }) => {
  const borderColor = isWarning
    ? "#5BE7FF"
    : isActive
    ? "#FFB36A"
    : "rgba(91,231,255,0.28)";
  const glowColor = isWarning
    ? "rgba(91,231,255,0.3)"
    : isActive
    ? "rgba(255,179,106,0.25)"
    : "transparent";

  const pulseScale = isWarning
    ? 1 + Math.sin((frame / FPS) * 15) * 0.03
    : isActive
    ? 1 + Math.sin((frame / FPS) * 4) * 0.02
    : 1;

  return (
    <div
      style={{
        position: "absolute",
        left: cx,
        top: cy,
        transform: `translate(-50%, -50%) scale(${pulseScale})`,
        textAlign: "center",
      }}
    >
      {/* Glow behind node */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: NODE_DIAMETER + 40,
          height: NODE_DIAMETER + 40,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          filter: "blur(12px)",
        }}
      />
      {/* Node circle */}
      <div
        style={{
          width: NODE_DIAMETER,
          height: NODE_DIAMETER,
          borderRadius: "50%",
          border: `1.5px solid ${borderColor}`,
          background: "rgba(8,18,32,0.34)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <span
          style={{
            color: isActive ? "#EAF6FF" : "#B2C7D9",
            fontSize: label.length > 6 ? 22 : 28,
            fontWeight: 700,
            letterSpacing: 3,
          }}
        >
          {label}
        </span>
      </div>
      {/* Subtitle */}
      <div
        style={{
          marginTop: 8,
          fontSize: 16,
          color: "#8EA7BB",
          letterSpacing: 2,
          opacity: isActive ? 1 : 0,
        }}
      >
        {subtitle}
      </div>
      {/* Bad label to the right */}
      <div
        style={{
          position: "absolute",
          left: NODE_DIAMETER / 2 + 20,
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: 16,
          color: "#5BE7FF",
          whiteSpace: "nowrap",
          opacity: isActive ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      >
        {badLabel}
      </div>
    </div>
  );
};

export const Effect05CircuitNodes: React.FC = () => {
  const frame = useCurrentFrame();

  // Top node activation
  const topActive = frame >= TOP_ACTIVATE;
  const topSpring = spring({
    frame: Math.max(0, frame - TOP_ACTIVATE),
    fps: FPS,
    config: { damping: 14, mass: 0.5, stiffness: 100 },
    durationInFrames: 18,
  });

  // Current flow
  const flowProgress = interpolate(
    frame,
    [TOP_ACTIVATE + 8, CURRENT_FLOW + 6],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Bottom node activation
  const bottomActive = frame >= CURRENT_FLOW;

  // Warning state
  const warningActive = frame >= WARNING_START;

  // Warning banner
  const bannerIn = spring({
    frame: Math.max(0, frame - WARNING_START),
    fps: FPS,
    config: { damping: 16, mass: 0.6, stiffness: 90 },
    durationInFrames: 20,
  });

  const breathCycle = Math.max(0, frame - (WARNING_START + 20));
  const breath = Math.sin((breathCycle / FPS) * Math.PI * 0.5) * 0.15 + 0.85;

  const topY = CENTER_Y - NODE_GAP / 2;
  const bottomY = CENTER_Y + NODE_GAP / 2;

  return (
    <div
      style={{
        width: 1080,
        height: 1920,
        position: "relative",
        overflow: "hidden",
        fontFamily:
          "'SF Pro Display','PingFang SC','Noto Sans SC','Microsoft YaHei',sans-serif",
      }}
    >
      <OverlayContrastField />
      {/* Ambient */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X - 300,
          top: CENTER_Y - 300,
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 60%)",
        }}
      />

      {/* Connection line background */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X,
          top: topY + NODE_DIAMETER / 2,
          width: 1,
          height: bottomY - topY - NODE_DIAMETER,
          background: "rgba(91,231,255,0.16)",
        }}
      />

      {/* Current flow line */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X,
          top: topY + NODE_DIAMETER / 2,
          width: 1,
          height: (bottomY - topY - NODE_DIAMETER) * flowProgress,
          background: warningActive
            ? "#5BE7FF"
            : "linear-gradient(180deg, #FFB36A 0%, rgba(255,179,106,0.5) 100%)",
          boxShadow: warningActive
            ? "0 0 8px rgba(91,231,255,0.5)"
            : "0 0 8px rgba(255,179,106,0.4)",
        }}
      />

      {/* Top node */}
      <div style={{ opacity: topSpring }}>
        <CircuitNode
          label="RLHF"
          subtitle="人类反馈对齐"
          badLabel="AI 学会迎合"
          cx={CENTER_X}
          cy={topY}
          isActive={topActive}
          isWarning={warningActive}
          frame={frame}
        />
      </div>

      {/* Bottom node */}
      <CircuitNode
        label="最大似然估计"
        subtitle="Maximum Likelihood"
        badLabel="永远输出平均答案"
        cx={CENTER_X}
        cy={bottomY}
        isActive={bottomActive}
        isWarning={warningActive}
        frame={frame}
      />

      {/* Warning banner */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X,
          top: CENTER_Y,
          transform: `translate(-50%, -50%) scale(${bannerIn})`,
          opacity: bannerIn,
        }}
      >
        {/* Red frame */}
        <div
          style={{
            padding: "10px 28px",
            border: `2px solid rgba(91,231,255,${breath})`,
            borderRadius: 4,
            background: "rgba(91,231,255,0.06)",
            boxShadow: `0 0 16px rgba(91,231,255,${breath * 0.25})`,
          }}
        >
          <span
            style={{
              color: "#EAF6FF",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 4,
              whiteSpace: "nowrap",
            }}
          >
            天生垃圾制造机
          </span>
        </div>
      </div>
    </div>
  );
};
