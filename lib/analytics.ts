// Google Analytics 4 for the public website (rendered by components/SiteChrome.tsx
// through @next/third-parties, which loads gtag.js after the page is
// interactive). Page views on client-side navigation are recorded by GA4's
// enhanced measurement ("page changes based on browser history events").

export const GA_MEASUREMENT_ID = "G-MZ47FBJ9YF";

/**
 * Only real visitors are counted: production builds, but not Vercel preview
 * deployments or `npm run dev`. Read on the server (VERCEL_ENV is a Vercel
 * system variable), so the decision is made once per deployment.
 */
export function analyticsId(): string | null {
  const production = process.env.NODE_ENV === "production";
  const preview = process.env.VERCEL_ENV === "preview" || process.env.VERCEL_ENV === "development";
  return production && !preview ? GA_MEASUREMENT_ID : null;
}
