import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { OverlayContrastField } from "../effect-system";

const FPS = 30;
const SAFE_X = 84;
const SAFE_Y = 154;
const SAFE_W = 912;
const SAFE_H = 1612;
const CENTER_X = SAFE_X + SAFE_W / 2;

const LINES = [
  { text: "真正需要勇气的，", highlight: false },
  { text: "是把那些曾经还很", highlight: false },
  { text: "赚钱的品类", highlight: false, highlightWord: null },
  { text: "砍掉。", highlight: true, highlightWord: "砍掉" },
];

const SWEEP_START = 10;
const SWEEP_DURATION = 48;
const SETTLE_START = SWEEP_START + SWEEP_DURATION;

export const EFFECT_04_DURATION_FRAMES = 130;

const LightSweep: React.FC<{ progress: number }> = ({ progress }) => {
  const x = interpolate(progress, [0, 1], [-100, SAFE_X + SAFE_W + 100]);
  const y = interpolate(progress, [0, 1], [-50, SAFE_Y + SAFE_H + 50]);
  const width = interpolate(progress, [0, 0.1, 0.9, 1], [0, 200, 200, 0]);

  return (
    <div
      style={{
        position: "absolute",
        left: x - width / 2,
        top: y,
        width,
        height: 1,
        background:
          "linear-gradient(90deg, transparent 0%, rgba(255,179,106,0.05) 20%, rgba(255,179,106,0.8) 50%, rgba(255,179,106,0.05) 80%, transparent 100%)",
        boxShadow: "0 0 12px rgba(255,179,106,0.4), 0 0 40px rgba(255,179,106,0.15)",
        transform: "rotate(-45deg)",
        transformOrigin: "center center",
      }}
    />
  );
};

export const Effect04GoldenQuote: React.FC = () => {
  const frame = useCurrentFrame();

  // Sweep progress
  const sweepProgress = interpolate(
    frame,
    [SWEEP_START, SWEEP_START + SWEEP_DURATION],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Each character reveals as sweep passes over
  const charsPerWord = LINES.reduce((sum, l) => sum + l.text.length, 0);
  const charDelay = SWEEP_DURATION / charsPerWord;

  // Vertical gold line marker
  const lineProgress = interpolate(
    frame,
    [SETTLE_START, SETTLE_START + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const lineHeight = interpolate(lineProgress, [0, 1], [0, 120]);

  // Author credit
  const creditProgress = interpolate(
    frame,
    [SETTLE_START + 5, SETTLE_START + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Breathing
  const breathCycle = Math.max(0, frame - (SETTLE_START + 20));
  const breath = Math.sin((breathCycle / FPS) * Math.PI * 0.3) * 0.2 + 0.6;

  // Calculate global char index
  let charIndex = 0;

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
      {/* Light sweep */}
      <LightSweep progress={sweepProgress} />

      {/* Quote text */}
      <div
        style={{
          position: "absolute",
          left: SAFE_X + 80,
          top: SAFE_Y + SAFE_H / 2 - 140,
        }}
      >
        {LINES.map((line, lineIdx) => {
          const chars = line.text.split("");
          return (
            <div
              key={lineIdx}
              style={{
                fontSize: 40,
                fontWeight: line.highlight ? 500 : 500,
                letterSpacing: 4,
                lineHeight: 1.8,
                color: "#EAF6FF",
              }}
            >
              {chars.map((ch, chIdx) => {
                const globalIdx = charIndex + chIdx;
                const charShowTime = SWEEP_START + globalIdx * charDelay;
                const charOpacity = interpolate(
                  frame,
                  [charShowTime - 2, charShowTime, charShowTime + 2],
                  [0, 1, 1],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                );

                const isHighlighted = line.highlightWord && chIdx >= chars.indexOf(line.highlightWord![0]);
                const inHighlightRange = line.highlightWord
                  ? chIdx >= line.text.indexOf(line.highlightWord) &&
                    chIdx < line.text.indexOf(line.highlightWord) + line.highlightWord.length
                  : false;

                return (
                  <span
                    key={chIdx}
                    style={{
                      opacity: charOpacity,
                      color: inHighlightRange ? "#5BE7FF" : "#EAF6FF",
                      fontWeight: inHighlightRange ? 700 : 500,
                      textShadow: inHighlightRange
                        ? `0 0 12px rgba(91,231,255,${breath * 0.4})`
                        : "none",
                    }}
                  >
                    {ch}
                  </span>
                );
              })}
              {(() => {
                charIndex += chars.length;
                return null;
              })()}
            </div>
          );
        })}
      </div>

      {/* Gold vertical line marker */}
      <div
        style={{
          position: "absolute",
          left: SAFE_X + 40,
          top: SAFE_Y + SAFE_H / 2 - 140,
          width: 3,
          height: lineHeight,
          background: `linear-gradient(180deg, rgba(255,179,106,0) 0%, rgba(255,179,106,${breath}) 20%, rgba(255,179,106,${breath}) 80%, rgba(255,179,106,0) 100%)`,
          boxShadow: `0 0 6px rgba(255,179,106,${breath * 0.4})`,
          opacity: lineProgress,
        }}
      />

      {/* Author credit */}
      <div
        style={{
          position: "absolute",
          right: SAFE_X + 40,
          bottom: SAFE_Y + SAFE_H / 2 - 160,
          opacity: creditProgress,
        }}
      >
        <span
          style={{
            color: "#8EA7BB",
            fontSize: 20,
            letterSpacing: 2,
            fontWeight: 400,
          }}
        >
          ——《因为独特》李翔
        </span>
      </div>
    </div>
  );
};
