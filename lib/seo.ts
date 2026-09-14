import { Metadata } from "next";

export const defaultSEO: Metadata = {
  title: {
    default: "MSL Biotech | Pharmaceutical Manufacturer in Guwahati, Assam",
    template: "%s | MSL Biotech",
  },
  description: "MSL Biotech Private Limited is a pharmaceutical manufacturer in Guwahati, Assam, producing tablets, capsules, syrups, and nutraceuticals. Medicine Save Life.",
  metadataBase: new URL("https://mslbiotech.in"),
  openGraph: {
    title: "MSL Biotech | Pharmaceutical Manufacturer in Guwahati, Assam",
    description: "MSL Biotech Private Limited is a pharmaceutical manufacturer in Guwahati, Assam, producing tablets, capsules, syrups, and nutraceuticals. Medicine Save Life.",
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
    title: "MSL Biotech | Pharmaceutical Manufacturer in Guwahati, Assam",
    description: "MSL Biotech Private Limited is a pharmaceutical manufacturer in Guwahati, Assam, producing tablets, capsules, syrups, and nutraceuticals. Medicine Save Life.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicons/favicon.ico",
    shortcut: "/favicons/favicon.ico",
    apple: "/favicons/apple-touch-icon.png",
  },
};
