import { ImageResponse } from "next/og";
import { showcaseList } from "@/data/showcase-meta";
import { OgCard, OG_SIZE, categoryAccent } from "@/lib/og-card";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Component preview card";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = showcaseList.find((s) => s.slug === slug);

  return new ImageResponse(
    (
      <OgCard
        badge={item?.category ?? "Showcase"}
        accent={item ? (categoryAccent[item.category] ?? "#a1a1aa") : "#a1a1aa"}
        title={item?.title ?? "Coming Soon"}
        description={item?.description ?? "This component is on the roadmap."}
        footer={`Awesome FE · /showcase/${slug}`}
      />
    ),
    size,
  );
}
