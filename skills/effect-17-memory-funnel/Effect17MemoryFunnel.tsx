import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { EFFECT_THEME, OverlayContrastField, SAFE_W, SAFE_X, SAFE_Y } from "../effect-system";

export const EFFECT_17_DURATION_FRAMES = 210;

const noiseWords = [
  "Prompt Engineering",
  "用户画像",
  "副业建议",
  "长期主义",
  "内容矩阵",
  "模型微调",
  "品牌叙事",
  "效率提升",
  "方法模板",
  "增长黑客",
  "表达结构",
  "信息增量",
];
const funnelLabels = ["换个人成立吗？", "换个项目成立吗？", "换个结果成立吗？"];

export const Effect17MemoryFunnel: React.FC = () => {
  const frame = useCurrentFrame();
  const blink = interpolate(frame, [24, 46, 58], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const memoryIn = spring({ frame: frame - 54, fps: 30, config: { damping: 12, stiffness: 120 } });
  const funnelIn = spring({ frame: frame - 78, fps: 30, config: { damping: 14, stiffness: 120 } });
  const finalIn = spring({ frame: frame - 146, fps: 30, config: { damping: 12, stiffness: 120 } });

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
      <OverlayContrastField top={160} centerY={820} width={920} height={1180} />

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
        <div>MEMORY FILTER</div>
        <div style={{ color: EFFECT_THEME.accentCyan }}>3 QUESTIONS FUNNEL</div>
      </div>

      {noiseWords.map((word, i) => {
        const x = SAFE_X + 30 + (i % 3) * 280;
        const y = SAFE_Y + 120 + Math.floor(i / 3) * 96;
        const fade = interpolate(frame, [0, 40, 64], [0.18, 0.82, 0.08], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={word}
            style={{
              position: "absolute",
              left: x,
              top: y,
              padding: "14px 18px",
              borderRadius: 999,
              border: "1px solid rgba(91,231,255,0.12)",
              background: "rgba(8,18,32,0.46)",
              color: EFFECT_THEME.textMuted,
              fontSize: 26,
              opacity: fade,
              transform: `translateY(${frame * 0.24}px)`,
            }}
          >
            {word}
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: SAFE_X + 110,
          top: SAFE_Y + 350,
          width: SAFE_W - 220,
          height: 220,
          overflow: "hidden",
          borderRadius: 999,
          opacity: blink > 0.02 ? 1 : 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: interpolate(blink, [0, 1], [-120, 0]),
            height: 104,
            borderRadius: 999,
            background: "linear-gradient(180deg, rgba(6,14,26,0.96), rgba(6,14,26,0.54))",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: interpolate(blink, [0, 1], [-120, 0]),
            height: 104,
            borderRadius: 999,
            background: "linear-gradient(180deg, rgba(6,14,26,0.54), rgba(6,14,26,0.96))",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          left: SAFE_X + 80,
          top: SAFE_Y + 610,
          width: SAFE_W - 160,
          padding: "22px 28px",
          borderRadius: 28,
          border: "1px solid rgba(91,231,255,0.22)",
          background: "linear-gradient(180deg, rgba(8,18,32,0.76), rgba(6,14,26,0.5))",
          opacity: memoryIn,
          transform: `scale(${0.88 + memoryIn * 0.12})`,
        }}
      >
        <div style={{ color: EFFECT_THEME.textMuted, fontSize: 16, letterSpacing: 3 }}>MEMORY LEFT</div>
        <div style={{ marginTop: 12, fontSize: 48, lineHeight: 1.34, color: EFFECT_THEME.textPrimary, fontWeight: 800 }}>
          能记住的，才是核心。
        </div>
        <div style={{ marginTop: 10, fontSize: 28, color: EFFECT_THEME.accentWarm }}>忘掉的大部分，都是平均垃圾。</div>
      </div>

      <div
        style={{
          position: "absolute",
          left: SAFE_X + 96,
          top: SAFE_Y + 930,
          width: SAFE_W - 192,
          height: 360,
          opacity: funnelIn,
          transform: `translateY(${(1 - funnelIn) * 36}px)`,
        }}
      >
        {funnelLabels.map((label, i) => {
          const keep = i === 2;
          return (
            <div
              key={label}
              style={{
                position: "absolute",
                left: i * 12,
                right: i * 12,
                top: i * 96,
                height: 94,
                borderRadius: 26,
                border: keep ? "1px solid rgba(255,179,106,0.3)" : "1px solid rgba(91,231,255,0.2)",
                background: keep
                  ? "linear-gradient(180deg, rgba(36,22,8,0.72), rgba(18,10,6,0.44))"
                  : "linear-gradient(180deg, rgba(8,18,32,0.72), rgba(6,14,26,0.44))",
                clipPath: `polygon(${8 + i * 6}% 0%, ${92 - i * 6}% 0%, ${84 - i * 6}% 100%, ${16 + i * 6}% 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 46px",
                boxSizing: "border-box",
              }}
            >
              <div style={{ color: keep ? EFFECT_THEME.accentWarm : EFFECT_THEME.textPrimary, fontSize: 30, fontWeight: 700 }}>
                {label}
              </div>
              <div style={{ color: keep ? EFFECT_THEME.accentWarm : EFFECT_THEME.accentDanger, fontSize: 34, fontWeight: 800 }}>
                {keep ? "KEEP" : "DROP"}
              </div>
            </div>
          );
        })}

        {Array.from({ length: 4 }).map((_, i) => {
          const flowY = interpolate(frame, [92 + i * 10, 150 + i * 10], [6, 278], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const survivor = i === 3;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 180 + i * 120,
                top: flowY,
                padding: "10px 18px",
                borderRadius: 999,
                border: survivor ? "1px solid rgba(255,179,106,0.26)" : "1px solid rgba(91,231,255,0.16)",
                background: survivor ? "rgba(36,22,8,0.6)" : "rgba(8,18,32,0.54)",
                color: survivor ? EFFECT_THEME.accentWarm : EFFECT_THEME.textSecondary,
                fontSize: 20,
                opacity: survivor ? 1 : interpolate(frame, [120 + i * 10, 150 + i * 10], [1, 0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              {survivor ? "针对当前项目的一个动作" : "通用废话"}
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          left: SAFE_X + 86,
          right: SAFE_X + 86,
          bottom: SAFE_Y + 118,
          padding: "22px 30px",
          borderRadius: 30,
          border: "1px solid rgba(255,179,106,0.28)",
          background: "linear-gradient(180deg, rgba(36,22,8,0.74), rgba(18,10,6,0.42))",
          opacity: finalIn,
          transform: `scale(${0.86 + finalIn * 0.14})`,
          textAlign: "center",
        }}
      >
        <div style={{ color: EFFECT_THEME.textMuted, fontSize: 16, letterSpacing: 3 }}>SCREENSHOT TOOL</div>
        <div style={{ marginTop: 12, fontSize: 56, fontWeight: 900, color: EFFECT_THEME.textPrimary }}>
          闭眼记住，再过三问漏斗
        </div>
        <div style={{ marginTop: 12, fontSize: 28, color: EFFECT_THEME.accentWarm }}>最后留下的，才值得执行。</div>
      </div>
    </div>
  );
};
