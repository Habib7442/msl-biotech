import { toSiteContact, type SiteContact } from "@/lib/contact";
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
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  social: { facebook: string | null; instagram: string | null; linkedin: string | null; youtube: string | null } | null;
}

/** Settings managed in the admin panel. Null when never saved. */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await client.fetch<SiteSettings | null>(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 60, tags: ["siteSettings"] } });
  } catch {
    return null;
  }
}

/** Contact details for server components (fallbacks applied). */
export async function getSiteContact(): Promise<SiteContact> {
  return toSiteContact(await getSiteSettings());
}
