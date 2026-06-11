import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { OverlayContrastField } from "../effect-system";

const FPS = 30;
const SAFE_X = 84;
const SAFE_Y = 154;
const SAFE_W = 912;
const SAFE_H = 1612;
const CENTER_X = SAFE_X + SAFE_W / 2;
const CENTER_Y = SAFE_Y + SAFE_H / 2;

// 8 words in constellation layout
const WORDS = [
  { label: "高级感", cx: -200, cy: -280, delay: 0 },
  { label: "配色", cx: 120, cy: -220, delay: 1 },
  { label: "构图", cx: -100, cy: -80, delay: 2 },
  { label: "风格", cx: 180, cy: -30, delay: 3 },
  { label: "留白", cx: -180, cy: 100, delay: 4 },
  { label: "极简", cx: 60, cy: 140, delay: 5 },
  { label: "对称", cx: -60, cy: 250, delay: 6 },
  { label: "品牌调性", cx: 140, cy: 200, delay: 7 },
];

const START_FRAME = 15; // 0.5s still
const WORDS_PER_SEC = 0.2; // 0.2s per word = 6 frames
const LASER_DURATION = WORDS.length * 6 + 8; // total laser sweep frames
const PAUSE_AFTER = 6; // 0.2s pause
const TITLE_START = START_FRAME + LASER_DURATION + PAUSE_AFTER;

export const EFFECT_01_DURATION_FRAMES = 150; // ~5s

// Capsule word component
const CapsuleWord: React.FC<{
  word: string;
  cx: number;
  cy: number;
  cutProgress: number;
  overallProgress: number;
}> = ({ word, cx, cy, cutProgress, overallProgress }) => {
  const isCut = cutProgress > 0;

  // Calculate explosion split
  const topPartY = interpolate(
    cutProgress,
    [0, 0.3, 1],
    [0, 0, -40],
  );
  const bottomPartY = interpolate(
    cutProgress,
    [0, 0.3, 1],
    [0, 0, 40],
  );
  const fadeOut = interpolate(cutProgress, [0, 0.3, 1], [1, 0.8, 0]);
  const borderFlash = interpolate(
    cutProgress,
    [0, 0.05, 0.2, 1],
    [0, 1, 0.3, 0],
  );

  if (!isCut) {
    return (
      <div
        style={{
          position: "absolute",
          left: cx,
          top: cy,
          transform: "translate(-50%, -50%)",
          padding: "8px 18px",
          borderRadius: 20,
          border: "1px solid rgba(91,231,255,0.28)",
          background: "rgba(8,18,32,0.38)",
          backdropFilter: "blur(4px)",
          whiteSpace: "nowrap",
        }}
      >
        <span
          style={{
            color: "#B2C7D9",
            fontSize: 30,
            fontWeight: 500,
            letterSpacing: 4,
          }}
        >
          {word}
        </span>
      </div>
    );
  }

  // Cut state: use clip-path to show top/bottom halves
  return (
    <>
      {/* Border flash */}
      <div
        style={{
          position: "absolute",
          left: cx,
          top: cy,
          transform: "translate(-50%, -50%)",
          padding: "8px 18px",
          borderRadius: 20,
          border: `1px solid rgba(91,231,255,${borderFlash})`,
          boxShadow: `0 0 12px rgba(91,231,255,${borderFlash * 0.5})`,
          background: "rgba(91,231,255,0.06)",
          backdropFilter: "blur(4px)",
          whiteSpace: "nowrap",
          opacity: fadeOut,
        }}
      >
        <span
          style={{
            color: "#B2C7D9",
            fontSize: 30,
            fontWeight: 500,
            letterSpacing: 4,
            opacity: fadeOut,
          }}
        >
          {word}
        </span>
      </div>
      {/* Top half floating up */}
      <div
        style={{
          position: "absolute",
          left: cx,
          top: cy + topPartY,
          transform: "translate(-50%, -50%)",
          padding: "8px 18px",
          borderRadius: 20,
          whiteSpace: "nowrap",
          clipPath: "inset(0 0 50% 0)",
          opacity: fadeOut,
        }}
      >
        <span
          style={{
            color: "#B2C7D9",
            fontSize: 30,
            fontWeight: 500,
            letterSpacing: 4,
          }}
        >
          {word}
        </span>
      </div>
      {/* Bottom half floating down */}
      <div
        style={{
          position: "absolute",
          left: cx,
          top: cy + bottomPartY,
          transform: "translate(-50%, -50%)",
          padding: "8px 18px",
          borderRadius: 20,
          whiteSpace: "nowrap",
          clipPath: "inset(50% 0 0 0)",
          opacity: fadeOut,
        }}
      >
        <span
          style={{
            color: "#B2C7D9",
            fontSize: 30,
            fontWeight: 500,
            letterSpacing: 4,
          }}
        >
          {word}
        </span>
      </div>
    </>
  );
};

