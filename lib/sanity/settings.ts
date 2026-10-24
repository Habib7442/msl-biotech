import { client } from "./client";
import { SITE_SETTINGS_QUERY } from "./queries";

export interface SiteRedirect {
  from: string;
  to: string;
  permanent: boolean | null;
}

export interface SiteSettings {
  defaultSeoTitle: string | null;
  defaultSeoDescription: string | null;
  defaultOgImage: { asset?: { _ref: string }; alt?: string } | null;
  redirects: SiteRedirect[] | null;
  sitemapExclude: string[] | null;
}

/** Settings managed in the admin panel. Null when never saved. */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await client.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 60, tags: ["siteSettings"] } });
  } catch {
    return null;
  }
}
