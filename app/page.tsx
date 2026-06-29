"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0f172a",
        color: "#e2e8f0",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.03) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(148,163,184,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", textAlign: "center", maxWidth: 520 }}>
        {/* Badge */}
        <div
          style={{
            display: "inline-block",
            padding: "4px 12px",
            borderRadius: 999,
            background: "rgba(59,130,246,0.1)",
            border: "1px solid rgba(59,130,246,0.25)",
            fontSize: 13,
            color: "#93c5fd",
            marginBottom: 28,
          }}
        >
          交互式 3D 解剖可视化
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: 44,
            fontWeight: 700,
            lineHeight: 1.2,
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          青蛙解剖学
        </h1>
        <p
          style={{
            fontSize: 44,
            fontWeight: 700,
            lineHeight: 1.2,
            margin: 0,
            letterSpacing: "-0.02em",
            background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          3D 模型浏览
        </p>

        {/* Description */}
        <p
          style={{
            marginTop: 20,
            fontSize: 16,
            color: "#94a3b8",
            lineHeight: 1.7,
            maxWidth: 440,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          基于真实解剖数据的交互式三维模型，涵盖皮肤、消化、循环、呼吸、神经、骨骼、肌肉、排泄、生殖九大系统。
        </p>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            marginTop: 40,
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/details"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "13px 26px",
              background: "#1e293b",
              color: "#e2e8f0",
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 500,
              textDecoration: "none",
              border: "1px solid #334155",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = "#334155";
              el.style.borderColor = "#475569";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = "#1e293b";
              el.style.borderColor = "#334155";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            查看解剖详情
          </Link>

          <Link
            href="/frog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "13px 26px",
              background: "#3b82f6",
              color: "#fff",
              borderRadius: 8,
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#2563eb";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#3b82f6";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            开始浏览 3D 模型
          </Link>
        </div>
      </div>
    </div>
  );
}
