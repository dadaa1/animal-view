"use client";

import Link from "next/link";
import { FrogViewer } from "@/components/FrogViewer";

const PARTS = [
  {
    id: "Object_0",
    name: "整体皮肤",
    en: "Skin",
    desc: "蛙类皮肤薄而湿润，富含黏液腺和色素细胞。皮肤是两栖动物气体交换的重要器官之一，辅助肺部完成呼吸功能。",
  },
  {
    id: "Object_1",
    name: "消化系统",
    en: "Digestive System",
    desc: "包括口腔、食道、胃、小肠和大肠。蛙为肉食性动物，食物经消化道吸收营养后残渣由泄殖腔排出。",
  },
  {
    id: "Object_2",
    name: "循环系统",
    en: "Circulatory System",
    desc: "蛙的心脏分为两心房一心室，为不完全双循环。静脉系统包含肝门静脉和肾门静脉，这是低等脊椎动物的特征。",
  },
  {
    id: "Object_3",
    name: "呼吸系统",
    en: "Respiratory System",
    desc: "蛙无肋骨和膈肌，依靠口腔底部的升降运动进行肺呼吸。皮肤呼吸可占总气体交换量的 20%~50%。",
  },
  {
    id: "Object_4",
    name: "神经系统",
    en: "Nervous System",
    desc: "包括脑、脊髓和周围神经。蛙的大脑已分化出大脑半球、小脑和延髓，小脑发达与其跳跃运动相关。",
  },
  {
    id: "Object_5",
    name: "骨骼系统",
    en: "Skeletal System",
    desc: "蛙的骨骼适应跳跃生活，后肢骨明显长于前肢。脊椎数量减少，尾椎退化形成尾综骨结构。",
  },
  {
    id: "Object_6",
    name: "肌肉系统",
    en: "Muscular System",
    desc: "蛙的肌肉系统高度特化，后肢腓肠肌等快肌纤维发达，为爆发性跳跃提供动力。",
  },
  {
    id: "Object_7",
    name: "排泄系统",
    en: "Excretory System",
    desc: "蛙具一对中肾，负责过滤血液中的代谢废物。成体主要以尿素形式排氮，适应水陆两栖生活。",
  },
  {
    id: "Object_8",
    name: "生殖系统",
    en: "Reproductive System",
    desc: "雌雄异体，体内受精。雄性具精囊和婚垫，繁殖期婚垫用于抱对。卵产在水中，体外受精发育。",
  },
];

export default function DetailsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "#e2e8f0" }}>
      {/* Hero */}
      <section
        style={{
          padding: "80px 24px 48px",
          textAlign: "center",
          borderBottom: "1px solid #1e293b",
        }}
      >
        <h1
          style={{
            fontSize: 36,
            fontWeight: 700,
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          青蛙解剖学 3D 模型
        </h1>
        <p
          style={{
            marginTop: 12,
            fontSize: 16,
            color: "#94a3b8",
            maxWidth: 520,
            margin: "12px auto 0",
            lineHeight: 1.6,
          }}
        >
          交互式三维可视化 · 涵盖 9 大解剖系统
        </p>
      </section>

      {/* Part cards */}
      <section
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "40px 24px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {PARTS.map((part) => (
            <div
              key={part.id}
              style={{
                background: "#1e293b",
                borderRadius: 10,
                padding: 24,
                border: "1px solid #334155",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "#60a5fa";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "#334155";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    background: "#334155",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#93c5fd",
                  }}
                >
                  {String(PARTS.indexOf(part) + 1).padStart(2, "0")}
                </span>
                <h3
                  style={{
                    margin: 0,
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#f1f5f9",
                  }}
                >
                  {part.name}
                </h3>
              </div>
              <p
                style={{
                  fontSize: 12,
                  color: "#64748b",
                  margin: 0,
                  marginBottom: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {part.en}
              </p>
              <p
                style={{
                  fontSize: 14,
                  color: "#cbd5e1",
                  margin: 0,
                  lineHeight: 1.7,
                }}
              >
                {part.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          textAlign: "center",
          padding: "40px 24px 80px",
          borderTop: "1px solid #1e293b",
        }}
      >
        <p
          style={{
            fontSize: 16,
            color: "#94a3b8",
            marginBottom: 24,
          }}
        >
          想查看 3D 交互模型？
        </p>
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 28px",
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
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10 17 15 12 10 7" />
            <line x1="15" y1="12" x2="3" y2="12" />
          </svg>
          进入 3D 模型页面
        </Link>
      </section>
    </div>
  );
}
