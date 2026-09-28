import { Metadata } from "next";

const title = "MSL Biotech | Pharmaceutical Marketing Company in Guwahati, Assam";
const description = "MSL Biotech Private Limited is a pharmaceutical marketing company in Guwahati, Assam, offering tablets, capsules, syrups, and nutraceuticals. Medicine Save Life.";

// Keep this list grounded in what the site actually offers (see
// context/project-overview.md and lib/data.ts CATEGORIES) — brand terms,
// product-category terms, and the PCD-franchise/distribution angle that's
// an explicit lead-gen goal for this site. Don't add category terms here
// that aren't real product lines on the site. MSL Biotech is a marketing
// company, not a manufacturer — don't add "manufacturer" terms.
const keywords = [
  "MSL Biotech",
  "MSL Biotech Private Limited",
  "Medicine Save Life",
  "pharmaceutical marketing company Guwahati",
  "pharmaceutical company Assam",
  "pharma marketing company Assam",
  "pharma marketing company Northeast India",
  "tablets supplier Guwahati",
  "capsules supplier Assam",
  "syrups supplier Guwahati",
  "nutraceutical products India",
  "pediatric medicines Assam",
  "diabetes care medicine Assam",
  "gastro care medicines",
  "personal care pharma products",
  "PCD pharma franchise Assam",
  "pharma franchise Guwahati",
  "pharmaceutical distributor partnership Assam",
  "pharma company Panjabari Guwahati",
  "generic medicines Northeast India",
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
