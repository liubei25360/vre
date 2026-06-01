import React from "react";
import { useCurrentFrame, spring, interpolate } from "remotion";

export interface StepConfig {
  id: string;
  label: string;
  atFrame?: number;
}

interface CyberProgressTrackerProps {
  steps: StepConfig[];
  durationInFrames?: number;
  barHeight?: number;
  nodeRadius?: number;
  barColor?: string;
  trackColor?: string;
  labelColor?: string;
  position?: "top" | "bottom";

  style?: React.CSSProperties;
}

export const CyberProgressTracker: React.FC<CyberProgressTrackerProps> = ({
  steps,
  durationInFrames = 150,
  barHeight = 6,
  nodeRadius = 10,
  barColor = "#64d2ff",
  trackColor = "rgba(255,255,255,0.08)",
  labelColor = "#e2e8f0",
  position = "top",

  style,
}) => {
  const frame = useCurrentFrame();
  const totalSteps = steps.length;

  const stepPositions = steps.map((step, i) =>
    step.atFrame ?? Math.round((durationInFrames / (totalSteps + 1)) * (i + 1)),
  );

  const lastStepProgress =
    totalSteps <= 1
      ? 1
      : Math.min(1, frame / stepPositions[stepPositions.length - 1]);

  const barProgress = spring({
    frame: Math.min(frame, stepPositions[stepPositions.length - 1]),
    fps: 30,
    config: { damping: 14, mass: 0.5, stiffness: 60 },
    durationInFrames: stepPositions[stepPositions.length - 1],
  });

  const containerStyle: React.CSSProperties = {
    position: "absolute",
    left: 0,
    right: 0,
    [position]: 0,
    height: `${60 + nodeRadius * 2}px`,
    zIndex: 10,
    ...style,
  };

  const trackStyle: React.CSSProperties = {
    position: "absolute",
    left: `${nodeRadius + 16}px`,
    right: `${nodeRadius + 16}px`,
    top: "50%",
    height: `${barHeight}px`,
    marginTop: `${-barHeight / 2}px`,
    borderRadius: `${barHeight}px`,
    background: trackColor,
  };

  const fillWidth = barProgress * 100;

  const getFrameForStep = (i: number): number => {
    if (i === 0) return stepPositions[0];
    return stepPositions[i];
  };

  const getLineFillPercent = (): number => {
    let pct = 0;
    for (let i = 0; i < totalSteps; i++) {
      const stepFrame = getFrameForStep(i);
      if (frame > stepFrame) {
        pct = ((i + 1) / totalSteps) * 100;
      } else if (i === 0 && frame < stepPositions[0]) {
        const partial = ((frame / stepPositions[0]) * (1 / totalSteps));
        pct = partial * 100;
      } else if (i < totalSteps - 1) {
        const prevStep = stepPositions[i];
        const nextStep = stepPositions[i + 1];
        if (frame >= prevStep && frame < nextStep) {
          const segProgress = (frame - prevStep) / (nextStep - prevStep);
          pct = ((i + segProgress) / totalSteps) * 100;
        }
        break;
      } else if (i === totalSteps - 1 && frame < stepPositions[i]) {
        const prevStep = i > 0 ? stepPositions[i - 1] : 0;
        const segProgress = (frame - prevStep) / (stepPositions[i] - prevStep);
        pct = ((i + segProgress) / totalSteps) * 100;
      }
      if (i === totalSteps - 1 && frame >= stepPositions[i]) {
        pct = 100;
      }
    }
    return pct;
  };

  const linePct = getLineFillPercent();

  return (
    <div style={containerStyle}>
      <div style={trackStyle}>
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: `${Math.min(linePct, 100)}%`,
            borderRadius: `${barHeight}px`,
            background: `linear-gradient(90deg, ${barColor}88, ${barColor})`,
            boxShadow: `0 0 ${barHeight * 2}px ${barColor}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: `calc(${Math.min(linePct, 100)}% - ${barHeight}px)`,
            top: "50%",
            marginTop: `${-barHeight}px`,
            width: `${barHeight * 2}px`,
            height: `${barHeight * 2}px`,
            borderRadius: "50%",
            background: barColor,
            boxShadow: `
              0 0 ${barHeight * 3}px ${barColor},
              0 0 ${barHeight * 6}px ${barColor}
            `,
          }}
        />
      </div>

      {steps.map((step, i) => {
        const stepFrame = getFrameForStep(i);
        const nodeReached = frame >= stepFrame;
        const nodeDelay = frame - stepFrame;
        const nodeSpring = nodeReached
          ? spring({
              frame: nodeDelay,
              fps: 30,
              config: { damping: 8, mass: 0.3, stiffness: 120 },
              durationInFrames: 12,
            })
          : 0;

        const nodeScale = 1 + nodeSpring * 0.8;
        const leftPct = ((i + 1) / (totalSteps + 1)) * 100;
        const leftVw = leftPct;

        const labelVisible = nodeSpring > 0.05;
        const labelOpacity = labelVisible
          ? Math.min(1, spring({
              frame: nodeDelay > 3 ? nodeDelay - 3 : 0,
              fps: 30,
              config: { damping: 14, mass: 0.3, stiffness: 80 },
              durationInFrames: 10,
            }))
          : 0;

        return (
          <div key={step.id}>
            <div
              style={{
                position: "absolute",
                left: `${leftVw}%`,
                top: "50%",
                width: `${nodeRadius * 2}px`,
                height: `${nodeRadius * 2}px`,
                marginTop: `-${nodeRadius}px`,
                marginLeft: `-${nodeRadius}px`,
                borderRadius: "50%",
                border: `2px solid ${nodeReached ? barColor : "rgba(255,255,255,0.15)"}`,
                background: nodeReached
                  ? `${barColor}`
                  : "rgba(10,10,20,0.6)",
                transform: `scale(${nodeScale})`,
                boxShadow: nodeReached
                  ? `0 0 ${nodeRadius * 1.5}px ${barColor}, 0 0 ${nodeRadius * 3}px ${barColor}`
                  : "none",
                transition: "border-color 0.2s, background 0.2s",
              }}
            />
            {labelVisible && labelOpacity > 0 && (
              <div
                style={{
                  position: "absolute",
                  left: `${leftVw}%`,
                  [position === "top" ? "top" : "bottom"]: `${nodeRadius * 2 + 12}px`,
                  transform: `translateX(-50%) translateY(${interpolate(labelOpacity, [0, 1], [4, 0])}px)`,
                  opacity: labelOpacity,
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  fontSize: "1.8vw",
                  fontWeight: 600,
                  color: labelColor,
                  whiteSpace: "nowrap",
                  textShadow: `0 0 ${nodeRadius * 0.8}px ${barColor}`,
                }}
              >
                {step.label}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
