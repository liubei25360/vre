import React from "react";
import { useCurrentFrame, spring, interpolate, Sequence } from "remotion";

const GOLD = "#D4AF37";
const IVORY = "#F5F5F7";
const CITATION_COLOR = "rgba(245, 245, 247, 0.58)";
const GOLD_GLOW = "rgba(212, 175, 55, 0.48)";

const citations = [
  "Patrick Lewis et al., 2020. Retrieval-Augmented Generation (NeurIPS 2020)",
  "CMU Machine Learning Blog, 2021. Document Grounded Generation",
  "Braunschweiler et al., 2023. Evaluating LLMs for Document-grounded Generation",
  "Rashkin et al., 2023. Measuring Attribution in NLG Models",
  "Gao et al., 2023. RARR: Researching and Revising What LMs Say",
  "Gao et al., 2023. Enabling LLMs to Generate Text with Citations",
];

const CitationWaterfall: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <div
      style={{
        position: "absolute",
        top: "8%",
        left: "8.5%",
        right: "8.5%",
        display: "flex",
        flexDirection: "column",
        gap: "clamp(7px, 1.6vw, 12px)",
        zIndex: 4,
        opacity: frame > 90 ? interpolate(frame, [90, 120], [1, 0.16]) : 1,
        filter: frame > 90
          ? `blur(${interpolate(frame, [90, 120], [0, 12])}px)`
          : "none",
        transform:
          frame > 90
            ? `translateY(${interpolate(frame, [90, 120], [0, 78])}px) scale(${interpolate(frame, [90, 120], [1, 0.93])})`
            : "none",
      }}
    >
      {citations.map((text, i) => {
        const delay = i * 15;
        const localFrame = Math.max(0, frame - delay);
        const s = spring({
          frame: localFrame,
          fps: 30,
          config: { damping: 16, mass: 0.35, stiffness: 90 },
          durationInFrames: 18,
        });
        return (
          <p
            key={i}
            style={{
              margin: 0,
              color: CITATION_COLOR,
              fontSize: "clamp(9px, 2.08vw, 14px)",
              lineHeight: 1.48,
              letterSpacing: "0.055em",
              fontWeight: 300,
              opacity: s,
              transform: `translateY(${interpolate(s, [0, 1], [-10, 0])}px)`,
              filter: s < 1 ? `blur(${interpolate(s, [0, 1], [6, 0])}px)` : "none",
              textShadow: "0 0 18px rgba(245, 245, 247, 0.04)",
            }}
          >
            {text}
          </p>
        );
      })}
    </div>
  );
};

const GoldLineReveal: React.FC = () => {
  const frame = useCurrentFrame();

  const s = spring({
    frame,
    fps: 30,
    config: { damping: 14, mass: 0.5, stiffness: 70 },
    durationInFrames: 28,
  });

  return (
    <div
      style={{
        width: "58%",
        height: "1px",
        background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
        margin: "0 auto clamp(24px, 5.4vw, 42px)",
        transform: `scaleX(${Math.max(0.001, s)})`,
        opacity: interpolate(s, [0, 0.2, 1], [0, 1, 1]),
        filter: s > 0.3
          ? `drop-shadow(0 0 12px ${GOLD_GLOW})`
          : "none",
      }}
    />
  );
};

const TitleBlock: React.FC = () => {
  const frame = useCurrentFrame();
  const delay = 5;
  const localFrame = Math.max(0, frame - delay);
  const s = spring({
    frame: localFrame,
    fps: 30,
    config: { damping: 12, mass: 0.5, stiffness: 60 },
    durationInFrames: 36,
  });

  return (
    <div
      style={{
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [13, 0])}px) scale(${interpolate(s, [0, 1], [0.985, 1])})`,
        filter: s < 1 ? `blur(${interpolate(s, [0, 0.4, 1], [10, 3, 0])}px)` : "none",
        textAlign: "center",
        marginBottom: "clamp(10px, 2.3vw, 18px)",
      }}
    >
      <h1
        style={{
          margin: 0,
          color: IVORY,
          fontSize: "clamp(27px, 7.25vw, 54px)",
          lineHeight: 0.96,
          fontWeight: 650,
          letterSpacing: "-0.065em",
          textShadow: [
            "0 0 28px rgba(245, 245, 247, 0.11)",
            "0 0 46px rgba(212, 175, 55, 0.09)",
          ].join(", "),
        }}
      >
        Document-Grounded
        <br />
        Generation
      </h1>
    </div>
  );
};

const Subtitle: React.FC = () => {
  const frame = useCurrentFrame();
  const delay = 10;
  const localFrame = Math.max(0, frame - delay);
  const s = spring({
    frame: localFrame,
    fps: 30,
    config: { damping: 14, mass: 0.4, stiffness: 70 },
    durationInFrames: 20,
  });

  return (
    <p
      style={{
        margin: 0,
        marginBottom: "clamp(50px, 10vw, 78px)",
        color: GOLD,
        fontSize: "clamp(14px, 3.6vw, 26px)",
        fontWeight: 400,
        letterSpacing: "0.2em",
        paddingLeft: "0.2em",
        textAlign: "center",
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [8, 0])}px)`,
        filter: s < 1 ? `blur(${interpolate(s, [0, 0.5, 1], [4, 1, 0])}px)` : "none",
        textShadow: `0 0 26px rgba(212, 175, 55, 0.28)`,
      }}
    >
      文档扎根生成
    </p>
  );
};

