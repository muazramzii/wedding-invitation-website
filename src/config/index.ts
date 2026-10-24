import type { WeddingConfig } from "./types";
import { aimanSarah } from "./weddings/aiman-sarah";

/** Register every wedding here. The key is the URL slug: /w/<slug>. */
const weddings: Record<string, WeddingConfig> = {
  [aimanSarah.slug]: aimanSarah,
};

export const DEFAULT_SLUG = aimanSarah.slug;

export function getWedding(slug: string): WeddingConfig | undefined {
  return weddings[slug];
}

export function getAllSlugs(): string[] {
  return Object.keys(weddings);
}

export type { WeddingConfig } from "./types";
