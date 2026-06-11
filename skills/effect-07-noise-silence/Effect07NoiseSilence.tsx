import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { OverlayContrastField } from "../effect-system";

const FPS = 30;
const SAFE_X = 84;
const SAFE_Y = 154;
const SAFE_W = 912;
const SAFE_H = 1612;
const CENTER_X = SAFE_X + SAFE_W / 2;

const NOISE_TEXTS = [
  "自媒体副业", "知识付费", "跨境电商", "基金定投",
  "闲鱼倒卖", "短视频带货", "微商代理", "网约车",
  "外卖兼职", "线上家教", "文案代写", "PPT定制",
  "配音接单", "直播带货", "私域运营",
];

const COLLAPSE_START = 105;
const CRYSTAL_START = 120;

export const EFFECT_07_DURATION_FRAMES = 155;

export const Effect07NoiseSilence: React.FC = () => {
  const frame = useCurrentFrame();

  // Left field: noise scroll speed increases
  const scrollSpeed = interpolate(frame, [0, 60, 105], [0.5, 1.5, 3], {
    extrapolateRight: "clamp",
  });

  // Red tint overlay
  const redTint = interpolate(frame, [80, 105], [0, 0.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Collapse left field
  const collapseProgress = interpolate(
    frame,
    [COLLAPSE_START, COLLAPSE_START + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const leftScaleY = interpolate(collapseProgress, [0, 0.5, 1], [1, 0.1, 0.1]);
  const leftOpacity = interpolate(collapseProgress, [0, 0.6, 1], [1, 0.3, 0]);

  // Right field: ? -> ✓
  const crystalProgress = interpolate(
    frame,
    [CRYSTAL_START, CRYSTAL_START + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const checkSpring = spring({
    frame: Math.max(0, frame - CRYSTAL_START),
    fps: FPS,
    config: { damping: 10, mass: 0.5, stiffness: 100 },
    durationInFrames: 20,
  });

  // Breathing
  const breathCycle = Math.max(0, frame - (CRYSTAL_START + 20));
  const breath = Math.sin((breathCycle / FPS) * Math.PI * 0.4) * 0.15 + 0.85;
  const questionBreath = Math.sin((frame / FPS) * 1.2) * 0.015 + 1;

  const leftW = SAFE_W * 0.45;
  const rightW = SAFE_W * 0.45;
  const leftX = SAFE_X + 20;
  const rightX = SAFE_X + SAFE_W / 2 + 20;

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
      {/* Center divider */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X,
          top: SAFE_Y,
          width: 1,
          height: SAFE_H,
          background: "rgba(91,231,255,0.14)",
        }}
      />

      {/* Left field - Noise */}
      <div
        style={{
          position: "absolute",
          left: leftX,
          top: SAFE_Y + 40,
          width: leftW,
          height: SAFE_H - 80,
          transform: `scaleY(${leftScaleY})`,
          opacity: leftOpacity,
          overflow: "hidden",
          clipPath: `inset(0 0 ${interpolate(collapseProgress, [0, 1], [0, 100])}% 0)`,
        }}
      >
        {/* Label */}
        <div style={{ color: "#8EA7BB", fontSize: 18, letterSpacing: 3, marginBottom: 16 }}>
          AI 的回答
        </div>
        {/* Red tint overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `rgba(91,231,255,${redTint})`,
            pointerEvents: "none",
          }}
        />
        {/* Scrolling noise text */}
        <div style={{ position: "relative" }}>
          {NOISE_TEXTS.map((text, i) => (
            <div
              key={i}
              style={{
                color: "#777",
                fontSize: 16,
                lineHeight: 1.3,
                transform: `translateY(${-frame * scrollSpeed * 0.5 + i * 22}px)`,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* Right field - Silence */}
      <div
        style={{
          position: "absolute",
          left: rightX,
          top: SAFE_Y + 40,
          width: rightW,
          height: SAFE_H - 80,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Label */}
        <div style={{ color: "#FFB36A", fontSize: 18, letterSpacing: 3, marginBottom: 40 }}>
          实际可行
        </div>

        {/* ? or ✓ */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${frame < CRYSTAL_START ? questionBreath : checkSpring})`,
          }}
        >
          {frame < CRYSTAL_START ? (
            <span
              style={{
                fontSize: 80,
                fontWeight: 300,
                color: `rgba(255,255,255,${0.3 + Math.sin((frame / FPS) * 1.2) * 0.3})`,
                opacity: 0.4 + Math.sin((frame / FPS) * 2) * 0.2 + 0.2,
              }}
            >
              ?
            </span>
          ) : (
            <span
              style={{
                fontSize: 80,
                fontWeight: 700,
                color: "#FFB36A",
                textShadow: `0 0 16px rgba(255,179,106,${breath * 0.5})`,
              }}
            >
              ✓
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
