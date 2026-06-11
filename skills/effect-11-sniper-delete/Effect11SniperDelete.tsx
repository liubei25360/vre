import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { OverlayContrastField } from "../effect-system";

const FPS = 30;
const SAFE_X = 84;
const SAFE_Y = 154;
const SAFE_W = 912;
const SAFE_H = 1612;
const CENTER_X = SAFE_X + SAFE_W / 2;

const TEXT_Y = SAFE_Y + SAFE_H / 2 - 40;
const LOCK_START = 10;
const FIRE_START = LOCK_START + 24;
const EVAPORATE_START = FIRE_START + 6;
const CONFIRM_START = EVAPORATE_START + 18;

export const EFFECT_11_DURATION_FRAMES = 120;

export const Effect11SniperDelete: React.FC = () => {
  const frame = useCurrentFrame();

  // Scope slides in
  const scopeProgress = interpolate(
    frame,
    [LOCK_START, LOCK_START + 24],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const scopeX = interpolate(scopeProgress, [0, 1], [SAFE_X + SAFE_W + 100, CENTER_X]);

  // Scope pulse after lock
  const scopePulse = frame >= LOCK_START + 24
    ? 1 + Math.sin((frame - LOCK_START - 24) * 0.3) * 0.05
    : 1;

  // Fire flash
  const flashProgress = interpolate(
    frame,
    [FIRE_START, FIRE_START + 2, FIRE_START + 5],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Text shatter
  const shatterProgress = interpolate(
    frame,
    [FIRE_START + 2, EVAPORATE_START],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const textOpacity = interpolate(shatterProgress, [0, 0.5, 1], [1, 0.3, 0]);
  const textBlur = interpolate(shatterProgress, [0, 1], [0, 8]);

  // Crack lines
  const crackProgress = interpolate(
    frame,
    [FIRE_START, FIRE_START + 14],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Confirm card
  const confirmIn = spring({
    frame: Math.max(0, frame - CONFIRM_START),
    fps: FPS,
    config: { damping: 14, mass: 0.5, stiffness: 100 },
    durationInFrames: 18,
  });
  const lineWidth = interpolate(confirmIn, [0, 0.6, 1], [0, 80, 80]);

  // Breathing
  const breathCycle = Math.max(0, frame - (CONFIRM_START + 18));
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
      {/* Text to delete */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X,
          top: TEXT_Y,
          transform: "translate(-50%, -50%)",
          opacity: textOpacity,
          filter: `blur(${textBlur}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 32,
            fontWeight: 300,
            letterSpacing: 3,
            color: "#EAF6FF",
            lineHeight: 1.6,
            border: "1px solid rgba(91,231,255,0.14)",
            padding: "12px 28px",
            borderRadius: 6,
          }}
        >
          职场新人要持续学习，
          <br />
          提升核心竞争力。
        </div>
      </div>

      {/* Sniper scope */}
      {frame >= LOCK_START && frame < EVAPORATE_START && (
        <div
          style={{
            position: "absolute",
            left: scopeX,
            top: TEXT_Y,
            transform: `translate(-50%, -50%) scale(${scopePulse})`,
          }}
        >
          {/* Outer ring */}
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              border: "2px solid #5BE7FF",
              boxShadow: "0 0 8px rgba(91,231,255,0.5)",
              position: "relative",
            }}
          >
            {/* Inner ring */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: 20,
                height: 20,
                borderRadius: "50%",
                border: "1px solid rgba(91,231,255,0.7)",
              }}
            />
            {/* Crosshair */}
            <div
              style={{
                position: "absolute",
                left: 29,
                top: 0,
                width: 2,
                height: 60,
                background: "rgba(91,231,255,0.2)",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 29,
                width: 60,
                height: 2,
                background: "rgba(91,231,255,0.2)",
              }}
            />
          </div>
        </div>
      )}

      {/* Flash */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X - 30,
          top: TEXT_Y - 30,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(255,255,255,${flashProgress}) 0%, transparent 70%)`,
        }}
      />

      {/* Cracks */}
      {crackProgress > 0 && crackProgress < 1 && (
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
          {Array.from({ length: 10 }).map((_, i) => {
            const angle = (Math.PI * 2 * i) / 10;
            const len = 100 + i * 15;
            const doff = 250 * (1 - Math.min(1, crackProgress));
            return (
              <line
                key={i}
                x1={CENTER_X}
                y1={TEXT_Y}
                x2={CENTER_X + Math.cos(angle) * len * crackProgress}
                y2={TEXT_Y + Math.sin(angle) * len * crackProgress}
                stroke="rgba(255,255,255,0.6)"
                strokeWidth={1 + crackProgress * 0.5}
                strokeDasharray="250"
                strokeDashoffset={doff}
              />
            );
          })}
        </svg>
      )}

      {/* Confirm: "已删除" */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X,
          top: TEXT_Y,
          transform: `translate(-50%, -50%) scale(${confirmIn})`,
          opacity: confirmIn,
          textAlign: "center",
        }}
      >
        <div
          style={{
            padding: "8px 28px",
            border: `2px solid rgba(91,231,255,${breath})`,
            borderRadius: 4,
            background: "rgba(91,231,255,0.04)",
            boxShadow: `0 0 12px rgba(91,231,255,${breath * 0.2})`,
          }}
        >
          <span
            style={{
              color: "#5BE7FF",
              fontSize: 20,
              fontWeight: 500,
              letterSpacing: 6,
            }}
          >
            已删除
          </span>
        </div>
        {/* Red line */}
        <div
          style={{
            marginTop: 12,
            width: lineWidth,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(91,231,255,0.8), transparent)",
            margin: "12px auto 0",
          }}
        />
      </div>
    </div>
  );
};
