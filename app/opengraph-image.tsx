import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Mainak B. — Frontend Developer building toward Design Engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BADGES = [
  { label: "Motion", dot: "#a78bfa" },
  { label: "Components", dot: "#38bdf8" },
  { label: "Technical Writing", dot: "#fb923c" },
];
const DOMAIN = "themainakb.com";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0a0a0b",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)",
        backgroundSize: "40px 40px, 40px 40px",
      }}
    >
      {/* soft glow behind the card */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: -160,
          left: 120,
          width: 640,
          height: 640,
          borderRadius: 9999,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.14) 0%, rgba(10,10,11,0) 70%)",
        }}
      />

      {/* card */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 1040,
          height: 486,
          borderRadius: 20,
          border: "1px solid rgba(255,255,255,0.12)",
          backgroundColor: "rgba(15,15,17,0.85)",
          overflow: "hidden",
        }}
      >
        {/* window chrome bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 32px",
            height: 60,
            borderBottom: "1px solid rgba(255,255,255,0.10)",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            <div
              style={{
                display: "flex",
                width: 12,
                height: 12,
                borderRadius: 9999,
                backgroundColor: "rgba(255,255,255,0.18)",
              }}
            />
            <div
              style={{
                display: "flex",
                width: 12,
                height: 12,
                borderRadius: 9999,
                backgroundColor: "rgba(255,255,255,0.18)",
              }}
            />
            <div
              style={{
                display: "flex",
                width: 12,
                height: 12,
                borderRadius: 9999,
                backgroundColor: "rgba(255,255,255,0.18)",
              }}
            />
          </div>

          <span style={{ display: "flex", fontSize: 18, color: "#71717a" }}>
            {DOMAIN}
          </span>
        </div>

        {/* body */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 36,
            flex: 1,
            padding: "0 64px",
          }}
        >
          <span
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 700,
              color: "#fafafa",
            }}
          >
            Mainak Banerjee
          </span>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span
              style={{
                display: "flex",
                fontSize: 42,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "#fafafa",
              }}
            >
              Frontend Developer
            </span>
            <span
              style={{
                display: "flex",
                fontSize: 42,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "#71717a",
              }}
            >
              Building toward Design Engineering
            </span>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            {BADGES.map((badge) => (
              <div
                key={badge.label}
                style={{
                  display: "flex",
                  borderRadius: 999,
                  padding: 1,
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.04))",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "9px 20px 9px 14px",
                    borderRadius: 999,
                    backgroundColor: "#111113",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      width: 7,
                      height: 7,
                      borderRadius: 999,
                      backgroundColor: badge.dot,
                    }}
                  />
                  <span style={{ fontSize: 18, color: "#e4e4e7" }}>
                    {badge.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    { ...size },
  );
}
