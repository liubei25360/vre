import React from "react";
import { useCurrentFrame, spring, interpolate } from "remotion";

interface Particle {
  angle: number;
  velocity: number;
  type: "line" | "dot";
  size: number;
  rotation: number;
}

interface ConfettiBurstProps {
  particleCount?: number;
  durationInFrames?: number;
  startFrame?: number;
  color?: string;
  spreadRadius?: number;
  lineLength?: number;
  style?: React.CSSProperties;
}

export const ConfettiBurst: React.FC<ConfettiBurstProps> = ({
  particleCount = 30,
  durationInFrames = 60,
  startFrame = 0,
  color = "#fbbf24",
  spreadRadius = 300,
  lineLength = 40,
  style,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;
  if (relativeFrame < 0) return <div />;

  const burstSpring = spring({
    frame: relativeFrame,
    fps: 30,
    config: { damping: 8, mass: 0.6, stiffness: 120 },
    durationInFrames,
  });

  const particles: Particle[] = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      angle: (i / particleCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.3,
      velocity: 0.6 + Math.random() * 0.4,
      type: Math.random() > 0.5 ? "line" : "dot",
      size: 3 + Math.random() * 6,
      rotation: Math.random() * 360,
    });
  }

  const containerStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: 0,
    height: 0,
    ...style,
  };

  return (
    <div style={containerStyle}>
      {particles.map((p, i) => {
        const distance = burstSpring * spreadRadius * p.velocity;
        const opacity = interpolate(burstSpring, [0, 0.2, 0.8, 1], [0, 1, 0.6, 0]);
        const x = Math.cos(p.angle) * distance;
        const y = Math.sin(p.angle) * distance;

        if (p.type === "dot") {
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width: p.size,
                height: p.size,
                borderRadius: "50%",
                background: color,
                boxShadow: `0 0 ${p.size * 3}px ${color}`,
                transform: `translate(${x}px, ${y}px)`,
                opacity,
              }}
            />
          );
        }

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: p.size * 0.8,
              height: lineLength * (0.5 + p.velocity * 0.5),
              borderRadius: "2px",
              background: color,
              boxShadow: `0 0 ${p.size}px ${color}`,
              transform: `translate(${x}px, ${y}px) rotate(${p.rotation}deg)`,
              opacity,
            }}
          />
        );
      })}
    </div>
  );
};
