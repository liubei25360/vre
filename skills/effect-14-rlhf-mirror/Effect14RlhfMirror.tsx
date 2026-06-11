import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { EFFECT_THEME, OverlayContrastField, SAFE_W, SAFE_X, SAFE_Y } from "../effect-system";

export const EFFECT_14_DURATION_FRAMES = 165;

const responseLines = [
  "持续学习，提升核心竞争力",
  "找到适合自己的节奏",
  "保持长期主义就会越来越好",
  "相信自己已经很棒了",
];

const keywords = ["持续学习", "核心竞争力", "提升能力"];
const rainColumns = [150, 230, 310, 390, 670, 750, 830, 910];

export const Effect14RlhfMirror: React.FC = () => {
  const frame = useCurrentFrame();
  const bubbleIn = spring({ frame: frame - 2, fps: 30, config: { damping: 14, stiffness: 110 } });
  const panelIn = spring({ frame: frame - 18, fps: 30, config: { damping: 14, stiffness: 110 } });
  const conclusionIn = spring({ frame: frame - 100, fps: 30, config: { damping: 12, stiffness: 120 } });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "transparent",
        fontFamily: '"Inter", "Noto Sans SC", sans-serif',
      }}
    >
      <OverlayContrastField top={220} centerY={780} width={880} height={1040} />

      <div
        style={{
          position: "absolute",
          left: SAFE_X,
          top: SAFE_Y,
          width: SAFE_W,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 20,
          letterSpacing: 3,
          color: EFFECT_THEME.textMuted,
        }}
      >
        <div>RLHF INTERFACE</div>
        <div style={{ color: EFFECT_THEME.accentCyan }}>SYCOPHANCY MAP</div>
      </div>

      <div
        style={{
          position: "absolute",
          left: SAFE_X + 10,
          top: SAFE_Y + 140,
          width: 360,
          padding: "24px 28px",
          borderRadius: 30,
          background: "linear-gradient(180deg, rgba(8,18,32,0.78), rgba(6,14,26,0.58))",
          border: "1px solid rgba(91,231,255,0.24)",
          color: EFFECT_THEME.textPrimary,
          transform: `translateY(${(1 - bubbleIn) * 50}px) scale(${0.92 + bubbleIn * 0.08})`,
          opacity: bubbleIn,
        }}
      >
        <div style={{ color: EFFECT_THEME.textMuted, fontSize: 16, letterSpacing: 3 }}>USER INPUT</div>
        <div style={{ marginTop: 18, fontSize: 34, lineHeight: 1.38, fontWeight: 700 }}>
          怎么才能更快变强？
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: SAFE_X + 18,
          top: SAFE_Y + 230,
          width: 510,
          height: 500,
          borderRadius: 34,
          background: "linear-gradient(180deg, rgba(9,20,38,0.82), rgba(6,14,26,0.56))",
          border: "1px solid rgba(91,231,255,0.2)",
          boxShadow: "0 0 36px rgba(47,123,255,0.16)",
          transform: `translateY(${(1 - panelIn) * 60}px) scale(${0.94 + panelIn * 0.06})`,
          opacity: panelIn,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 28,
            color: EFFECT_THEME.textMuted,
            fontSize: 16,
            letterSpacing: 3,
          }}
        >
          AI RESPONSE
        </div>
        {responseLines.map((line, i) => {
          const lineIn = interpolate(frame, [24 + i * 8, 42 + i * 8], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={line}
              style={{
                position: "absolute",
                left: 28,
                right: 28,
                top: 78 + i * 88,
                height: 58,
                borderRadius: 18,
                padding: "0 18px",
                display: "flex",
                alignItems: "center",
                background: "rgba(255,255,255,0.04)",
                color: EFFECT_THEME.textSecondary,
                fontSize: 28,
                opacity: 0.2 + lineIn * 0.8,
                transform: `translateX(${(1 - lineIn) * 24}px)`,
              }}
            >
              {line}
            </div>
          );
        })}
      </div>

      {Array.from({ length: 24 }).map((_, i) => {
        const col = rainColumns[i % rainColumns.length];
        const start = i * 3 + 22;
        const drop = interpolate(frame, [start, start + 36], [-100, 600], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const alpha = interpolate(frame, [start, start + 12, start + 36], [0, 0.86, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: col,
              top: SAFE_Y + 170 + drop,
              width: 42,
              height: 42,
              borderRadius: 999,
              border: "1px solid rgba(91,231,255,0.22)",
              background: "rgba(8,18,32,0.58)",
              boxShadow: "0 0 18px rgba(91,231,255,0.18)",
              color: EFFECT_THEME.accentWarm,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              opacity: alpha,
            }}
          >
            +
          </div>
        );
      })}

      {keywords.map((word, i) => {
        const reveal = spring({ frame: frame - 58 - i * 8, fps: 30, config: { damping: 12, stiffness: 120 } });
        return (
          <div
            key={word}
            style={{
              position: "absolute",
              left: SAFE_X + 130 + i * 250,
              top: SAFE_Y + 770 + (i % 2) * 78,
              padding: "16px 24px",
              borderRadius: 999,
              border: "1px solid rgba(255,122,107,0.26)",
              background: "linear-gradient(180deg, rgba(45,12,18,0.44), rgba(22,8,12,0.24))",
              color: EFFECT_THEME.accentDanger,
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: 1,
              transform: `scale(${0.82 + reveal * 0.18})`,
              opacity: reveal,
              boxShadow: "0 0 24px rgba(255,122,107,0.18)",
            }}
          >
            {word}
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: SAFE_X + 74,
          top: SAFE_Y + 990,
          width: SAFE_W - 148,
          padding: "26px 34px",
          borderRadius: 30,
          border: "1px solid rgba(91,231,255,0.2)",
          background: "linear-gradient(180deg, rgba(8,18,32,0.78), rgba(6,14,26,0.52))",
          transform: `scale(${0.84 + conclusionIn * 0.16})`,
          opacity: conclusionIn,
        }}
      >
        <div style={{ color: EFFECT_THEME.accentCyan, fontSize: 20, letterSpacing: 3 }}>RLHF to SYCOPHANCY</div>
        <div
          style={{
            marginTop: 14,
            fontSize: 72,
            fontWeight: 900,
            color: EFFECT_THEME.textPrimary,
            textShadow: "0 0 18px rgba(91,231,255,0.2)",
          }}
        >
          它在讨好你
        </div>
        <div style={{ marginTop: 12, fontSize: 30, color: EFFECT_THEME.textSecondary }}>
          不是在帮你，而是在回你最想听的话。
        </div>
      </div>
    </div>
  );
};