// Red laser line
const LaserLine: React.FC<{ progress: number }> = ({ progress }) => {
  const laserX = interpolate(progress, [0, 1], [SAFE_X + SAFE_W + 50, SAFE_X - 50]);
  const laserOpacity = interpolate(
    progress,
    [0, 0.05, 0.95, 1],
    [0, 1, 1, 0],
  );

  return (
    <div
      style={{
        position: "absolute",
        left: laserX,
        top: SAFE_Y - 50,
        width: 2,
        height: SAFE_H + 100,
        opacity: laserOpacity,
      }}
    >
      {/* Core line */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(91,231,255,0) 0%, rgba(91,231,255,0.9) 15%, #5BE7FF 50%, rgba(91,231,255,0.9) 85%, rgba(91,231,255,0) 100%)",
        }}
      />
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          left: -4,
          right: -4,
          top: 0,
          bottom: 0,
          background:
            "linear-gradient(180deg, transparent 0%, rgba(91,231,255,0.3) 15%, rgba(91,231,255,0.5) 50%, rgba(91,231,255,0.3) 85%, transparent 100%)",
          filter: "blur(8px)",
        }}
      />
    </div>
  );
};

export const Effect01DeleteNoise: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Laser sweep timing
  const laserProgress = interpolate(
    frame,
    [START_FRAME, START_FRAME + LASER_DURATION],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Title animation
  const titleFrame = Math.max(0, frame - TITLE_START);
  const titleIn = spring({
    frame: titleFrame,
    fps,
    config: { damping: 12, mass: 0.8, stiffness: 100 },
    durationInFrames: 30,
  });
  const titleScale = interpolate(titleIn, [0, 0.5, 1], [0.4, 1.02, 1]);
  const titleY = interpolate(titleIn, [0, 1], [-80, 0]);
  const frameWidth = interpolate(titleIn, [0, 0.6, 1], [0, 100, 100]);

  // Breathing glow for final state
  const breathCycle = Math.max(0, frame - (TITLE_START + 30));
  const breath = Math.sin((breathCycle / fps) * Math.PI * 0.5) * 0.2 + 0.6;

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
      {/* Ambient background glow */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X - 300,
          top: CENTER_Y - 400,
          width: 600,
          height: 800,
          background:
            "radial-gradient(ellipse, rgba(91,231,255,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Words with constellation layout */}
      {WORDS.map((word, index) => {
        const wordFrame = START_FRAME + index * 6;
        const cutStart = wordFrame;
        const cutEnd = cutStart + 10;
        const cutProgress = interpolate(
          frame,
          [cutStart, cutEnd],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        return (
          <CapsuleWord
            key={word.label}
            word={word.label}
            cx={CENTER_X + word.cx}
            cy={CENTER_Y + word.cy}
            cutProgress={cutProgress}
            overallProgress={laserProgress}
          />
        );
      })}

      {/* Laser line */}
      <LaserLine progress={laserProgress} />

      {/* Title: "删垃圾" */}
      <div
        style={{
          position: "absolute",
          left: SAFE_X,
          top: SAFE_Y - 80,
          width: SAFE_W,
          height: SAFE_H + 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            transform: `translateY(${titleY}px) scale(${titleScale})`,
            opacity: Math.min(1, titleIn * 1.2),
            position: "relative",
          }}
        >
          {/* Red glow behind text */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 500,
              height: 200,
              background:
                "radial-gradient(ellipse, rgba(91,231,255,0.25) 0%, rgba(91,231,255,0.08) 50%, transparent 70%)",
              filter: "blur(20px)",
            }}
          />
          {/* Stamp frame */}
          <div
            style={{
              position: "absolute",
              left: `calc(50% - ${frameWidth / 2}%)`,
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: `${frameWidth}%`,
              height: 120,
              border: "2px solid rgba(91,231,255,0.8)",
              borderRadius: 4,
              boxShadow: `0 0 16px rgba(91,231,255,${breath * 0.4})`,
              opacity: interpolate(titleIn, [0, 0.5, 1], [0, 0, 1]),
            }}
          />
          {/* Text */}
          <div
            style={{
              fontSize: 120,
              fontWeight: 900,
              letterSpacing: 16,
              color: "#5BE7FF",
              textShadow: `0 0 20px rgba(91,231,255,${breath}), 0 0 60px rgba(91,231,255,${breath * 0.5})`,
              position: "relative",
              zIndex: 1,
            }}
          >
            删垃圾
          </div>
        </div>
      </div>
    </div>
  );
};
