import { Metadata } from "next";

const title = "MSL Biotech | Pharmaceutical Manufacturer in Guwahati, Assam";
const description = "MSL Biotech Private Limited is a pharmaceutical manufacturer in Guwahati, Assam, producing tablets, capsules, syrups, and nutraceuticals. Medicine Save Life.";

// Keep this list grounded in what the site actually offers (see
// context/project-overview.md and lib/data.ts CATEGORIES) — brand terms,
// product-category terms, and the PCD-franchise/distribution angle that's
// an explicit lead-gen goal for this site. Don't add category terms here
// that aren't real product lines on the site.
const keywords = [
  "MSL Biotech",
  "MSL Biotech Private Limited",
  "Medicine Save Life",
  "pharmaceutical manufacturer Guwahati",
  "pharmaceutical company Assam",
  "WHO-GMP pharma manufacturer India",
  "tablet manufacturer Guwahati",
  "capsule manufacturer Assam",
  "syrup manufacturer Guwahati",
  "nutraceutical manufacturer India",
  "pediatric medicine manufacturer",
  "diabetes care medicine Assam",
  "gastro care medicine manufacturer",
  "personal care pharma products",
  "PCD pharma franchise Assam",
  "pharma franchise Guwahati",
  "pharmaceutical distributor partnership Assam",
  "third party pharma manufacturing Guwahati",
  "pharma company Panjabari Guwahati",
  "generic medicine manufacturer Northeast India",
];

export const defaultSEO: Metadata = {
  title: {
    default: title,
    template: "%s | MSL Biotech",
  },
  description,
  keywords,
  authors: [{ name: "MSL Biotech Private Limited", url: "https://mslbiotech.in" }],
  creator: "MSL Biotech Private Limited",
  publisher: "MSL Biotech Private Limited",
  metadataBase: new URL("https://mslbiotech.in"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: {
    telephone: false,
  },
  // Google Search Console's "HTML tag" verification method: add the
  // property in Search Console, copy the content value it gives you (not
  // the whole <meta> tag) into NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in
  // .env.local, then redeploy. Omitted entirely if unset, rather than
  // rendering an empty/broken meta tag.
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
    : {}),
  openGraph: {
    title,
    description,
    url: "https://mslbiotech.in",
    siteName: "MSL Biotech",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MSL Biotech - Medicine Save Life",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicons/favicon.ico",
    shortcut: "/favicons/favicon.ico",
    apple: "/favicons/apple-touch-icon.png",
  },
};
