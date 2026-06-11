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

const NOISE_WORDS = [
  "深度学习", "强化学习", "Transformer", "注意力机制",
  "Fine-tuning", "Prompt Engineering", "GAN", "Diffusion",
  "BERT", "GPT", "LoRA", "RLHF",
];
const NOISE_POSITIONS = [
  { x: CENTER_X - 250, y: CENTER_Y - 180, driftX: -0.14, driftY: -0.52 },
  { x: CENTER_X - 120, y: CENTER_Y - 210, driftX: 0.11, driftY: -0.44 },
  { x: CENTER_X + 140, y: CENTER_Y - 170, driftX: 0.18, driftY: -0.48 },
  { x: CENTER_X + 210, y: CENTER_Y - 40, driftX: 0.12, driftY: -0.4 },
  { x: CENTER_X - 220, y: CENTER_Y - 20, driftX: -0.16, driftY: -0.36 },
  { x: CENTER_X - 70, y: CENTER_Y + 40, driftX: 0.08, driftY: -0.34 },
  { x: CENTER_X + 80, y: CENTER_Y + 20, driftX: 0.16, driftY: -0.3 },
  { x: CENTER_X + 230, y: CENTER_Y + 100, driftX: 0.1, driftY: -0.28 },
  { x: CENTER_X - 210, y: CENTER_Y + 110, driftX: -0.12, driftY: -0.26 },
  { x: CENTER_X - 20, y: CENTER_Y + 150, driftX: 0.06, driftY: -0.24 },
  { x: CENTER_X + 150, y: CENTER_Y + 180, driftX: 0.14, driftY: -0.22 },
  { x: CENTER_X - 140, y: CENTER_Y + 210, driftX: -0.1, driftY: -0.2 },
];

const SEPARATE_START = 15;
const SEPARATE_END = 75;
const FADE_START = 75;

export const EFFECT_09_DURATION_FRAMES = 140;

export const Effect09GravityFilter: React.FC = () => {
  const frame = useCurrentFrame();

  // Gravity separation
  const separateProgress = interpolate(
    frame,
    [SEPARATE_START, SEPARATE_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Gold text sinks
  const goldY = interpolate(separateProgress, [0, 1], [0, 60]);
  const goldGlow = interpolate(separateProgress, [0, 0.5, 1], [0, 0, 12]);
  const goldGlowOpacity = interpolate(separateProgress, [0.3, 1], [0, 0.8]);

  // Noise rises and fades
  const noiseRiseY = interpolate(separateProgress, [0, 1], [0, -120]);
  const noiseOpacity = interpolate(
    frame,
    [FADE_START, FADE_START + 30],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const noiseScale = interpolate(
    frame,
    [FADE_START, FADE_START + 30],
    [1, 0.3],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Gold line
  const lineProgress = interpolate(
    frame,
    [SEPARATE_END - 10, SEPARATE_END + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const lineWidth = interpolate(lineProgress, [0, 0.5, 1], [0, 240, 240]);

  // Breathing
  const breathCycle = Math.max(0, frame - (SEPARATE_END + 15));
  const breath = Math.sin((breathCycle / FPS) * Math.PI * 0.4) * 0.15 + 0.85;

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
      {/* Noise cloud words */}
      {NOISE_WORDS.map((word, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: NOISE_POSITIONS[i].x + NOISE_POSITIONS[i].driftX * frame * 10,
            top: NOISE_POSITIONS[i].y + NOISE_POSITIONS[i].driftY * frame * 10 + noiseRiseY,
            transform: `scale(${noiseScale})`,
            color: `rgba(85,85,85,${noiseOpacity * 0.8})`,
            fontSize: 14,
            letterSpacing: 2,
            opacity: noiseOpacity,
          }}
        >
          {word}
        </div>
      ))}

      {/* Gold text - sinks */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X,
          top: CENTER_Y + goldY,
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        {/* Gold glow */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            height: 120,
            background: `radial-gradient(ellipse, rgba(255,179,106,${goldGlowOpacity * 0.3}) 0%, transparent 70%)`,
            filter: "blur(20px)",
          }}
        />
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "#FFB36A",
            letterSpacing: 4,
            textShadow: `0 0 ${goldGlow}px rgba(255,179,106,${goldGlowOpacity})`,
          }}
        >
          能记住的 = 黄金
        </div>
      </div>

      {/* Gold underline */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X - lineWidth / 2,
          top: CENTER_Y + goldY + 50,
          width: lineWidth,
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,179,106,0.8) 30%, #FFB36A 50%, rgba(255,179,106,0.8) 70%, transparent 100%)",
          opacity: lineProgress * breath,
        }}
      />
    </div>
  );
};
