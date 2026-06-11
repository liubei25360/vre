import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { OverlayContrastField } from "../effect-system";

const FPS = 30;
const SAFE_X = 84;
const SAFE_Y = 154;
const SAFE_W = 912;
const SAFE_H = 1612;
const CENTER_X = SAFE_X + SAFE_W / 2;

const CONTAINER_W = 820;

const PROMPT_LINES = [
  { text: "如果只能保留一个建议，", highlight: false },
  { text: "不是给所有人，", highlight: false },
  { text: "就是针对我目前这个具体情况，", highlight: false },
  { text: "你留哪一个？为什么？", highlight: true, highlightWord: "为什么" },
];

const CONTAINER_IN = 15;
const TYPE_START = CONTAINER_IN + 10;
const CHAR_DELAY_FRAMES = 2; // ~0.067s per char
const totalChars = PROMPT_LINES.reduce((sum, l) => sum + l.text.length, 0);
const TYPE_END = TYPE_START + totalChars * CHAR_DELAY_FRAMES;
const SETTLE_START = TYPE_END + 6;

export const EFFECT_12_DURATION_FRAMES = 200; // ~6.7s

export const Effect12PromptTypewriter: React.FC = () => {
  const frame = useCurrentFrame();

  // Container spring in
  const containerIn = spring({
    frame: Math.max(0, frame - CONTAINER_IN),
    fps: FPS,
    config: { damping: 14, mass: 0.7, stiffness: 90 },
    durationInFrames: 20,
  });

  // Typewriter progress
  const typeProgress = interpolate(
    frame,
    [TYPE_START, TYPE_END],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const typedChars = Math.floor(typeProgress * totalChars);

  // After typing - settle
  const settleProgress = interpolate(
    frame,
    [TYPE_END + 6, TYPE_END + 24],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const lineWidth = interpolate(settleProgress, [0, 0.4, 1], [0, 600, 600]);
  const saveLabelOpacity = interpolate(settleProgress, [0.3, 0.7, 1], [0, 1, 1]);

  // Breathing
  const breathCycle = Math.max(0, frame - (TYPE_END + 24));
  const breath = Math.sin((breathCycle / FPS) * Math.PI * 0.3) * 0.12 + 0.88;

  // Render each line with typewriter effect
  let charCount = 0;
  const renderedLines = PROMPT_LINES.map((line, lineIdx) => {
    const chars = line.text.split("");
    const charsToShow = chars.filter((_, chIdx) => {
      const globalIdx = charCount + chIdx;
      return globalIdx < typedChars;
    });
    const remaining = chars.length - charsToShow.length;
    const showCursor = charCount + charsToShow.length === typedChars && typedChars < totalChars;
    const cursorIsGold = line.highlight;
    charCount += chars.length;

    return (
      <div
        key={lineIdx}
        style={{
          fontSize: 22,
          fontWeight: 400,
          letterSpacing: 2,
          lineHeight: 2,
          color: "#EAF6FF",
          position: "relative",
        }}
      >
        {charsToShow.map((ch, chIdx) => {
          const isHighlighted =
            line.highlightWord &&
            chIdx >= line.text.indexOf(line.highlightWord) &&
            chIdx < line.text.indexOf(line.highlightWord) + line.highlightWord!.length;
          return (
            <span
              key={chIdx}
              style={{
                color: isHighlighted ? "#FFB36A" : "#EAF6FF",
                fontWeight: isHighlighted ? 600 : 400,
              }}
            >
              {ch}
            </span>
          );
        })}
        {showCursor && (
          <span
            style={{
              display: "inline-block",
              width: 2,
              height: 22,
              background: cursorIsGold ? "#FFB36A" : "#EAF6FF",
              verticalAlign: "middle",
              marginLeft: 1,
              opacity: Math.sin((frame / FPS) * 10) > 0 ? 1 : 0,
            }}
          />
        )}
      </div>
    );
  });

  // After all typed, show end cursor then remove
  const showEndCursor = frame >= TYPE_END && frame < TYPE_END + 6 && Math.sin((frame / FPS) * 10) > 0;

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
      {/* Glass container */}
      <div
        style={{
          position: "absolute",
          left: CENTER_X - CONTAINER_W / 2,
          top: SAFE_Y + SAFE_H / 2 - 160,
          width: CONTAINER_W,
          borderRadius: 16,
          border: "1px solid rgba(91,231,255,0.16)",
          background: "rgba(6,14,26,0.5)",
          backdropFilter: "blur(12px)",
          padding: "32px 36px",
          transform: `translateY(${interpolate(containerIn, [0, 1], [120, 0])}px)`,
          opacity: containerIn,
          boxShadow: `0 0 30px rgba(255,179,106,${breath * 0.06})`,
        }}
      >
        {/* Prompt badge */}
        <div
          style={{
            display: "inline-block",
            padding: "4px 14px",
            borderRadius: 13,
            border: "1px solid #FFB36A",
            background: "rgba(255,179,106,0.08)",
            marginBottom: 20,
          }}
        >
          <span
            style={{
              color: "#FFB36A",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 4,
            }}
          >
            PROMPT
          </span>
        </div>

        {/* Typewriter text */}
        <div style={{ position: "relative", minHeight: 200 }}>
          {renderedLines}

          {/* End cursor */}
          {showEndCursor && (
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: 22,
                background: "#FFB36A",
                verticalAlign: "middle",
                marginLeft: 1,
                position: "absolute",
                bottom: 0,
              }}
            />
          )}
        </div>

        {/* Golden line */}
        <div
          style={{
            marginTop: 20,
            width: lineWidth,
            height: 1,
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,179,106,0.7) 30%, #FFB36A 50%, rgba(255,179,106,0.7) 70%, transparent 100%)",
          }}
        />

        {/* Save hint */}
        <div
          style={{
            marginTop: 12,
            textAlign: "center",
            opacity: saveLabelOpacity * (0.5 + Math.sin((frame / FPS) * 1.8) * 0.5 + 0.5) * 0.5,
          }}
        >
          <span
            style={{
              color: "#FFB36A",
              fontSize: 18,
              fontWeight: 500,
              letterSpacing: 8,
            }}
          >
            截图保存
          </span>
        </div>
      </div>
    </div>
  );
};
