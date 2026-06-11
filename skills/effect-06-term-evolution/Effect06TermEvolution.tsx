import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { OverlayContrastField } from "../effect-system";

const FPS = 30;
const SAFE_X = 84;
const SAFE_Y = 154;
const SAFE_W = 912;
const SAFE_H = 1612;
const CENTER_X = SAFE_X + SAFE_W / 2;
const START_Y = SAFE_Y + 400;

const LEVEL_GAP = 160;

const LEVEL1_START = 6;
const LEVEL1_DURATION = 18;
const LEVEL2_START = LEVEL1_START + LEVEL1_DURATION + 12;
const LEVEL3_START = LEVEL2_START + 22;

export const EFFECT_06_DURATION_FRAMES = 130;

const RedFoldLine: React.FC<{
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  progress: number;
  thickness?: number;
}> = ({ startX, startY, endX, endY, progress, thickness = 2 }) => {
  // Create an L-shaped fold: horizontal then vertical
  const midX = startX + 60;
  const hLen = Math.max(0, midX - startX);
  const vLen = Math.max(0, endY - startY);

  const hDashOffset = 200 * (1 - Math.min(1, progress * 2));
  const vDashOffset = 200 * (1 - Math.min(1, Math.max(0, (progress - 0.4) * 2)));

  return (
    <svg
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: 1080,
        height: 1920,
        overflow: "visible",
        pointerEvents: "none",
      }}
    >
      {/* Horizontal segment */}
      <line
        x1={startX}
        y1={startY}
        x2={midX}
        y2={startY}
        stroke="#5BE7FF"
        strokeWidth={thickness}
        strokeDasharray="200"
        strokeDashoffset={hDashOffset}
        opacity={Math.min(1, progress * 3)}
      />
      {/* Vertical segment */}
      <line
        x1={midX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke="#5BE7FF"
        strokeWidth={thickness}
        strokeDasharray="200"
        strokeDashoffset={vDashOffset}
        opacity={Math.min(1, Math.max(0, (progress - 0.3) * 3))}
      />
      {/* Glow effect */}
      <line
        x1={midX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke="rgba(91,231,255,0.3)"
        strokeWidth={thickness * 4}
        strokeDasharray="200"
        strokeDashoffset={vDashOffset}
        opacity={Math.min(1, Math.max(0, (progress - 0.3) * 3)) * 0.5}
        style={{ filter: "blur(6px)" }}
      />
    </svg>
  );
};

export const Effect06TermEvolution: React.FC = () => {
  const frame = useCurrentFrame();

  // Level 1: RLHF
  const l1Progress = interpolate(
    frame,
    [LEVEL1_START, LEVEL1_START + LEVEL1_DURATION],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const l1Fade = interpolate(
    frame,
    [LEVEL3_START - 4, LEVEL3_START + 8],
    [1, 0.2],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Level 1 fold line
  const l1LineProgress = interpolate(
    frame,
    [LEVEL1_START + 12, LEVEL2_START],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Level 2: Sycophancy
  const l2Spring = spring({
    frame: Math.max(0, frame - LEVEL2_START),
    fps: FPS,
    config: { damping: 13, mass: 0.6, stiffness: 100 },
    durationInFrames: 20,
  });
  const l2Fade = interpolate(
    frame,
    [LEVEL3_START - 4, LEVEL3_START + 8],
    [1, 0.2],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Level 2 fold line
  const l2LineProgress = interpolate(
    frame,
    [LEVEL2_START + 14, LEVEL3_START],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Level 3: 谄媚迎合
  const l3Spring = spring({
    frame: Math.max(0, frame - LEVEL3_START),
    fps: FPS,
    config: { damping: 10, mass: 0.8, stiffness: 85 },
    durationInFrames: 26,
  });

  const breathCycle = Math.max(0, frame - (LEVEL3_START + 26));
  const breath = Math.sin((breathCycle / FPS) * Math.PI * 0.5) * 0.15 + 0.85;

  const y1 = START_Y;
  const y2 = y1 + LEVEL_GAP;
  const y3 = y2 + LEVEL_GAP;
  const lineStartX = CENTER_X + 120;

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
          left: CENTER_X - 200,
          top: START_Y - 100,
          width: 400,
          height: LEVEL_GAP * 2 + 100,
          background: "radial-gradient(ellipse, rgba(255,255,255,0.02) 0%, transparent 70%)",
        }}
      />

      {/* Level 1: RLHF */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X,
          top: y1,
          transform: "translate(-50%, -50%)",
          opacity: Math.min(1, l1Progress * 5) * l1Fade,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 700, color: "#EAF6FF", letterSpacing: 6 }}>
          RLHF
        </div>
        <div style={{ marginTop: 4, fontSize: 14, color: "#8EA7BB", letterSpacing: 2 }}>
          Reinforcement Learning from Human Feedback
        </div>
      </div>

      {/* Red fold line L1->L2 */}
      <RedFoldLine
        startX={lineStartX}
        startY={y1}
        endX={lineStartX}
        endY={y2 - 10}
        progress={l1LineProgress}
      />

      {/* Level 2: Sycophancy */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X,
          top: y2,
          transform: `translate(-50%, -50%) scale(${l2Spring})`,
          opacity: l2Fade,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "#5BE7FF",
            letterSpacing: 3,
            textShadow: "0 0 14px rgba(91,231,255,0.3)",
          }}
        >
          Sycophancy
        </div>
        <div style={{ marginTop: 4, fontSize: 14, color: "#8EA7BB", letterSpacing: 2 }}>
          学术名词：谄媚行为
        </div>
      </div>

      {/* Red fold line L2->L3 (thicker) */}
      <RedFoldLine
        startX={lineStartX}
        startY={y2}
        endX={lineStartX}
        endY={y3 - 10}
        progress={l2LineProgress}
        thickness={3}
      />

      {/* Level 3: 谄媚迎合 */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X,
          top: y3,
          transform: `translate(-50%, -50%) scale(${l3Spring})`,
          textAlign: "center",
        }}
      >
        {/* Stamp frame */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%) rotate(-2deg)",
            padding: "12px 28px",
            border: `2px solid rgba(255,179,106,${breath})`,
            borderRadius: 6,
            boxShadow: `0 0 20px rgba(255,179,106,${breath * 0.4}), inset 0 0 8px rgba(255,179,106,${breath * 0.08})`,
            opacity: l3Spring,
          }}
        />
        <div
          style={{
            fontSize: 100,
            fontWeight: 900,
            color: "#FFB36A",
            letterSpacing: 12,
            textShadow: `0 0 24px rgba(255,179,106,${breath * 0.5}), 0 0 60px rgba(255,179,106,${breath * 0.2})`,
            position: "relative",
            zIndex: 1,
          }}
        >
          谄媚迎合
        </div>
      </div>
    </div>
  );
};
