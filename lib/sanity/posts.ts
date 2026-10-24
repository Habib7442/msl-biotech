import type { SanityImageSource } from "@sanity/image-url";
import { client } from "./client";
import { POSTS_PAGE_QUERY, POST_BY_SLUG_QUERY, POST_SITEMAP_QUERY, POST_SLUGS_QUERY } from "./queries";

export const POSTS_PER_PAGE = 9;

export interface SanityImageWithAlt {
  asset?: { _ref: string };
  alt?: string;
}

export interface PostCard {
  _id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
  author: string | null;
  publishedAt: string;
  updatedAt: string | null;
  coverImage: SanityImageWithAlt | null;
}

export interface Post extends PostCard {
  body: string;
  tags: string[] | null;
  seo: { title?: string; description?: string; canonical?: string; noindex?: boolean } | null;
  og: { title?: string; description?: string; image?: SanityImageWithAlt } | null;
  related: PostCard[];
  latest: PostCard[];
}

const postFetch = { next: { revalidate: 60, tags: ["post"] } };

export function hasImage(image: SanityImageWithAlt | null | undefined): image is SanityImageWithAlt & SanityImageSource {
  return Boolean(image?.asset?._ref);
}

export async function getPostsPage(page: number): Promise<{ items: PostCard[]; total: number }> {
  return client.fetch(
    POSTS_PAGE_QUERY,
    { from: (page - 1) * POSTS_PER_PAGE, to: page * POSTS_PER_PAGE },
    postFetch
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return client.fetch<Post | null>(POST_BY_SLUG_QUERY, { slug }, postFetch);
}

export async function getPostSlugs(): Promise<string[]> {
  return client.fetch<string[]>(POST_SLUGS_QUERY, {}, postFetch);
}

export async function getPostsForSitemap(): Promise<{ slug: string; updatedAt: string }[]> {
  return client.fetch(POST_SITEMAP_QUERY, {}, postFetch);
}

/** "2026-10-23T…" → "23 Oct 2026" (fixed zone, so server and client agree). */
export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" }).format(
    new Date(iso)
  );
}

export function readingMinutes(markdown: string) {
  const words = markdown.trim() ? markdown.trim().split(/\s+/).length : 0;
  return Math.max(1, Math.round(words / 200));
}
