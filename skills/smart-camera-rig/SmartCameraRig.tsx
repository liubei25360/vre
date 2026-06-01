import React from "react";
import { useCurrentFrame, spring } from "remotion";

interface CameraFrame {
  atFrame: number;
  scale?: number;
  x?: number;
  y?: number;
  springConfig?: {
    damping?: number;
    mass?: number;
    stiffness?: number;
  };
}

interface SmartCameraRigProps {
  children?: React.ReactNode;
  cameraFrames?: CameraFrame[];
  baseScale?: number;
  smoothing?: number;
  backgroundColor?: string;
  style?: React.CSSProperties;
}

const defaultSpring = { damping: 12, mass: 0.5, stiffness: 80 };

export const SmartCameraRig: React.FC<SmartCameraRigProps> = ({
  children,
  cameraFrames = [],
  baseScale = 1,
  smoothing = 0.6,
  backgroundColor = "transparent",
  style,
}) => {
  const frame = useCurrentFrame();

  const sortedFrames = [...cameraFrames].sort((a, b) => a.atFrame - b.atFrame);

  let currentScale = baseScale;
  let currentX = 0;
  let currentY = 0;

  if (sortedFrames.length === 0) {
    currentScale = baseScale;
  } else if (sortedFrames.length === 1) {
    const target = sortedFrames[0];
    const springCfg = { ...defaultSpring, ...target.springConfig };
    const progress = spring({
      frame,
      fps: 30,
      config: {
        damping: springCfg.damping,
        mass: springCfg.mass,
        stiffness: springCfg.stiffness,
      },
    });

    currentScale = baseScale + (target.scale ?? baseScale) * progress;
    currentX = (target.x ?? 0) * progress;
    currentY = (target.y ?? 0) * progress;
  } else {
    let prev: CameraFrame = { atFrame: 0, scale: baseScale, x: 0, y: 0 };
    let next: CameraFrame = sortedFrames[0];

    if (frame >= sortedFrames[0].atFrame) {
      for (let i = 0; i < sortedFrames.length; i++) {
        if (frame >= sortedFrames[i].atFrame) {
          prev = sortedFrames[i];
          next = sortedFrames[i + 1] || sortedFrames[i];
        } else {
          next = sortedFrames[i];
          break;
        }
      }
    }

    if (prev === next || frame >= next.atFrame) {
      currentScale = next.scale ?? baseScale;
      currentX = next.x ?? 0;
      currentY = next.y ?? 0;
    } else {
      const startFrame = prev.atFrame;
      const durationFrames = next.atFrame - startFrame;

      const springCfg = { ...defaultSpring, ...next.springConfig };
      const progress = spring({
        frame: frame - startFrame,
        fps: 30,
        config: {
          damping: springCfg.damping,
          mass: springCfg.mass,
          stiffness: springCfg.stiffness,
        },
        durationInFrames: durationFrames,
      });

      const eased = 1 - Math.pow(1 - progress, 1 + smoothing * 2);

      const fromScale = prev.scale ?? baseScale;
      const toScale = next.scale ?? baseScale;
      const fromX = prev.x ?? 0;
      const toX = next.x ?? 0;
      const fromY = prev.y ?? 0;
      const toY = next.y ?? 0;

      currentScale = fromScale + (toScale - fromScale) * eased;
      currentX = fromX + (toX - fromX) * eased;
      currentY = fromY + (toY - fromY) * eased;
    }
  }

  const rigStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    backgroundColor,
    ...style,
  };

  const cameraStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100%",
    height: "100%",
    transform: `translate(-50%, -50%) scale(${currentScale}) translate(${currentX}px, ${currentY}px)`,
    transformOrigin: "center center",
  };

  return (
    <div style={rigStyle}>
      <div style={cameraStyle}>
        {children}
      </div>
    </div>
  );
};
