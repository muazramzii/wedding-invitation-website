import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getWedding } from "@/config";
import WeddingSite from "@/components/WeddingSite";
import { formatLongDate } from "@/lib/utils";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/w/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const w = getWedding(slug);
  if (!w) return {};
  return {
    title: `${w.couple.first} & ${w.couple.second} — Wedding Invitation`,
    description: `Join us on ${formatLongDate(w.date)}.`,
  };
}

export default async function WeddingPage({ params }: PageProps<"/w/[slug]">) {
  const { slug } = await params;
  const wedding = getWedding(slug);
  if (!wedding) notFound();
  return <WeddingSite wedding={wedding} />;
}
