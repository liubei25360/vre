import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { OverlayContrastField } from "../effect-system";

const FPS = 30;
const SAFE_X = 84;
const SAFE_Y = 154;
const SAFE_W = 912;
const SAFE_H = 1612;

const GATES = [
  { label: "人", question: "换个人成立吗？", passes: false },
  { label: "场景", question: "换场景成立吗？", passes: false },
  { label: "结果", question: "换结果成立吗？", passes: true },
];
const GATE_SPACING = 250;
const GATE_X = SAFE_X + 120;
const GATE_INTERVAL = 36;

export const EFFECT_10_DURATION_FRAMES = 150;

const LaserGate: React.FC<{
  x: number;
  label: string;
  isActive: boolean;
  isPassed: boolean;
  frame: number;
  sweepProgress: number;
}> = ({ x, label, isActive, isPassed, frame, sweepProgress }) => {
  const color = isPassed ? "#FFB36A" : "#5BE7FF";
  const opacity = isActive ? 1 : 0.2;
  const glow = isActive ? 8 : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: SAFE_Y + 100,
        width: 1,
        height: SAFE_H - 200,
        background: color,
        opacity,
        boxShadow: `0 0 ${glow}px ${color}`,
      }}
    >
      {/* Gate label */}
      <div
        style={{
          position: "absolute",
          top: -30,
          left: "50%",
          transform: "translateX(-50%)",
          color: "#8EA7BB",
          fontSize: 14,
          letterSpacing: 4,
        }}
      >
        {label}
      </div>

      {/* Sweep highlight */}
      {isActive && sweepProgress > 0 && sweepProgress < 1 && (
        <div
          style={{
            position: "absolute",
            left: -10,
            top: `${sweepProgress * 100}%`,
            width: 20,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          }}
        />
      )}
    </div>
  );
};

export const Effect10LaserGates: React.FC = () => {
  const frame = useCurrentFrame();

  const gate1Start = 12;
  const gate2Start = gate1Start + GATE_INTERVAL;
  const gate3Start = gate2Start + GATE_INTERVAL;

  const breathCycle = Math.max(0, frame - (gate3Start + 30));
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
      {GATES.map((gate, index) => {
        const startFrame = gate1Start + index * GATE_INTERVAL;
        const isActive = frame >= startFrame;

        // Card slides in from left
        const cardProgress = interpolate(
          frame,
          [startFrame, startFrame + 12],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        const cardX = interpolate(cardProgress, [0, 1], [-400, GATE_X + index * GATE_SPACING - 180]);

        // Sweep scan
        const sweepProgress = interpolate(
          frame,
          [startFrame + 12, startFrame + 20],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        // Stamp result
        const stampTime = startFrame + 22;
        const stampProgress = spring({
          frame: Math.max(0, frame - stampTime),
          fps: FPS,
          config: { damping: 14, mass: 0.4, stiffness: 120 },
          durationInFrames: 14,
        });

        // Card exits after stamp
        const exitProgress = interpolate(
          frame,
          [stampTime + 10, stampTime + 24],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );
        const exitY = gate.passes ? 0 : interpolate(exitProgress, [0, 1], [0, 300]);
        const exitOpacity = gate.passes ? 1 : interpolate(exitProgress, [0, 0.5, 1], [1, 0.6, 0]);

        const gateX = GATE_X + index * GATE_SPACING;
        const isDone = !gate.passes && frame > stampTime + 24;

        if (isDone) {
          return (
            <LaserGate
              key={index}
              x={gateX}
              label={gate.label}
              isActive={false}
              isPassed={gate.passes}
              frame={frame}
              sweepProgress={0}
            />
          );
        }

        return (
          <React.Fragment key={index}>
            <LaserGate
              x={gateX}
              label={gate.label}
              isActive={isActive}
              isPassed={gate.passes && frame >= stampTime}
              frame={frame}
              sweepProgress={sweepProgress}
            />

            {/* Question card */}
            <div
              style={{
                position: "absolute",
                left: cardX,
                top: SAFE_Y + SAFE_H / 2 - 30 + exitY,
                width: 320,
                height: 60,
                borderRadius: 8,
                border: `1px solid rgba(255,255,255,${gate.passes && frame >= stampTime ? 0.3 : 0.15})`,
                background: `rgba(255,255,255,${gate.passes && frame >= stampTime ? 0.06 : 0.03})`,
                backdropFilter: "blur(4px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: exitOpacity,
              }}
            >
              <span
                style={{
                  color: gate.passes && frame >= stampTime ? "#FFB36A" : "#EAF6FF",
                  fontSize: 20,
                  fontWeight: 500,
                  letterSpacing: 3,
                }}
              >
                {gate.question}
              </span>

              {/* Stamp */}
              {frame >= stampTime && (
                <div
                  style={{
                    position: "absolute",
                    right: -10,
                    top: -10,
                    transform: `rotate(-5deg) scale(${stampProgress})`,
                    fontSize: 40,
                    fontWeight: 900,
                    color: gate.passes ? "#FFB36A" : "#5BE7FF",
                    textShadow: `0 0 12px ${gate.passes ? "rgba(255,179,106,0.4)" : "rgba(91,231,255,0.4)"}`,
                  }}
                >
                  {gate.passes ? "✓" : "✗"}
                </div>
              )}
            </div>

            {/* Golden halo for passed card */}
            {gate.passes && frame >= stampTime && (
              <div
                style={{
                  position: "absolute",
                  left: cardX - 20,
                  top: SAFE_Y + SAFE_H / 2 - 50 + exitY,
                  width: 360,
                  height: 100,
                  borderRadius: 14,
                  border: `1px solid rgba(255,179,106,${breath * 0.3})`,
                  boxShadow: `0 0 24px rgba(255,179,106,${breath * 0.15})`,
                  opacity: exitOpacity,
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
