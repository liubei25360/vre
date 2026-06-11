import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { OverlayContrastField } from "../effect-system";

const FPS = 30;
const SAFE_X = 84;
const SAFE_Y = 154;
const SAFE_W = 912;
const SAFE_H = 1612;
const CENTER_X = SAFE_X + SAFE_W / 2;

const ITEMS = ["墨镜", "袜子", "文具", "T恤", "帽子", "贴纸"];
const COLS = 3;
const CARD_W = 180;
const CARD_H = 100;
const GAP_X = 40;
const GAP_Y = 40;
const GRID_W = COLS * CARD_W + (COLS - 1) * GAP_X;
const GRID_X = CENTER_X - GRID_W / 2;
const GRID_Y = SAFE_Y + 280;

const DIAGNOSE_END = 24; // 0.8s
const CUT_INTERVAL = 12; // 0.4s per card
const CUT_DURATION = 8; // 0.27s per cut animation
const FINAL_START = DIAGNOSE_END + ITEMS.length * CUT_INTERVAL + 8;

export const EFFECT_03_DURATION_FRAMES = 170; // ~5.7s

const GlassCard: React.FC<{
  label: string;
  col: number;
  row: number;
  index: number;
  frame: number;
}> = ({ label, col, row, index, frame }) => {
  const x = GRID_X + col * (CARD_W + GAP_X);
  const y = GRID_Y + row * (CARD_H + GAP_Y);

  const cutStart = DIAGNOSE_END + index * CUT_INTERVAL;
  const cutEnd = cutStart + CUT_DURATION;
  const cutProgress = interpolate(
    frame,
    [cutStart, cutEnd],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const isCut = cutProgress > 0;
  const isDone = frame > cutEnd;

  // Green dot pulse - breathing animation
  const dotOpacity = 0.5 + Math.sin((frame / FPS) * 10) * 0.35 + 0.15;

  // Card split animation
  const topPartY = interpolate(cutProgress, [0.2, 0.6, 1], [0, 0, -60]);
  const bottomPartY = interpolate(cutProgress, [0.2, 0.6, 1], [0, 0, 90]);
  const fadeOut = interpolate(cutProgress, [0.3, 0.7, 1], [1, 0.5, 0]);

  // Laser slice line
  const sliceOpacity = interpolate(cutProgress, [0, 0.1, 0.6, 1], [0, 1, 0.8, 0]);

  if (isDone) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: CARD_W,
        height: CARD_H,
      }}
    >
      {/* Card body - cut state */}
      {isCut ? (
        <>
          {/* Top half */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: topPartY,
              width: CARD_W,
              height: CARD_H,
              borderRadius: 8,
              border: "1px solid rgba(91,231,255,0.18)",
              background: "rgba(8,18,32,0.6)",
              backdropFilter: "blur(8px)",
              clipPath: "inset(0 0 50% 0)",
              opacity: fadeOut,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#EAF6FF", fontSize: 24, fontWeight: 500, letterSpacing: 3 }}>
              {label}
            </span>
          </div>
          {/* Bottom half */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: bottomPartY,
              width: CARD_W,
              height: CARD_H,
              borderRadius: 8,
              border: "1px solid rgba(91,231,255,0.18)",
              background: "rgba(8,18,32,0.6)",
              backdropFilter: "blur(8px)",
              clipPath: "inset(50% 0 0 0)",
              opacity: fadeOut,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#EAF6FF", fontSize: 24, fontWeight: 500, letterSpacing: 3 }}>
              {label}
            </span>
          </div>
          {/* Laser slice glow */}
          <div
            style={{
              position: "absolute",
              left: -10,
              top: CARD_H / 2 - 1,
              width: CARD_W + 20,
              height: 2,
              opacity: sliceOpacity,
              background:
                "linear-gradient(90deg, transparent 0%, rgba(91,231,255,0.9) 30%, #5BE7FF 50%, rgba(91,231,255,0.9) 70%, transparent 100%)",
              boxShadow: "0 0 8px rgba(91,231,255,0.6)",
            }}
          />
        </>
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 8,
            border: "1px solid rgba(91,231,255,0.18)",
            background: "rgba(8,18,32,0.6)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{ color: "#EAF6FF", fontSize: 24, fontWeight: 500, letterSpacing: 3 }}
          >
            {label}
          </span>
          {/* Green dot */}
          <div
            style={{
              position: "absolute",
              top: 10,
              right: 12,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#5BE7FF",
              opacity: dotOpacity,
              boxShadow: `0 0 6px rgba(91,231,255,${dotOpacity})`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export const Effect03AxeCategories: React.FC = () => {
  const frame = useCurrentFrame();

  // Percentage counter
  const percentProgress = interpolate(
    frame,
    [DIAGNOSE_END, FINAL_START - 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const percent = Math.round(70 - 70 * percentProgress);
  const percentRed = interpolate(percentProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const percentColor = `rgb(${Math.round(0 + percentRed * 255)}, ${Math.round(200 - percentRed * 200)}, ${Math.round(83 - percentRed * 83)})`;

  // Golden figure emergence
  const figureStart = FINAL_START;
  const figureProgress = interpolate(
    frame,
    [figureStart, figureStart + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const figureScale = spring({
    frame: Math.max(0, frame - figureStart),
    fps: FPS,
    config: { damping: 13, mass: 0.7, stiffness: 95 },
    durationInFrames: 28,
  });

  // Label and line
  const labelProgress = interpolate(
    frame,
    [figureStart + 15, figureStart + 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const lineWidth = interpolate(labelProgress, [0, 0.5, 1], [0, 200, 200]);

  // Breathing
  const breathCycle = Math.max(0, frame - (figureStart + 30));
  const breath = Math.sin((breathCycle / FPS) * Math.PI * 0.5) * 0.15 + 0.85;

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
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X - 350,
          top: SAFE_Y + 100,
          width: 700,
          height: 900,
          background:
            "radial-gradient(ellipse, rgba(255,255,255,0.02) 0%, transparent 65%)",
        }}
      />

      {/* Percentage counter */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X,
          top: SAFE_Y + 120,
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: percentColor,
            letterSpacing: 4,
            textShadow: `0 0 16px ${percentColor}44`,
          }}
        >
          {percent}%
        </span>
        <div
          style={{
            marginTop: 4,
            fontSize: 16,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: 4,
          }}
        >
          销售额占比
        </div>
      </div>

      {/* Card grid */}
      {ITEMS.map((item, index) => {
        const col = index % COLS;
        const row = Math.floor(index / COLS);
        return (
          <GlassCard
            key={item}
            label={item}
            col={col}
            row={row}
            index={index}
            frame={frame}
          />
        );
      })}

      {/* Golden figure emerging from cut void */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X,
          top: SAFE_Y + SAFE_H / 2 + 60,
          transform: `translate(-50%, -50%) scale(${figureScale})`,
          opacity: interpolate(figureProgress, [0, 0.2, 1], [0, 1, 1]),
        }}
      >
        {/* Golden circle border */}
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: "50%",
            border: `2px solid rgba(255,179,106,${breath})`,
            boxShadow: `0 0 30px rgba(255,179,106,${breath * 0.5}), inset 0 0 16px rgba(255,179,106,${breath * 0.12})`,
            position: "relative",
          }}
        >
          {/* Simplified figure */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "32%",
              transform: "translate(-50%, -50%)",
              width: 60,
              height: 72,
              borderRadius: "50% 50% 40% 40%",
              border: `1.5px solid rgba(255,179,106,${breath * 0.7})`,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "68%",
              transform: "translate(-50%, -50%)",
              width: 80,
              height: 60,
              borderRadius: "40% 40% 30% 30%",
              border: `1.5px solid rgba(255,179,106,${breath * 0.6})`,
            }}
          />
        </div>
      </div>

      {/* "只留这一个" label */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X,
          top: SAFE_Y + SAFE_H / 2 + 200,
          transform: "translate(-50%, -50%)",
          opacity: labelProgress,
        }}
      >
        <span
          style={{
            color: "#FFB36A",
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: 8,
          }}
        >
          只留这一个
        </span>
      </div>

      {/* Golden underline */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X - lineWidth / 2,
          top: SAFE_Y + SAFE_H / 2 + 230,
          width: lineWidth,
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,179,106,0.7) 30%, #FFB36A 50%, rgba(255,179,106,0.7) 70%, transparent 100%)",
          opacity: interpolate(labelProgress, [0.5, 1], [0, breath]),
        }}
      />
    </div>
  );
};
