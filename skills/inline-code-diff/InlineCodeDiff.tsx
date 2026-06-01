import React from "react";
import { useCurrentFrame, spring } from "remotion";

interface InlineCodeDiffProps {
  oldLines: string[];
  newLines: string[];
  durationInFrames?: number; startFrame?: number;
  fontSize?: string; addedColor?: string; removedColor?: string;
  style?: React.CSSProperties;
}

export const InlineCodeDiff: React.FC<InlineCodeDiffProps> = ({
  oldLines, newLines, durationInFrames = 60, startFrame = 10,
  fontSize = "2vw", addedColor = "#4ade80", removedColor = "#fb7185",
  style
}) => {
  const frame = useCurrentFrame(); const rf = Math.max(0, frame - startFrame);
  const maxLen = Math.max(oldLines.length, newLines.length);
  return (
    <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize, padding:"2vw", color:"#c9d1d9", background:"#0d1117", borderRadius:16, ...style }}>
      {Array.from({length:maxLen}).map((_,i) => {
        const isOld = oldLines[i] !== undefined; const isNew = newLines[i] !== undefined;
        const changed = isOld && isNew && oldLines[i] !== newLines[i];
        const removed = isOld && !isNew; const added = !isOld && isNew;
        const stagger = i * 2;
        const rowT = spring({ frame: Math.max(0, rf - stagger), fps:30, config:{damping:14,mass:0.3,stiffness:80}, durationInFrames:20 });
        return (
          <div key={i} style={{ lineHeight:1.8, display:"flex", opacity:rowT > 0.01 ? Math.min(1,rowT*1.5) : 0 }}>
            {removed && <span style={{ color:removedColor, background:"rgba(251,113,133,0.1)", paddingLeft:"0.5vw", marginRight:"0.5vw" }}>- {oldLines[i]}</span>}
            {added && <span style={{ color:addedColor, background:"rgba(74,222,128,0.1)", paddingLeft:"0.5vw" }}>+ {newLines[i]}</span>}
            {!removed && !added && <span>{oldLines[i] !== undefined ? oldLines[i] : newLines[i]}</span>}
          </div>
        );
      })}
    </div>
  );
};
