import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Freshness is handled by Next.js ISR (revalidate: 60) on the pages that
  // fetch products, so the CDN's own caching would just add a second,
  // redundant staleness window after publishing in Sanity. Read live instead.
  useCdn: false,
});
