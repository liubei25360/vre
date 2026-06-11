import React from "react";
import { interpolate, spring, useCurrentFrame } from "remotion";
import { EFFECT_THEME, OverlayContrastField, SAFE_W, SAFE_X, SAFE_Y } from "../effect-system";

export const EFFECT_16_DURATION_FRAMES = 150;

const items = [
  "墨镜",
  "袜子",
  "文具",
  "T恤",
  "帽子",
  "贴纸",
  "钥匙扣",
  "水杯",
  "潮玩",
  "盲盒",
];
const removed = new Set([0, 1, 2, 3, 4, 5, 6]);

export const Effect16PopmartShelf: React.FC = () => {
  const frame = useCurrentFrame();
  const shelfIn = spring({ frame: frame - 4, fps: 30, config: { damping: 14, stiffness: 120 } });
  const lineX = interpolate(frame, [34, 82], [SAFE_X - 40, SAFE_X + 540], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const revenue = Math.round(interpolate(frame, [44, 120], [12, 38], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }));
  const keepIn = spring({ frame: frame - 90, fps: 30, config: { damping: 12, stiffness: 120 } });

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
      <OverlayContrastField top={190} centerY={790} width={900} height={1100} />

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
        <div>POP MART SHELF</div>
        <div style={{ color: EFFECT_THEME.accentCyan }}>CUT 70% / KEEP THE CORE</div>
      </div>

      <div
        style={{
          position: "absolute",
          left: SAFE_X + 20,
          top: SAFE_Y + 170,
          width: 560,
          height: 760,
          transform: `translateY(${(1 - shelfIn) * 50}px) scale(${0.92 + shelfIn * 0.08}) skewY(-8deg)`,
          transformOrigin: "left top",
          opacity: shelfIn,
        }}
      >
        {[0, 1].map((row) => (
          <div
            key={row}
            style={{
              position: "absolute",
              left: 0,
              top: row * 290 + 50,
              width: 540,
              height: 18,
              borderRadius: 999,
              background: "linear-gradient(90deg, rgba(91,231,255,0.42), rgba(47,123,255,0.18))",
              boxShadow: "0 0 18px rgba(91,231,255,0.18)",
            }}
          />
        ))}

        {items.map((item, i) => {
          const col = i % 5;
          const row = Math.floor(i / 5);
          const removeStart = 42 + i * 4;
          const vanish = removed.has(i)
            ? interpolate(frame, [removeStart, removeStart + 14], [1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })
            : 1;
          const isCore = i >= 8;
          return (
            <div
              key={item}
              style={{
                position: "absolute",
                left: 20 + col * 104,
                top: 4 + row * 290,
                width: 88,
                height: 122,
                borderRadius: 24,
                border: isCore
                  ? "1px solid rgba(255,179,106,0.36)"
                  : "1px solid rgba(91,231,255,0.2)",
                background: isCore
                  ? "linear-gradient(180deg, rgba(38,24,10,0.72), rgba(20,12,6,0.52))"
                  : "linear-gradient(180deg, rgba(8,18,32,0.72), rgba(6,14,26,0.5))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: isCore ? EFFECT_THEME.accentWarm : EFFECT_THEME.textSecondary,
                fontSize: 24,
                fontWeight: 700,
                opacity: vanish,
                transform: `translateY(${(1 - vanish) * 46}px) scale(${0.74 + vanish * 0.26})`,
                boxShadow: isCore ? "0 0 20px rgba(255,179,106,0.18)" : "0 0 14px rgba(91,231,255,0.12)",
              }}
            >
              {item}
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          left: lineX,
          top: SAFE_Y + 214,
          width: 8,
          height: 590,
          borderRadius: 999,
          background: "linear-gradient(180deg, rgba(255,122,107,0), rgba(255,122,107,0.95), rgba(255,122,107,0))",
          boxShadow: "0 0 20px rgba(255,122,107,0.3)",
        }}
      />

      <div
        style={{
          position: "absolute",
          right: SAFE_X,
          top: SAFE_Y + 180,
          width: 260,
          padding: "24px 26px",
          borderRadius: 30,
          border: "1px solid rgba(91,231,255,0.22)",
          background: "linear-gradient(180deg, rgba(8,18,32,0.74), rgba(6,14,26,0.5))",
        }}
      >
        <div style={{ fontSize: 16, color: EFFECT_THEME.textMuted, letterSpacing: 3 }}>REVENUE SHARE</div>
        <div style={{ marginTop: 10, fontSize: 76, fontWeight: 900, color: EFFECT_THEME.accentWarm }}>{revenue}%</div>
        <div style={{ marginTop: 12, color: EFFECT_THEME.textSecondary, fontSize: 24 }}>砍掉杂货，反而更赚钱</div>
        <div style={{ marginTop: 26, display: "grid", gap: 12 }}>
          {[0.42, 0.68, 0.92].map((v, i) => (
            <div key={i} style={{ height: 18, borderRadius: 999, background: "rgba(255,255,255,0.06)" }}>
              <div
                style={{
                  width: `${Math.round(v * revenue * 2.1)}%`,
                  height: "100%",
                  borderRadius: 999,
                  background: i === 2
                    ? "linear-gradient(90deg, rgba(91,231,255,0.88), rgba(255,179,106,0.96))"
                    : "linear-gradient(90deg, rgba(91,231,255,0.52), rgba(47,123,255,0.8))",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: SAFE_X + 10,
          top: SAFE_Y + 650,
          width: 280,
          height: 340,
          borderRadius: 34,
          border: "1px solid rgba(255,179,106,0.32)",
          background: "linear-gradient(180deg, rgba(38,24,10,0.74), rgba(16,10,6,0.44))",
          transform: `scale(${0.84 + keepIn * 0.16})`,
          opacity: keepIn,
          boxShadow: "0 0 28px rgba(255,179,106,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div style={{ color: EFFECT_THEME.textMuted, fontSize: 16, letterSpacing: 3 }}>ONLY KEEP</div>
        <div style={{ marginTop: 16, fontSize: 66, fontWeight: 900, color: EFFECT_THEME.accentWarm }}>潮玩</div>
        <div style={{ marginTop: 16, color: EFFECT_THEME.textSecondary, fontSize: 24 }}>删掉 70%，只保留独特性</div>
      </div>

      <div
        style={{
          position: "absolute",
          left: SAFE_X + 90,
          bottom: SAFE_Y + 132,
          width: SAFE_W - 180,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 86, fontWeight: 900, color: EFFECT_THEME.textPrimary, textShadow: "0 0 18px rgba(91,231,255,0.2)" }}>
          删掉赚钱的杂货
        </div>
        <div style={{ marginTop: 14, fontSize: 34, color: EFFECT_THEME.accentCyan }}>把注意力全部压到最独特的一类</div>
      </div>
    </div>
  );
};
