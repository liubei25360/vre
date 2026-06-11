import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { EFFECT_THEME, OverlayContrastField, SAFE_H, SAFE_W, SAFE_X, SAFE_Y } from "../effect-system";

export const EFFECT_18_DURATION_FRAMES = 240;

const FILTER_QUESTIONS = ["换个人成立吗？", "换场景成立吗？", "换结果成立吗？"];
const BAD_PHRASES = ["持续学习", "核心竞争力", "长期主义", "提升能力"];
const SPECIFIC_ACTION = "只保留一条：针对你本周的真实项目，删掉 50% 套话，留下一个可执行动作。";

export const Effect18AntiBarnumFilter: React.FC = () => {
  const frame = useCurrentFrame();
  const gridReveal = interpolate(frame, [0, 48], [0.1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const zoomOut = interpolate(frame, [0, 56], [1.65, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const quoteIn = spring({ frame: frame - 62, fps: 30, config: { damping: 14, stiffness: 120 } });
  const filterIn = spring({ frame: frame - 38, fps: 30, config: { damping: 14, stiffness: 110 } });
  const resultIn = spring({ frame: frame - 174, fps: 30, config: { damping: 12, stiffness: 120 } });
  const targetOpacity = interpolate(frame, [126, 152, 168], [1, 0.5, 0.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scanBeam = interpolate(frame, [114, 170], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
      <OverlayContrastField top={160} centerY={820} width={924} height={1220} />

      <div
        style={{
          position: "absolute",
          left: SAFE_X,
          top: SAFE_Y,
          width: SAFE_W,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: EFFECT_THEME.textMuted,
          fontSize: 20,
          letterSpacing: 3,
        }}
      >
        <div>ANTI BARNUM FILTER</div>
        <div style={{ color: EFFECT_THEME.accentCyan }}>HUD DECISION TOOL</div>
      </div>

      <div
        style={{
          position: "absolute",
          left: SAFE_X + 36,
          top: SAFE_Y + 92,
          width: 260,
          padding: "22px 24px",
          borderRadius: 28,
          background: "linear-gradient(180deg, rgba(8,18,32,0.76), rgba(6,14,26,0.52))",
          border: "1px solid rgba(91,231,255,0.22)",
          opacity: gridReveal,
        }}
      >
        <div style={{ fontSize: 16, color: EFFECT_THEME.textMuted, letterSpacing: 3 }}>MASS MATCH</div>
        <div style={{ marginTop: 10, fontSize: 82, lineHeight: 1, fontWeight: 900, color: EFFECT_THEME.accentWarm }}>
          {Math.round(interpolate(frame, [22, 90], [1, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }))}
        </div>
        <div style={{ marginTop: 8, fontSize: 24, color: EFFECT_THEME.textSecondary }}>人收到同一句</div>
      </div>

      <div
        style={{
          position: "absolute",
          left: SAFE_X + 56,
          top: SAFE_Y + 290,
          width: 800,
          height: 520,
          transform: `scale(${zoomOut})`,
          transformOrigin: "50% 18%",
          opacity: gridReveal,
        }}
      >
        {Array.from({ length: 100 }).map((_, i) => {
          const col = i % 10;
          const row = Math.floor(i / 10);
          const x = col * 76;
          const y = row * 48;
          const tag = interpolate(frame, [18 + row * 2, 44 + row * 2], [0, 0.72], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div key={i} style={{ position: "absolute", left: x, top: y, width: 52, height: 56 }}>
              <div
                style={{
                  position: "absolute",
                  left: 14,
                  top: 0,
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: i === 44 ? "rgba(255,179,106,0.18)" : "rgba(8,18,32,0.62)",
                  border: "1px solid rgba(91,231,255,0.16)",
                  boxShadow: i === 44 ? "0 0 20px rgba(255,179,106,0.28)" : "0 0 10px rgba(91,231,255,0.12)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 8,
                  top: 20,
                  width: 36,
                  height: 32,
                  borderRadius: 12,
                  background: i === 44 ? "rgba(255,179,106,0.14)" : "rgba(8,18,32,0.56)",
                  border: "1px solid rgba(91,231,255,0.14)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: -12,
                  top: -22,
                  width: 76,
                  height: 18,
                  borderRadius: 999,
                  background: "rgba(8,18,32,0.46)",
                  border: "1px solid rgba(91,231,255,0.1)",
                  color: EFFECT_THEME.textMuted,
                  fontSize: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: tag,
                }}
              >
                标准答案
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          left: SAFE_X + 32,
          top: SAFE_Y + 838,
          width: 440,
          padding: "22px 28px",
          borderRadius: 28,
          background: "linear-gradient(180deg, rgba(36,22,8,0.78), rgba(24,14,8,0.44))",
          border: "1px solid rgba(255,179,106,0.28)",
          transform: `scale(${0.84 + quoteIn * 0.16})`,
          opacity: quoteIn,
          boxShadow: "0 0 22px rgba(255,179,106,0.16)",
        }}
      >
        <div style={{ color: EFFECT_THEME.accentWarm, fontSize: 16, letterSpacing: 3 }}>BARNUM SAMPLE</div>
        <div style={{ marginTop: 12, fontSize: 34, lineHeight: 1.34, color: EFFECT_THEME.textPrimary, fontWeight: 800 }}>
          职场新人要持续学习，提升核心竞争力。
        </div>
      </div>

      {BAD_PHRASES.map((word, i) => {
        const show = spring({ frame: frame - 88 - i * 5, fps: 30, config: { damping: 12, stiffness: 120 } });
        return (
          <div
            key={word}
            style={{
              position: "absolute",
              left: SAFE_X + 18 + (i % 2) * 184,
              top: SAFE_Y + 1032 + Math.floor(i / 2) * 58,
              padding: "12px 18px",
              borderRadius: 999,
              background: "linear-gradient(180deg, rgba(45,12,18,0.46), rgba(20,8,12,0.22))",
              border: "1px solid rgba(255,122,107,0.24)",
              color: EFFECT_THEME.accentDanger,
              fontSize: 22,
              fontWeight: 700,
              opacity: show,
              transform: `scale(${0.82 + show * 0.18})`,
            }}
          >
            {word}
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: SAFE_X + 466,
          top: SAFE_Y + 884,
          width: 360,
          opacity: filterIn,
          transform: `translateY(${(1 - filterIn) * 36}px)`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
            padding: "0 8px",
          }}
        >
          <div style={{ color: EFFECT_THEME.textMuted, fontSize: 14, letterSpacing: 3 }}>FILTER SCAN</div>
          <div style={{ color: EFFECT_THEME.accentCyan, fontSize: 14, letterSpacing: 2 }}>IF ANY YES / DELETE</div>
        </div>

        {FILTER_QUESTIONS.map((question, i) => {
          const keep = i === 2;
          return (
            <div
              key={question}
              style={{
                marginBottom: 16,
                padding: "18px 22px",
                borderRadius: 22,
                background: keep
                  ? "linear-gradient(180deg, rgba(36,22,8,0.72), rgba(18,10,6,0.42))"
                  : "linear-gradient(180deg, rgba(8,18,32,0.72), rgba(6,14,26,0.42))",
                border: keep ? "1px solid rgba(255,179,106,0.28)" : "1px solid rgba(91,231,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
              }}
            >
              <div
                style={{
                  color: keep ? EFFECT_THEME.accentWarm : EFFECT_THEME.textPrimary,
                  fontSize: 26,
                  fontWeight: 700,
                }}
              >
                {question}
              </div>
              <div
                style={{
                  color: keep ? EFFECT_THEME.accentWarm : EFFECT_THEME.accentDanger,
                  fontSize: 24,
                  fontWeight: 800,
                  letterSpacing: 2,
                  padding: "8px 18px",
                  borderRadius: 999,
                  border: keep ? "1px solid rgba(255,179,106,0.26)" : "1px solid rgba(255,122,107,0.26)",
                  background: keep ? "rgba(36,22,8,0.38)" : "rgba(45,12,18,0.3)",
                  flexShrink: 0,
                }}
              >
                {keep ? "KEEP" : "DELETE"}
              </div>
            </div>
          );
        })}

        <div
          style={{
            marginTop: 8,
            padding: "16px 22px",
            borderRadius: 18,
            background: "rgba(8,18,32,0.56)",
            border: "1px solid rgba(91,231,255,0.16)",
            color: EFFECT_THEME.textSecondary,
            fontSize: 20,
            lineHeight: 1.4,
            textAlign: "center",
            opacity: targetOpacity,
            textDecoration: targetOpacity < 0.3 ? "line-through" : "none",
            textDecorationColor: EFFECT_THEME.accentDanger,
            textDecorationThickness: 4,
          }}
        >
          职场新人要持续学习，提升核心竞争力。
        </div>

        <div
          style={{
            marginTop: 16,
            padding: "18px 22px",
            borderRadius: 22,
            background: "linear-gradient(180deg, rgba(36,22,8,0.72), rgba(18,10,6,0.42))",
            border: "1px solid rgba(255,179,106,0.28)",
            transform: `scale(${0.86 + resultIn * 0.14})`,
            opacity: resultIn,
          }}
        >
          <div style={{ color: EFFECT_THEME.textMuted, fontSize: 13, letterSpacing: 3 }}>SPECIFIC OUTPUT</div>
          <div
            style={{
              marginTop: 10,
              color: EFFECT_THEME.textPrimary,
              fontSize: 22,
              lineHeight: 1.45,
              fontWeight: 700,
            }}
          >
            {SPECIFIC_ACTION}
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: SAFE_X + 40,
          right: SAFE_X + 40,
          bottom: SAFE_Y + 84,
          padding: "24px 30px",
          borderRadius: 30,
          background: "linear-gradient(180deg, rgba(10,24,42,0.8), rgba(6,14,26,0.5))",
          border: "1px solid rgba(91,231,255,0.24)",
          transform: `scale(${0.86 + resultIn * 0.14})`,
          opacity: resultIn,
          textAlign: "center",
        }}
      >
        <div style={{ color: EFFECT_THEME.textMuted, fontSize: 16, letterSpacing: 3 }}>FILTER RESULT</div>
        <div style={{ marginTop: 12, fontSize: 54, fontWeight: 900, color: EFFECT_THEME.textPrimary, textShadow: "0 0 18px rgba(91,231,255,0.18)" }}>
          只留下具体动作
        </div>
        <div style={{ marginTop: 12, fontSize: 26, color: EFFECT_THEME.accentWarm }}>
          反巴纳姆过滤器：筛掉人人都适用的废话
        </div>
      </div>
    </div>
  );
};
