import { useCurrentFrame, interpolate, spring } from "remotion";

interface NeonTypewriterProps {
  text: string;
  durationInFrames?: number;
  startFrame?: number;
  typingSpeed?: number;
  fontSize?: number | string;
  primaryColor?: string;
  backgroundColor?: string;
  glowIntensity?: number;
  cursorBlinkRate?: number;
  align?: "left" | "center" | "right";
  fontFamily?: string;

  style?: React.CSSProperties;
}

const defaultColors = {
  primary: "#64d2ff",
  background: "#0a0a0f",
};

export const NeonTypewriter: React.FC<NeonTypewriterProps> = ({
  text,
  durationInFrames = 90,
  startFrame = 0,
  typingSpeed = 3,
  fontSize = "4.5vw",
  primaryColor = defaultColors.primary,
  backgroundColor = defaultColors.background,
  glowIntensity = 1,
  cursorBlinkRate = 15,
  align = "center",
  fontFamily = "'JetBrains Mono', 'Fira Code', monospace",

  style,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = Math.max(0, frame - startFrame);

  const totalTypingFrames = text.length * typingSpeed;
  const cursorStartFrame = totalTypingFrames;

  const displayChars = Math.min(
    text.length,
    Math.floor(relativeFrame / typingSpeed),
  );
  const displayText = text.slice(0, displayChars);
  const remainingText = text.slice(displayChars);

  const isTypingDone = displayChars >= text.length;

  const cursorOpacity = spring({
    frame: relativeFrame - cursorStartFrame,
    fps: 30,
    config: { damping: 200 },
    durationInFrames: cursorBlinkRate,
  });

  const getCharGlow = (charIndex: number): React.CSSProperties => {
    const charAppearFrame = charIndex * typingSpeed;
    const framesSinceAppear = relativeFrame - charAppearFrame;

    if (framesSinceAppear < 0) return {};

    if (framesSinceAppear === 0) {
      const flashRadius = 20 * glowIntensity;
      return {
        textShadow: [
          `0 0 ${flashRadius}px ${primaryColor}`,
          `0 0 ${flashRadius * 2}px ${primaryColor}`,
          `0 0 ${flashRadius * 4}px ${primaryColor}`,
          `0 0 ${flashRadius * 6}px ${primaryColor}`,
        ].join(", "),
      };
    }

    const decay = Math.exp(-framesSinceAppear * 0.5) * glowIntensity;
    const decayRadius = 6 * decay;
    return {
      textShadow: [
        `0 0 ${decayRadius}px ${primaryColor}`,
        `0 0 ${decayRadius * 3}px ${primaryColor}`,
      ].join(", "),
    };
  };

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor,
    display: "flex",
    alignItems: "center",
    justifyContent: align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center",
    padding: "4vw",
    overflow: "hidden",
    ...style,
  };

  const textContainerStyle: React.CSSProperties = {
    textAlign: align,
    fontFamily,
    fontSize,
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: "0.08em",
    color: primaryColor,
    wordBreak: "break-word",
    position: "relative",
  };

  const cursorStyle: React.CSSProperties = {
    display: "inline-block",
    width: "0.15em",
    height: "0.85em",
    backgroundColor: primaryColor,
    verticalAlign: "baseline",
    marginLeft: "0.1em",
    opacity: interpolate(
      Math.sin((relativeFrame - cursorStartFrame) * 0.4),
      [-1, 0, 1],
      [0, 1, 0],
    ),
    boxShadow: `
      0 0 6px ${primaryColor},
      0 0 12px ${primaryColor},
      0 0 24px ${primaryColor}
    `,
  };

  const renderChars = () => {
    const chars = [];
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (i < displayChars) {
        chars.push(
          <span key={i} style={getCharGlow(i)}>
            {char}
          </span>,
        );
      } else if (i === displayChars && !isTypingDone) {
        chars.push(
          <span
            key={i}
            style={{
              opacity: interpolate(
                relativeFrame % typingSpeed,
                [0, typingSpeed - 1],
                [0, 0.3],
              ),
            }}
          >
            {char}
          </span>,
        );
      }
    }
    return chars;
  };

  return (
    <div style={containerStyle}>
      <div style={textContainerStyle}>
        {renderChars()}
        {isTypingDone && (
          <span style={cursorStyle} />
        )}
        {!isTypingDone && relativeFrame > 0 && (
          <span
            style={{
              display: "inline-block",
              width: "0.15em",
              height: "0.85em",
              backgroundColor: primaryColor,
              verticalAlign: "baseline",
              marginLeft: "0.1em",
              opacity: interpolate(
                Math.sin(relativeFrame * 0.8),
                [-1, 0, 1],
                [0.2, 1, 0.2],
              ),
              boxShadow: `0 0 8px ${primaryColor}`,
            }}
          />
        )}
      </div>
    </div>
  );
};
