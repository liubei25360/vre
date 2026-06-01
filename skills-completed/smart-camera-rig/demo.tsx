import { AbsoluteFill } from "remotion";
import { SmartCameraRig } from "./SmartCameraRig";
import type { CameraFrame } from "./SmartCameraRig";

const FakeUIScreenshot: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        display: "flex",
        flexDirection: "column",
        padding: "60px 80px",
        boxSizing: "border-box",
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      }}
    >
      <div
        style={{
          fontSize: "48px",
          fontWeight: 800,
          color: "#e2e8f0",
          marginBottom: "16px",
        }}
      >
        Dashboard
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "32px",
          marginBottom: "48px",
        }}
      >
        {[
          { label: "Active Users", value: "12.4K", color: "#38bdf8", change: "+8.2%" },
          { label: "Revenue", value: "$48.2K", color: "#4ade80", change: "+12.5%" },
          { label: "Latency", value: "42ms", color: "#fb923c", change: "-18.3%" },
        ].map((card) => (
          <div
            key={card.label}
            style={{
              background: "rgba(30, 41, 59, 0.8)",
              borderRadius: "20px",
              padding: "32px",
              border: "1px solid rgba(71, 85, 105, 0.4)",
            }}
          >
            <div style={{ fontSize: "20px", color: "#94a3b8" }}>{card.label}</div>
            <div
              style={{
                fontSize: "52px",
                fontWeight: 800,
                color: card.color,
                marginTop: "12px",
              }}
            >
              {card.value}
            </div>
            <div
              style={{
                fontSize: "22px",
                color: card.change.startsWith("+") ? "#4ade80" : "#38bdf8",
                marginTop: "8px",
              }}
            >
              {card.change}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          background: "rgba(30, 41, 59, 0.8)",
          borderRadius: "20px",
          padding: "32px",
          border: "1px solid rgba(71, 85, 105, 0.4)",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div style={{ fontSize: "22px", color: "#94a3b8" }}>Recent Events</div>
        {[
          { time: "14:32", event: "Deploy v2.7.1", status: "success" },
          { time: "14:28", event: "DB Migration", status: "running" },
          { time: "14:15", event: "Cache Invalidation", status: "success" },
          { time: "14:02", event: "User Report: Latency Spike", status: "warning" },
          { time: "13:55", event: "Auto-scale Triggered", status: "success" },
        ].map((row, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              fontSize: "22px",
              color: "#cbd5e1",
              padding: "10px 0",
              borderBottom: "1px solid rgba(71, 85, 105, 0.2)",
            }}
          >
            <span style={{ color: "#64748b", width: "80px" }}>{row.time}</span>
            <span style={{ flex: 1 }}>{row.event}</span>
            <span
              style={{
                padding: "4px 16px",
                borderRadius: "12px",
                fontSize: "18px",
                background:
                  row.status === "success"
                    ? "rgba(74, 222, 128, 0.15)"
                    : row.status === "warning"
                      ? "rgba(251, 191, 36, 0.15)"
                      : "rgba(56, 189, 248, 0.15)",
                color:
                  row.status === "success"
                    ? "#4ade80"
                    : row.status === "warning"
                      ? "#fbbf24"
                      : "#38bdf8",
              }}
            >
              {row.status}
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "40px",
          right: "60px",
          fontSize: "18px",
          color: "#475569",
        }}
      >
        Remotion AI Pipeline · v2.7.1
      </div>
    </div>
  );
};

export const SmartCameraRigDemo: React.FC = () => {
  const cameraFrames: CameraFrame[] = [
    { atFrame: 0, scale: 0.85, x: 0, y: 0 },
    { atFrame: 35, scale: 1.15, x: -30, y: -40 },
    { atFrame: 70, scale: 1.45, x: 60, y: 70 },
    { atFrame: 105, scale: 1.1, x: -50, y: 20 },
    { atFrame: 150, scale: 0.85, x: 0, y: 0 },
  ];

  return (
    <AbsoluteFill
      style={{
        background: "#020617",
      }}
    >
      <SmartCameraRig cameraFrames={cameraFrames} baseScale={0.85}>
        <FakeUIScreenshot />
      </SmartCameraRig>
    </AbsoluteFill>
  );
};
