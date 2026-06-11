import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { EFFECT_THEME, OverlayContrastField, SAFE_W, SAFE_X, SAFE_Y } from "../effect-system";

export const EFFECT_15_DURATION_FRAMES = 165;

const genericLine = "标准答案";

export const Effect15BarnumGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const zoomOut = interpolate(frame, [0, 60], [1.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const gridOpacity = interpolate(frame, [0, 22, 52], [0.12, 0.5, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const counter = Math.round(interpolate(frame, [36, 100], [1, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }));
  const bubbleIn = spring({ frame: frame - 82, fps: 30, config: { damping: 14, stiffness: 130 } });
  const footerIn = spring({ frame: frame - 108, fps: 30, config: { damping: 12, stiffness: 120 } });

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
      <OverlayContrastField top={160} centerY={720} width={920} height={1140} />

      <div
        style={{
          position: "absolute",
          left: SAFE_X,
          top: SAFE_Y,
          width: SAFE_W,
          display: "flex",
          justifyContent: "space-between",
          color: EFFECT_THEME.textMuted,
          fontSize: 20,
          letterSpacing: 3,
        }}
      >
        <div>BARNUM SCALE</div>
        <div style={{ color: EFFECT_THEME.accentCyan }}>SAME ANSWER / MASS AUDIENCE</div>
      </div>

      <div
        style={{
          position: "absolute",
          left: SAFE_X + 36,
          top: SAFE_Y + 110,
          width: 280,
          padding: "22px 26px",
          borderRadius: 28,
          background: "linear-gradient(180deg, rgba(8,18,32,0.78), rgba(6,14,26,0.54))",
          border: "1px solid rgba(91,231,255,0.22)",
        }}
      >
        <div style={{ color: EFFECT_THEME.textMuted, fontSize: 16, letterSpacing: 3 }}>MATCH RATE</div>
        <div style={{ marginTop: 10, fontSize: 82, lineHeight: 1, fontWeight: 900, color: EFFECT_THEME.accentWarm }}>
          {counter}
        </div>
        <div style={{ marginTop: 8, color: EFFECT_THEME.textSecondary, fontSize: 26 }}>个相同答案</div>
      </div>

      <div
        style={{
          position: "absolute",
          left: SAFE_X + 60,
          top: SAFE_Y + 370,
          width: 792,
          height: 760,
          transform: `scale(${zoomOut})`,
          transformOrigin: "50% 28%",
          opacity: gridOpacity,
        }}
      >
        {Array.from({ length: 100 }).map((_, i) => {
          const col = i % 10;
          const row = Math.floor(i / 10);
          const x = col * 76;
          const y = row * 66;
          const tagOpacity = interpolate(frame, [28 + row * 2, 48 + row * 2], [0, 0.72], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div key={i} style={{ position: "absolute", left: x, top: y, width: 52, height: 74 }}>
              <div
                style={{
                  position: "absolute",
                  left: 13,
                  top: 0,
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  border: "1px solid rgba(91,231,255,0.18)",
                  background: "rgba(10,24,42,0.54)",
                  boxShadow: i === 44 ? "0 0 20px rgba(255,179,106,0.3)" : "0 0 12px rgba(91,231,255,0.12)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 8,
                  top: 24,
                  width: 36,
                  height: 46,
                  borderRadius: 12,
                  border: "1px solid rgba(91,231,255,0.16)",
                  background: i === 44 ? "rgba(255,179,106,0.14)" : "rgba(8,18,32,0.58)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: -8,
                  top: -26,
                  width: 68,
                  height: 18,
                  borderRadius: 999,
                  border: "1px solid rgba(91,231,255,0.12)",
                  background: "rgba(8,18,32,0.46)",
                  color: EFFECT_THEME.textMuted,
                  fontSize: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: tagOpacity,
                }}
              >
                {genericLine}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          left: SAFE_X + 140,
          top: SAFE_Y + 1130,
          width: 640,
          padding: "22px 28px",
          borderRadius: 28,
          background: "linear-gradient(180deg, rgba(36,22,8,0.78), rgba(24,14,8,0.48))",
          border: "1px solid rgba(255,179,106,0.26)",
          transform: `scale(${0.84 + bubbleIn * 0.16})`,
          opacity: bubbleIn,
          boxShadow: "0 0 26px rgba(255,179,106,0.18)",
        }}
      >
        <div style={{ color: EFFECT_THEME.accentWarm, fontSize: 16, letterSpacing: 3 }}>FORTUNE COOKIE</div>
        <div style={{ marginTop: 12, fontSize: 40, lineHeight: 1.35, color: EFFECT_THEME.textPrimary, fontWeight: 700 }}>
          你外表坚强，内心脆弱。
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: SAFE_X + 70,
          right: SAFE_X + 70,
          bottom: SAFE_Y + 140,
          textAlign: "center",
          transform: `scale(${0.86 + footerIn * 0.14})`,
          opacity: footerIn,
        }}
      >
        <div style={{ color: EFFECT_THEME.textPrimary, fontSize: 82, fontWeight: 900, textShadow: "0 0 18px rgba(91,231,255,0.2)" }}>
          一亿个普通人
        </div>
        <div style={{ marginTop: 14, fontSize: 34, color: EFFECT_THEME.accentCyan, letterSpacing: 2 }}>
          同一套答案，发给了所有人
        </div>
      </div>
    </div>
  );
};
