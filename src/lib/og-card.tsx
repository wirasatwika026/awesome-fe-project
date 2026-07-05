/* Shared layout for Open Graph images rendered with next/og (satori). */

export const OG_SIZE = { width: 1200, height: 630 };

/** Accent hex per category — Tailwind classes don't work inside satori. */
export const categoryAccent: Record<string, string> = {
  "3D": "#8b5cf6",
  Animation: "#f59e0b",
  Canvas: "#f97316",
  "Micro-interaction": "#0ea5e9",
  Scroll: "#10b981",
  UI: "#ec4899",
};

interface OgCardProps {
  badge: string;
  accent: string;
  title: string;
  description: string;
  footer: string;
}

export function OgCard({ badge, accent, title, description, footer }: OgCardProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        backgroundColor: "#09090b",
        backgroundImage: "radial-gradient(circle at 1px 1px, #27272a 1px, transparent 0)",
        backgroundSize: "32px 32px",
        color: "#fafafa",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          fontSize: 24,
          color: accent,
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 7,
            backgroundColor: accent,
          }}
        />
        {badge}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2 }}>
          {title}
        </div>
        <div
          style={{
            fontSize: 30,
            color: "#a1a1aa",
            lineHeight: 1.4,
            maxWidth: 900,
          }}
        >
          {description}
        </div>
      </div>

      <div style={{ display: "flex", fontSize: 24, color: "#52525b" }}>
        {footer}
      </div>
    </div>
  );
}
