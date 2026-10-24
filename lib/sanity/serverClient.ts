import "server-only";

import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

// Token client for the two things the public client can't do: read private
// review documents (ids under `review.*`) and create pending reviews.
// server-only: importing this from a Client Component fails the build, so
// the token can never reach the browser.
const token = process.env.SANITY_API_WRITE_TOKEN;

export const serverClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
  // "raw" so documents under the private `review.*` path are visible.
  perspective: "raw",
});

export const hasServerToken = Boolean(token);
