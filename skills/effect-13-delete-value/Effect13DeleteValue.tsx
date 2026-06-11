import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import {
  EFFECT_THEME,
  OverlayContrastField,
  SAFE_H,
  SAFE_W,
  SAFE_X,
  SAFE_Y,
} from "../effect-system";

export const EFFECT_13_DURATION_FRAMES = 150;

const FLOOD_WORDS = [
  "爆款公式",
  "万能提示词",
  "行业洞察",
  "商业案例",
  "写作框架",
  "流量秘籍",
  "AI 副业",
  "知识卡片",
  "教程模板",
  "标题公式",
  "热点拆解",
  "趋势结论",
  "课程大纲",
  "模型推荐",
  "创作 SOP",
  "日报摘要",
  "速成方案",
  "定位分析",
  "私域打法",
  "增长飞轮",
  "选题池",
  "人群画像",
  "会议纪要",
  "内容复盘",
];

const columns = [SAFE_X + 16, SAFE_X + 222, SAFE_X + 428, SAFE_X + 634];
const rows = [SAFE_Y + 40, SAFE_Y + 138, SAFE_Y + 236, SAFE_Y + 334, SAFE_Y + 432, SAFE_Y + 530];

export const Effect13DeleteValue: React.FC = () => {
  const frame = useCurrentFrame();
  const floodProgress = interpolate(frame, [0, 82], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const keySpring = spring({ frame: frame - 20, fps: 30, config: { damping: 12, stiffness: 120 } });
  const numberProgress = interpolate(frame, [24, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const finalReveal = spring({ frame: frame - 104, fps: 30, config: { damping: 14, stiffness: 130 } });
  const deleteValue = Math.round(interpolate(numberProgress, [0, 1], [120, 12800]));
  const fillWidth = interpolate(numberProgress, [0, 1], [70, 310]);

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
      <OverlayContrastField top={220} centerY={860} width={860} height={1060} />

      <div
        style={{
          position: "absolute",
          left: SAFE_X,
          top: SAFE_Y,
          width: SAFE_W,
          height: 64,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 5, color: EFFECT_THEME.textMuted }}>CONTENT FLOOD</div>
        <div style={{ fontSize: 20, color: EFFECT_THEME.accentCyan, letterSpacing: 2 }}>DELETE VALUE</div>
      </div>

      {FLOOD_WORDS.map((word, i) => {
        const col = i % 4;
        const row = Math.floor(i / 4);
        const appear = interpolate(frame, [i * 2, i * 2 + 18], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const glow = i % 5 === 0 ? EFFECT_THEME.accentWarm : EFFECT_THEME.accentBlue;
        return (
          <div
            key={word}
            style={{
              position: "absolute",
              left: columns[col],
              top: interpolate(appear, [0, 1], [rows[row] - 110 - row * 14, rows[row]]),
              width: 170,
              height: 62,
              padding: "0 18px",
              borderRadius: 20,
              border: `1px solid rgba(91,231,255,${0.12 + 0.18 * appear})`,
              background: "linear-gradient(180deg, rgba(8,18,32,0.74), rgba(6,14,26,0.44))",
              boxShadow: `0 0 24px ${glow}18, inset 0 0 18px rgba(255,255,255,0.03)`,
              display: "flex",
              alignItems: "center",
              color: EFFECT_THEME.textSecondary,
              fontSize: 24,
              transform: `translateY(${(1 - appear) * -20}px) scale(${0.92 + appear * 0.08})`,
              opacity: 0.18 + appear * 0.82,
            }}
          >
            {word}
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: SAFE_X + 36,
          top: SAFE_Y + 930,
          width: 332,
          height: 210,
          borderRadius: 34,
          border: `1px solid rgba(91,231,255,${0.18 + numberProgress * 0.36})`,
          background: `linear-gradient(180deg, rgba(10,24,42,0.78), rgba(6,14,26,0.56))`,
          boxShadow: `0 0 42px rgba(47,123,255,0.22), 0 0 88px rgba(255,179,106,${0.06 + numberProgress * 0.12})`,
          transform: `scale(${0.86 + keySpring * 0.14})`,
          opacity: 0.6 + keySpring * 0.4,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 34,
            background: `radial-gradient(circle at 50% 12%, rgba(91,231,255,0.16), transparent 54%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 28,
            top: 28,
            fontSize: 18,
            color: EFFECT_THEME.textMuted,
            letterSpacing: 3,
          }}
        >
          CORE TOOL
        </div>
        <div
          style={{
            position: "absolute",
            left: 30,
            top: 72,
            fontSize: 66,
            fontWeight: 800,
            color: numberProgress > 0.72 ? EFFECT_THEME.accentWarm : EFFECT_THEME.textPrimary,
            textShadow:
              numberProgress > 0.72
                ? "0 0 18px rgba(255,179,106,0.38), 0 0 52px rgba(255,179,106,0.18)"
                : "0 0 18px rgba(91,231,255,0.18)",
            letterSpacing: 2,
          }}
        >
          Delete
        </div>
        <div
          style={{
            position: "absolute",
            left: 30,
            bottom: 28,
            width: 270,
            height: 12,
            borderRadius: 999,
            background: "rgba(255,255,255,0.08)",
          }}
        >
          <div
            style={{
              width: fillWidth,
              height: "100%",
              borderRadius: 999,
              background: "linear-gradient(90deg, rgba(91,231,255,0.9), rgba(255,179,106,0.95))",
              boxShadow: "0 0 18px rgba(91,231,255,0.3), 0 0 28px rgba(255,179,106,0.24)",
            }}
          />
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: SAFE_X + 24,
          top: SAFE_Y + 930,
          width: 360,
          height: 228,
          borderRadius: 30,
          border: "1px solid rgba(91,231,255,0.22)",
          background: "linear-gradient(180deg, rgba(8,18,32,0.7), rgba(6,14,26,0.46))",
          padding: 28,
          boxSizing: "border-box",
        }}
      >
        <div style={{ color: EFFECT_THEME.textMuted, fontSize: 18, letterSpacing: 3 }}>MARKET PRICE</div>
        <div
          style={{
            marginTop: 18,
            color: EFFECT_THEME.accentWarm,
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 1,
            textShadow: "0 0 20px rgba(255,179,106,0.35), 0 0 56px rgba(255,179,106,0.16)",
          }}
        >
          {deleteValue.toLocaleString()}
        </div>
        <div style={{ marginTop: 14, fontSize: 24, color: EFFECT_THEME.textSecondary }}>内容越便宜，删除越值钱</div>
        <div
          style={{
            marginTop: 26,
            width: 100,
            height: 100,
            borderRadius: "50%",
            border: "1px solid rgba(91,231,255,0.16)",
            boxShadow: "inset 0 0 28px rgba(91,231,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: EFFECT_THEME.accentCyan,
            fontSize: 24,
          }}
        >
          +{Math.round(numberProgress * 97)}%
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: SAFE_X + 84,
          right: SAFE_X + 84,
          bottom: SAFE_Y + 148,
          textAlign: "center",
          transform: `scale(${0.74 + finalReveal * 0.26})`,
          opacity: finalReveal,
        }}
      >
        <div
          style={{
            fontSize: 104,
            fontWeight: 900,
            color: EFFECT_THEME.textPrimary,
            letterSpacing: 2,
            textShadow: "0 0 18px rgba(91,231,255,0.18), 0 0 42px rgba(47,123,255,0.16)",
          }}
        >
          删除键升值
        </div>
        <div style={{ marginTop: 16, color: EFFECT_THEME.accentCyan, fontSize: 26, letterSpacing: 3 }}>
          THE FILTER BECOMES THE PRODUCT
        </div>
      </div>
    </div>
  );
};
