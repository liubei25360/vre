import React from "react";
import { useCurrentFrame, spring, interpolate } from "remotion";

interface SvgMorphingIconProps {
  from: string; to: string;
  durationInFrames?: number; startFrame?: number;
  primaryColor?: string; size?: number;
  style?: React.CSSProperties;
}

const ICONS: Record<string,string> = {
  bug: "M12 2C8 2 5 6 5 10c0 1.5.5 3 1 4l-2 6h16l-2-6c.5-1 1-2.5 1-4 0-4-3-8-7-8zM8 19l1.5 3h5l1.5-3H8z",
  shield: "M12 2L4 5v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V5l-8-3z",
  star: "M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.3 5.8 21 7 14.1 2 9.3l6.9-1z",
  check: "M4 12l4 4 12-12",
  gear: "M12 2a10 10 0 00-2 .2L9 4l-4-1-2 3 3 3-1 4-3 3 2 3 4-1 1 2a10 10 0 005 0l1-2 4 1 2-3-3-3 1-4 3-3-2-3-4 1-1-2A10 10 0 0012 2zm0 6a4 4 0 110 8 4 4 0 010-8z",
};

export const SvgMorphingIcon: React.FC<SvgMorphingIconProps> = ({
  from, to, durationInFrames = 60, startFrame = 0,
  primaryColor = "#64d2ff", size = 200, style
}) => {
  const frame = useCurrentFrame(); const rf = Math.max(0, frame - startFrame);
  const t = Math.min(1, rf / durationInFrames);
  const sprung = spring({ frame: rf, fps: 30, config: { damping: 10, mass: 0.5, stiffness: 80 }, durationInFrames });
  const scale = interpolate(sprung, [0,0.2,1], [0.8,1.05,1]);
  const opacity = interpolate(sprung, [0,0.1],[0,1]);

  return (
    <svg viewBox="0 0 24 24" width={size} height={size} style={{ opacity, transform:`scale(${scale})`, ...style }}>
      <defs>
        <filter id="glow"><feGaussianBlur stdDeviation="0.5" result="g"/><feMerge><feMergeNode in="g"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <g filter="url(#glow)">
        <path d={t < 0.5 ? ICONS[from] || ICONS.bug : ICONS[to] || ICONS.star}
          fill="none" stroke={primaryColor} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
          opacity={t < 0.5 ? 1 : 1}
          style={{ filter: `drop-shadow(0 0 ${4}px ${primaryColor})` }} />
        {t >= 0.5 && (
          <path d={ICONS[to] || ICONS.star} fill="none" stroke={primaryColor} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
            strokeDasharray="150" strokeDashoffset={150 - (t-0.5)*2*150}
            style={{ filter: `drop-shadow(0 0 ${6}px ${primaryColor})` }} />
        )}
      </g>
    </svg>
  );
};
