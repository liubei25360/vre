import React from "react";
import { useCurrentFrame } from "remotion";

interface ConceptCardData {
  title: string;
  body: string;
  accent?: string;
}

interface SpatialConceptCardProps {
  cards: ConceptCardData[];
  focusCard?: number;
  spacing?: number;
  blurAtDepth?: number;
  offsetX?: number;
  offsetY?: number;
  cardWidth?: string;
  durationInFrames?: number;
  style?: React.CSSProperties;
}

export const SpatialConceptCard: React.FC<SpatialConceptCardProps> = ({
  cards,
  focusCard = 0,
  spacing = 80,
  blurAtDepth = 4,
  offsetX = 20,
  offsetY = 20,
  cardWidth = "75%",
  durationInFrames = 300,
  style,
}) => {
  const frame = useCurrentFrame();
  const focusShift = Math.sin((frame / durationInFrames) * Math.PI * 2) * 0.3;
  const dynamicFocus = focusCard + focusShift;

  const containerStyle: React.CSSProperties = {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    perspective: "600px",
    ...style,
  };

  return (
    <div style={containerStyle}>
      {cards.map((card, i) => {
        const depth = i - dynamicFocus;
        const blur = Math.abs(depth) * blurAtDepth;
        const zIndex = cards.length - Math.abs(Math.round(i - dynamicFocus));

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: cardWidth,
              maxWidth: "700px",
              padding: "3vw",
              borderRadius: "20px",
              background: `rgba(${card.accent ? hexToRgb(card.accent) : "100,210,255"}, 0.08)`,
              border: `1px solid rgba(${card.accent ? hexToRgb(card.accent) : "100,210,255"}, ${Math.max(0.05, 0.25 - Math.abs(depth) * 0.08)})`,
              backdropFilter: `blur(${12 + Math.abs(depth) * 2}px)`,
              WebkitBackdropFilter: `blur(${12 + Math.abs(depth) * 2}px)`,
              transform: `translateZ(${-depth * spacing}px) translateX(${depth * offsetX * 0.5}px) translateY(${depth * offsetY * 0.3}px)`,
              filter: blur > 0.3 ? `blur(${blur}px)` : "none",
              opacity: 1 - Math.abs(depth) * 0.15,
              zIndex,
              color: "#e2e8f0",
              fontFamily: "'Inter', sans-serif",
              boxShadow: `0 ${20 + Math.abs(depth) * 10}px ${40 + Math.abs(depth) * 20}px rgba(0,0,0,${0.3 + Math.abs(depth) * 0.1})`,
            }}
          >
            <h3
              style={{
                fontSize: "3vw",
                fontWeight: 800,
                margin: "0 0 1vw",
                color: card.accent || "#64d2ff",
              }}
            >
              {card.title}
            </h3>
            <p
              style={{
                fontSize: "2vw",
                fontWeight: 400,
                lineHeight: 1.6,
                margin: 0,
                opacity: 0.8,
              }}
            >
              {card.body}
            </p>
          </div>
        );
      })}
    </div>
  );
};

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "100,210,255";
  return `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`;
}
