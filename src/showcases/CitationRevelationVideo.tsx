import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, interpolate, Sequence, Audio, staticFile } from "remotion";
import { GoldLineReveal } from "../../skills/gold-line-reveal/GoldLineReveal";
import { InsightTextDrop } from "../../skills/insight-text-drop/InsightTextDrop";

const BG = "#070708";
const GOLD = "#D4AF37";
const IVORY = "#F5F5F7";
const CHARCOAL = "#424245";

const citations = [
  "Patrick Lewis et al., 2020. Retrieval-Augmented Generation (NeurIPS 2020)",
  "CMU Machine Learning Blog, 2021. Document Grounded Generation",
  "Braunschweiler et al., 2023. Evaluating LLMs for Document-grounded Generation",
  "Rashkin et al., 2023. Measuring Attribution in NLG Models",
  "Gao et al., 2023. RARR: Researching and Revising What LMs Say",
  "Gao et al., 2023. Enabling LLMs to Generate Text with Citations",
];

const CitationItem: React.FC<{ text: string; index: number; frame: number }> = ({
  text, index, frame,
}) => {
  const stagger = index * 15;
  const localFrame = Math.max(0, frame - stagger);
  const s = spring({
    frame: localFrame,
    fps: 30,
    config: { damping: 15, mass: 0.3, stiffness: 80 },
    durationInFrames: 20,
  });
  const opacity = s;
  const translateY = interpolate(s, [0, 1], [-10, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: "1.8vw",
        fontWeight: 300,
        letterSpacing: "0.02em",
        color: CHARCOAL,
        marginBottom: "1.2vw",
      }}
    >
      {text}
    </div>
  );
};

const PhraseLine: React.FC<{
  frame: number;
  startAt: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ frame, startAt, children, style: extraStyle }) => {
  const localFrame = Math.max(0, frame - startAt);
  const s = spring({
    frame: localFrame,
    fps: 30,
    config: { damping: 14, mass: 0.4, stiffness: 80 },
    durationInFrames: 24,
  });
  const opacity = s;
  const translateY = interpolate(s, [0, 1], [12, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        fontFamily: "'Inter', system-ui, sans-serif",
        fontWeight: 300,
        letterSpacing: "0.04em",
        ...extraStyle,
      }}
    >
      {children}
    </div>
  );
};

const HighlightGold: React.FC<{ children: React.ReactNode; large?: boolean }> = ({
  children, large,
}) => (
  <span
    style={{
      color: GOLD,
      fontWeight: large ? 700 : 600,
      fontSize: large ? "3.6vw" : undefined,
    }}
  >
    {children}
  </span>
);

export const CitationRevelationVideo: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: BG,
        overflow: "hidden",
      }}
    >
      <Audio src={staticFile("ambient.wav")} />

      <Sequence from={0} durationInFrames={120}>
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "6vw 4vw 8vw",
            boxSizing: "border-box",
            gap: "0.3vw",
          }}
        >
          {citations.map((text, i) => (
            <CitationItem key={i} text={text} index={i} frame={frame} />
          ))}
        </AbsoluteFill>
      </Sequence>

      <Sequence from={115} durationInFrames={250}>
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "5vw",
            boxSizing: "border-box",
          }}
        >
          <Sequence from={5} durationInFrames={240}>
            <div style={{ width: "100%", maxWidth: "90%" }}>
              <GoldLineReveal
                startFrame={0}
                lineWidth="65%"
                lineColor={GOLD}
                glowColor={GOLD}
                durationInFrames={28}
                style={{ margin: "0 auto 2.5vw" }}
              />

              <div style={{ textAlign: "center", marginBottom: "1.2vw" }}>
                <div
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "4.8vw",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    color: IVORY,
                    marginBottom: "0.6vw",
                    textShadow: "0 0 30px rgba(212, 175, 55, 0.25)",
                  }}
                >
                  Document-Grounded
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: "4.4vw",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    color: IVORY,
                    lineHeight: 1,
                    textShadow: "0 0 30px rgba(212, 175, 55, 0.25)",
                  }}
                >
                  Generation
                </div>
              </div>

              <div
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  fontSize: "2.4vw",
                  fontWeight: 300,
                  color: GOLD,
                  textAlign: "center",
                  marginBottom: "3vw",
                  opacity: 0.7,
                  letterSpacing: "0.08em",
                }}
              >
                文档扎根生成
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1.8vw",
                  fontSize: "3vw",
                  color: IVORY,
                }}
              >
                <PhraseLine frame={frame} startAt={45}>
                  不是让AI凭空发挥 ——
                </PhraseLine>
                <PhraseLine frame={frame} startAt={65}>
                  而是把{" "}
                  <HighlightGold>专业书</HighlightGold>、<HighlightGold>业务数据</HighlightGold>{" "}
                  和 <HighlightGold>真实场景</HighlightGold>{" "}
                  一起喂进去
                </PhraseLine>
                <PhraseLine frame={frame} startAt={85}>
                  让AI<HighlightGold large>基于证据</HighlightGold>生成策略。
                </PhraseLine>
              </div>
            </div>
          </Sequence>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
