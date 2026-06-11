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

const ITEMS = [
  { label: "墨镜", angle: 0 },
  { label: "袜子", angle: 60 },
  { label: "文具", angle: 120 },
  { label: "T恤", angle: 180 },
  { label: "帽子", angle: 240 },
  { label: "贴纸", angle: 300 },
];

const ORBIT_RADIUS = 250;
const PHASE1_END = 24; // 0.8s
const PHASE2_END = 72; // 2.4s
const PHASE3_END = 102; // 3.4s
const PHASE4_END = 126; // 4.2s

export const EFFECT_02_DURATION_FRAMES = 156; // ~5.2s

const GlassOrbital: React.FC<{
  label: string;
  angle: number;
  frame: number;
}> = ({ label, angle, frame }) => {
  // Phase 1: slow rotation, then accelerate
  const rotationSpeed = interpolate(
    frame,
    [0, PHASE1_END, PHASE2_END],
    [1, 3, 6],
    { extrapolateRight: "clamp" },
  );
  const baseAngle = (angle * Math.PI) / 180;
  const time = frame / FPS;
  const currentAngle = baseAngle + time * rotationSpeed * 0.5;

  // Phase 2: shrink toward center
  const shrinkRadius = interpolate(
    frame,
    [PHASE1_END, PHASE2_END],
    [ORBIT_RADIUS, 60],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const shrinkScale = interpolate(
    frame,
    [PHASE1_END, PHASE2_END],
    [1, 0.3],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const shrinkOpacity = interpolate(
    frame,
    [PHASE1_END, PHASE3_END],
    [1, 0.05],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Phase 3: fly out
  const ejectProgress = interpolate(
    frame,
    [PHASE3_END, PHASE3_END + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const ejectX = Math.cos(currentAngle) * interpolate(ejectProgress, [0, 1], [0, 200]);
  const ejectY = Math.sin(currentAngle) * interpolate(ejectProgress, [0, 1], [0, 150]);
  const ejectOpacity = interpolate(ejectProgress, [0, 0.3, 1], [1, 1, 0]);

  const x = CENTER_X + Math.cos(currentAngle) * shrinkRadius + ejectX;
  const y = CENTER_Y + Math.sin(currentAngle) * shrinkRadius + ejectY;
  const scale = shrinkScale;
  const opacity = frame >= PHASE3_END ? ejectOpacity : shrinkOpacity;

  if (frame >= PHASE3_END + 15 && ejectOpacity <= 0) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        width: 64,
        height: 64,
        borderRadius: 10,
        border: "1px solid rgba(91,231,255,0.22)",
        background: "rgba(8,18,32,0.34)",
        backdropFilter: "blur(4px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity,
      }}
    >
      <span
        style={{
          color: "#999",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: 2,
        }}
      >
        {label}
      </span>
    </div>
  );
};

export const Effect02PopmartCards: React.FC = () => {
  const frame = useCurrentFrame();

  // Center glow
  const glowIn = interpolate(
    frame,
    [6, PHASE1_END],
    [0, 0.6],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Figure emergence
  const figureProgress = interpolate(
    frame,
    [PHASE2_END - 10, PHASE3_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const figureScale = spring({
    frame: Math.max(0, frame - (PHASE2_END - 10)),
    fps: FPS,
    config: { damping: 14, mass: 0.6, stiffness: 100 },
    durationInFrames: 30,
  });
  const figureSize = interpolate(figureProgress, [0, 1], [140, 200]);

  // Number counter
  const numberProgress = interpolate(
    frame,
    [PHASE3_END, PHASE4_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const percent = Math.round(interpolate(numberProgress, [0, 1], [0, 30]));
  const numberOpacity = interpolate(numberProgress, [0, 0.3, 1], [0, 1, 1]);
  const labelOpacity = interpolate(numberProgress, [0.2, 0.5, 1], [0, 1, 1]);
  const lineWidth = interpolate(numberProgress, [0.5, 1], [0, 120]);

  // Final breathing
  const breathCycle = Math.max(0, frame - PHASE4_END);
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
      {/* Ambient dark bg glow */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X - 400,
          top: CENTER_Y - 400,
          width: 800,
          height: 800,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 60%)",
        }}
      />

      {/* Center golden glow */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X,
          top: CENTER_Y,
          transform: "translate(-50%, -50%)",
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(255,179,106,${glowIn * 0.3}) 0%, rgba(255,179,106,${glowIn * 0.1}) 40%, transparent 70%)`,
          filter: "blur(20px)",
        }}
      />

      {/* Orbital items */}
      {ITEMS.map((item) => (
        <GlassOrbital
          key={item.label}
          label={item.label}
          angle={item.angle}
          frame={frame}
        />
      ))}

      {/* Golden figure silhouette */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X,
          top: CENTER_Y,
          transform: `translate(-50%, -50%) scale(${figureScale})`,
          width: figureSize,
          height: figureSize,
          opacity: interpolate(figureProgress, [0, 0.3, 1], [0, 1, 1]),
        }}
      >
        {/* Golden border circle */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: `2px solid rgba(255,179,106,${breath})`,
            boxShadow: `0 0 24px rgba(255,179,106,${breath * 0.5}), inset 0 0 12px rgba(255,179,106,${breath * 0.15})`,
          }}
        />
        {/* Inner figure - simplified toy shape */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "30%",
            transform: "translate(-50%, -50%)",
            width: figureSize * 0.35,
            height: figureSize * 0.45,
            borderRadius: "50% 50% 40% 40%",
            border: `1.5px solid rgba(255,179,106,${breath * 0.6})`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "65%",
            transform: "translate(-50%, -50%)",
            width: figureSize * 0.5,
            height: figureSize * 0.4,
            borderRadius: "40% 40% 30% 30%",
            border: `1.5px solid rgba(255,179,106,${breath * 0.5})`,
          }}
        />
      </div>

      {/* Label above figure */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X,
          top: CENTER_Y - 160,
          transform: "translate(-50%, -50%)",
          opacity: labelOpacity,
        }}
      >
        <span
          style={{
            color: "#B2C7D9",
            fontSize: 20,
            letterSpacing: 6,
            fontWeight: 400,
          }}
        >
          占总营业额
        </span>
      </div>

      {/* Percentage number */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X,
          top: CENTER_Y + 140,
          transform: "translate(-50%, -50%)",
          opacity: numberOpacity,
        }}
      >
        <span
          style={{
            color: "#FFB36A",
            fontSize: 80,
            fontWeight: 900,
            letterSpacing: 4,
            textShadow: `0 0 20px rgba(255,179,106,${breath * 0.4})`,
          }}
        >
          {percent}%
        </span>
      </div>

      {/* Golden underline */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X - lineWidth / 2,
          top: CENTER_Y + 200,
          width: lineWidth,
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,179,106,0.8) 30%, #FFB36A 50%, rgba(255,179,106,0.8) 70%, transparent 100%)",
          opacity: interpolate(numberProgress, [0.6, 1], [0, breath]),
        }}
      />
    </div>
  );
};
