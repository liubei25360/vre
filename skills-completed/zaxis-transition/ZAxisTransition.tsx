import React from "react";
import { useCurrentFrame, spring, interpolate } from "remotion";

interface ZAxisTransitionProps {
  children: [React.ReactNode, React.ReactNode];
  transitionStartFrame?: number;
  transitionDurationFrames?: number;
  backgroundColor?: string;
  motionBlurLayers?: number;

  style?: React.CSSProperties;
}

export const ZAxisTransition: React.FC<ZAxisTransitionProps> = ({
  children,
  transitionStartFrame = 0,
  transitionDurationFrames = 30,
  backgroundColor = "#020617",
  motionBlurLayers = 6,

  style,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - transitionStartFrame;

  const [outgoingScene, incomingScene] = children;

  const outgoingProgress = Math.min(1, relativeFrame / transitionDurationFrames);

  const outgoingSpring = spring({
    frame: relativeFrame,
    fps: 30,
    config: { damping: 8, mass: 1.8, stiffness: 40 },
    durationInFrames: transitionDurationFrames,
  });

  const outgoingScale = interpolate(outgoingSpring, [0, 1], [1, 0.25]);
  const outgoingOpacity = interpolate(outgoingSpring, [0, 0.6, 1], [1, 0.6, 0]);
  const outgoingBlur = interpolate(outgoingSpring, [0, 1], [0, 16]);
  const outgoingTranslateZ = interpolate(outgoingSpring, [0, 1], [0, -400]);

  const incomingSpring = spring({
    frame: relativeFrame,
    fps: 30,
    config: { damping: 14, mass: 0.4, stiffness: 100 },
    durationInFrames: transitionDurationFrames,
  });

  const incomingScale = interpolate(incomingSpring, [0, 0.05, 1], [2.8, 2.6, 1]);
  const incomingOpacity = interpolate(incomingSpring, [0, 0.3, 1], [0, 0.55, 1]);
  const incomingBlur = interpolate(incomingSpring, [0, 0.4, 1], [12, 4, 0]);
  const incomingTranslateZ = interpolate(incomingSpring, [0, 1], [300, 0]);

  const showOutgoing = relativeFrame >= 0;
  const showIncoming = relativeFrame >= -5;

  const sceneWrap: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    transformStyle: "preserve-3d",
    backfaceVisibility: "hidden",
  };

  const renderMotionBlur = (
    node: React.ReactNode,
    layers: number,
    baseTransform: string,
    baseFilter: string,
    baseOpacity: number,
  ) => {
    if (layers <= 0) return node;

    const ghostLayers = [];
    for (let i = 1; i <= layers; i++) {
      const fraction = i / layers;
      const ghostOpacity = baseOpacity * (1 - fraction) * 0.35;
      if (ghostOpacity < 0.01) continue;

      const ghostTransform = baseTransform.replace(
        /translateZ\([^)]+\)/,
        (_match) => {
          const baseZ = parseFloat(_match);
          const ghostZ = baseZ * (1 - fraction * 0.7);
          return `translateZ(${ghostZ}px)`;
        },
      );

      ghostLayers.push(
        <div
          key={`ghost-${i}`}
          style={{
            ...sceneWrap,
            transform: ghostTransform,
            opacity: ghostOpacity,
            filter: `blur(${Number(baseFilter.match(/\d+/)?.[0] ?? 0) * (1 + fraction)}px)`,
            pointerEvents: "none",
          }}
        >
          {node}
        </div>,
      );
    }
    return ghostLayers;
  };

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundColor,
    perspective: "800px",
    ...style,
  };

  return (
    <div style={containerStyle}>
      {showOutgoing && (outgoingOpacity > 0.001 || relativeFrame < 0) && (
        <React.Fragment>
          {renderMotionBlur(
            outgoingScene,
            relativeFrame > 0 ? motionBlurLayers : 0,
            `translateZ(${outgoingTranslateZ}px) scale(${outgoingScale})`,
            `blur(${outgoingBlur}px)`,
            outgoingOpacity,
          )}
          <div
            style={{
              ...sceneWrap,
              transform: `translateZ(${outgoingTranslateZ}px) scale(${outgoingScale})`,
              filter: outgoingBlur > 0.5 ? `blur(${outgoingBlur}px)` : "none",
              opacity: relativeFrame < 0 ? 1 : outgoingOpacity,
            }}
          >
            {outgoingScene}
          </div>
        </React.Fragment>
      )}

      {showIncoming && incomingOpacity > 0.001 && (
        <React.Fragment>
          {renderMotionBlur(
            incomingScene,
            incomingSpring < 1 ? motionBlurLayers : 0,
            `translateZ(${incomingTranslateZ}px) scale(${incomingScale})`,
            `blur(${incomingBlur}px)`,
            incomingOpacity * 0.6,
          )}
          <div
            style={{
              ...sceneWrap,
              transform: `translateZ(${incomingTranslateZ}px) scale(${incomingScale})`,
              filter: incomingBlur > 0.5 ? `blur(${incomingBlur}px)` : "none",
              opacity: incomingOpacity,
            }}
          >
            {incomingScene}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