const ThoughtLine: React.FC<{
  delayFrames: number;
  lineHeight?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ delayFrames, lineHeight = "1.42", style: extraStyle, children }) => {
  const frame = useCurrentFrame();
  const localFrame = Math.max(0, frame - delayFrames);
  const s = spring({
    frame: localFrame,
    fps: 30,
    config: { damping: 13, mass: 0.45, stiffness: 70 },
    durationInFrames: 24,
  });

  const clipRight = interpolate(s, [0, 1], [100, 0]);

  return (
    <p
      style={{
        margin: 0,
        color: IVORY,
        fontSize: "clamp(18px, 4.55vw, 35px)",
        lineHeight,
        fontWeight: 430,
        letterSpacing: "-0.035em",
        opacity: interpolate(s, [0, 0.25, 1], [0, 1, 1]),
        transform: `translateY(${interpolate(s, [0, 1], [18, 0])}px)`,
        clipPath: `inset(0 ${clipRight}% 0 0)`,
        filter: s < 1 ? `blur(${interpolate(s, [0, 0.5, 1], [7, 2, 0])}px)` : "none",
        textAlign: "left",
        ...extraStyle,
      }}
    >
      {children}
    </p>
  );
};

const RevelationStage: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 8.6%",
        zIndex: 5,
      }}
    >
      <GoldLineReveal />
      <TitleBlock />
      <Subtitle />

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(17px, 3.1vw, 25px)",
        }}
      >
        <ThoughtLine delayFrames={0}>
          不是让AI凭空发挥 ——
        </ThoughtLine>
        <ThoughtLine delayFrames={16}>
          而是把{" "}
          <span style={{ color: GOLD, textShadow: `0 0 20px rgba(212,175,55,0.28)`, whiteSpace: "nowrap" }}>
            [专业书]
          </span>
          、{" "}
          <span style={{ color: GOLD, textShadow: `0 0 20px rgba(212,175,55,0.28)`, whiteSpace: "nowrap" }}>
            [业务数据]
          </span>{" "}
          和{" "}
          <span style={{ color: GOLD, textShadow: `0 0 20px rgba(212,175,55,0.28)`, whiteSpace: "nowrap" }}>
            [真实场景]
          </span>{" "}
          一起喂进去
        </ThoughtLine>
        <ThoughtLine delayFrames={32}>
          让AI
          <span
            style={{
              color: GOLD,
              fontSize: "1.09em",
              fontWeight: 620,
              letterSpacing: "-0.045em",
              textShadow: [
                "0 0 18px rgba(212,175,55,0.38)",
                "0 0 38px rgba(212,175,55,0.16)",
              ].join(", "),
              whiteSpace: "nowrap",
            }}
          >
            基于证据
          </span>
          生成策略。
        </ThoughtLine>
      </div>
    </div>
  );
};

const SpecularSweep: React.FC = () => {
  const frame = useCurrentFrame();
  const x = interpolate(frame, [0, 200], [-48, 46]);

  return (
    <div
      style={{
        position: "absolute",
        inset: "-40%",
        zIndex: 3,
        pointerEvents: "none",
        background: `linear-gradient(115deg, transparent 34%, rgba(245,245,247,0.045) 44%, rgba(212,175,55,0.09) 48%, rgba(245,245,247,0.025) 52%, transparent 63%)`,
        transform: `translateX(${x}%) rotate(4deg)`,
        opacity: frame < 10 ? 0 : frame > 180 ? 0 : 1,
      }}
    />
  );
};

const AmbientOrb: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = Math.max(0, frame - 5);
  const s = spring({
    frame: localFrame,
    fps: 30,
    config: { damping: 14, mass: 0.5, stiffness: 50 },
    durationInFrames: 40,
  });

  return (
    <div
      style={{
        position: "absolute",
        width: "62%",
        aspectRatio: "1",
        left: "50%",
        top: "39%",
        transform: `translate(-50%, -50%) scale(${interpolate(s, [0, 1], [0.82, 1])})`,
        borderRadius: "999px",
        background: `radial-gradient(circle, rgba(212,175,55,0.16), rgba(212,175,55,0.045) 42%, transparent 67%)`,
        filter: "blur(10px)",
        opacity: s,
        zIndex: 2,
        pointerEvents: "none",
      }}
    />
  );
};

const MicroCaption: React.FC = () => {
  const frame = useCurrentFrame();
  const delay = 90;
  const localFrame = Math.max(0, frame - delay);
  const s = spring({
    frame: localFrame,
    fps: 30,
    config: { damping: 14, mass: 0.4, stiffness: 70 },
    durationInFrames: 20,
  });

  return (
    <p
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: "5.2%",
        zIndex: 6,
        margin: 0,
        color: "#424245",
        fontSize: "clamp(8px, 1.72vw, 12px)",
        letterSpacing: "0.22em",
        textAlign: "center",
        textTransform: "uppercase",
        opacity: s,
        transform: `translateY(${interpolate(s, [0, 1], [8, 0])}px)`,
        filter: s < 1 ? `blur(${interpolate(s, [0, 0.5, 1], [4, 1, 0])}px)` : "none",
      }}
    >
      Evidence · Grounding · Generation
    </p>
  );
};

export const CitationOverlay: React.FC = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Sequence from={0} durationInFrames={120}>
        <CitationWaterfall />
      </Sequence>

      <Sequence from={115} durationInFrames={250}>
        <AmbientOrb />
        <SpecularSweep />
        <RevelationStage />
        <MicroCaption />
      </Sequence>
    </div>
  );
};
