import { ImageResponse } from "next/og";
import { showcaseList } from "@/data/showcase-meta";
import { OgCard, OG_SIZE } from "@/lib/og-card";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Awesome FE — frontend component showcase";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <OgCard
        badge="Frontend Showcase"
        accent="#8b5cf6"
        title="Awesome FE"
        description={`${showcaseList.length} beautiful frontend components — 3D, animations, scroll effects, and micro-interactions.`}
        footer="Awesome FE"
      />
    ),
    size,
  );
}
