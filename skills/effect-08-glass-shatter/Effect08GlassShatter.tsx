import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { OverlayContrastField } from "../effect-system";

const FPS = 30;
const SAFE_X = 84;
const SAFE_Y = 154;
const SAFE_W = 912;
const SAFE_H = 1612;
const CENTER_X = SAFE_X + SAFE_W / 2;

const STILL_END = 24; // 0.8s still
const SHOT1 = STILL_END + 9; // first shot
const SHOT2 = SHOT1 + 18; // second shot
const SHOT3 = SHOT2 + 18; // third shot
const SHATTER_START = SHOT3 + 12;
const REBIRTH_START = SHATTER_START + 22;

export const EFFECT_08_DURATION_FRAMES = 170;
const PARTICLE_WIDTHS = Array.from({ length: 40 }, (_, i) => 4 + (i % 4));
const PARTICLE_HEIGHTS = Array.from({ length: 40 }, (_, i) => 5 + (i % 5));

const Cracks: React.FC<{ frame: number; startFrame: number; cx: number; cy: number }> = ({
  frame,
  startFrame,
  cx,
  cy,
}) => {
  const crackProgress = interpolate(
    frame,
    [startFrame, startFrame + 12],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  if (crackProgress <= 0) return null;

  const lines = 8;
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
      {Array.from({ length: lines }).map((_, i) => {
        const angle = (Math.PI * 2 * i) / lines + 0.3;
        const length = 80 + i * 20;
        const dashOffset = 200 * (1 - Math.min(1, crackProgress));
        const endX = cx + Math.cos(angle) * length * crackProgress;
        const endY = cy + Math.sin(angle) * length * crackProgress;
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={endX}
            y2={endY}
            stroke="rgba(255,255,255,0.7)"
            strokeWidth={1 + crackProgress * 0.5}
            strokeDasharray="200"
            strokeDashoffset={dashOffset}
          />
        );
      })}
      {/* Impact glow */}
      <circle
        cx={cx}
        cy={cy}
        r={12 * crackProgress}
        fill="rgba(91,231,255,0.18)"
        style={{ filter: "blur(4px)" }}
      />
    </svg>
  );
};

export const Effect08GlassShatter: React.FC = () => {
  const frame = useCurrentFrame();

  // Floating breathe before shots
  const initialBreath = Math.sin((frame / FPS) * 0.3) * 0.005 + 1;

  // Shot impact glows
  const shot1Active = frame >= SHOT1;
  const shot2Active = frame >= SHOT2;
  const shot3Active = frame >= SHOT3;

  // Shake during shots
  const shakeX = frame >= SHOT1 && frame < SHATTER_START
    ? Math.sin((frame - SHOT1) * 0.5) * interpolate(frame, [SHOT1, SHATTER_START], [2, 6], { extrapolateRight: "clamp" })
    : 0;

  // Shatter phase
  const shatterProgress = interpolate(
    frame,
    [SHATTER_START, SHATTER_START + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const shatterOpacity = interpolate(shatterProgress, [0, 0.6, 1], [1, 0.3, 0]);
  const shatterScale = interpolate(shatterProgress, [0, 1], [1, 0.2]);
  const shatterBlur = interpolate(shatterProgress, [0, 1], [0, 6]);

  // Golden tint during shatter
  const goldTint = interpolate(shatterProgress, [0.3, 0.7, 1], [0, 0.5, 1]);

  // Rebirth
  const rebirthIn = spring({
    frame: Math.max(0, frame - REBIRTH_START),
    fps: FPS,
    config: { damping: 11, mass: 0.7, stiffness: 90 },
    durationInFrames: 30,
  });

  const breathCycle = Math.max(0, frame - (REBIRTH_START + 30));
  const breath = Math.sin((breathCycle / FPS) * Math.PI * 0.5) * 0.15 + 0.85;

  const textY = SAFE_Y + SAFE_H / 2 - 40;
  const shotPoints = [
    { x: CENTER_X - 280, y: textY + 8 },
    { x: CENTER_X + 100, y: textY + 8 },
    { x: CENTER_X + 260, y: textY + 8 },
  ];

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
      {/* Original text - glass panel */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X,
          top: textY,
          transform: `translate(-50%, -50%) scale(${initialBreath * shatterScale}) translateX(${shakeX}px)`,
          opacity: shatterOpacity,
          filter: `blur(${shatterBlur}px)`,
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 400,
            letterSpacing: 6,
            color: `rgb(${Math.round(102 + goldTint * 153)}, ${Math.round(102 + goldTint * 113)}, ${Math.round(102 - goldTint * 102)})`,
            textShadow: `inset 0 0 1px rgba(91,231,255,0.16)`,
          }}
        >
          AI 负责平庸
        </div>
      </div>

      {/* Cracks from shots */}
      {shot1Active && <Cracks frame={frame} startFrame={SHOT1} cx={shotPoints[0].x} cy={shotPoints[0].y} />}
      {shot2Active && <Cracks frame={frame} startFrame={SHOT2} cx={shotPoints[1].x} cy={shotPoints[1].y} />}
      {shot3Active && <Cracks frame={frame} startFrame={SHOT3} cx={shotPoints[2].x} cy={shotPoints[2].y} />}

      {/* Flash overlays for shots */}
      {[SHOT1, SHOT2, SHOT3].map((shotFrame, i) => {
        const flashOpacity = interpolate(
          frame,
          [shotFrame, shotFrame + 1, shotFrame + 3],
          [0, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        if (flashOpacity <= 0) return null;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: shotPoints[i].x - 30,
              top: shotPoints[i].y - 30,
              width: 60,
              height: 60,
              borderRadius: "50%",
              background:
                `radial-gradient(circle, rgba(255,255,255,${flashOpacity * 0.8}) 0%, rgba(255,255,255,${flashOpacity * 0.3}) 30%, transparent 70%)`,
            }}
          />
        );
      })}

      {/* Golden shatter particles */}
      {shatterProgress > 0.3 &&
        Array.from({ length: 40 }).map((_, i) => {
          const angle = (Math.PI * 2 * i) / 40;
          const dist = interpolate(shatterProgress, [0.3, 1], [0, 200]);
          const px = CENTER_X + Math.cos(angle) * dist;
          const py = textY + Math.sin(angle) * dist;
          const pOpacity = interpolate(shatterProgress, [0.3, 0.6, 1], [0, 1, 0]);
          const colorProgress = interpolate(shatterProgress, [0.3, 1], [0, 1]);
          const r = Math.round(102 + colorProgress * 153);
          const g = Math.round(102 + colorProgress * 113);
          const b = Math.round(102 - colorProgress * 102);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: px,
                top: py,
                width: PARTICLE_WIDTHS[i],
                height: PARTICLE_HEIGHTS[i],
                borderRadius: 1,
                background: `rgb(${r},${g},${b})`,
                opacity: pOpacity,
                transform: `rotate(${angle}rad)`,
              }}
            />
          );
        })}

      {/* Reborn text */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X,
          top: textY + 30,
          transform: `translate(-50%, -50%) scale(${rebirthIn})`,
          opacity: Math.min(1, rebirthIn * 1.5),
          textAlign: "center",
        }}
      >
        {/* Gold frame */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "110%",
            height: "160%",
            border: `2px solid rgba(255,179,106,${breath})`,
            borderRadius: 4,
            boxShadow: `0 0 20px rgba(255,179,106,${breath * 0.5}), inset 0 0 10px rgba(255,179,106,${breath * 0.08})`,
            opacity: rebirthIn,
          }}
        />
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            letterSpacing: 3,
            color: "#FFB36A",
            textShadow: `0 0 24px rgba(255,179,106,${breath * 0.5}), 0 0 60px rgba(255,179,106,${breath * 0.2})`,
            position: "relative",
            zIndex: 1,
          }}
        >
          你必须负责删掉平庸
        </div>
      </div>
    </div>
  );
};
