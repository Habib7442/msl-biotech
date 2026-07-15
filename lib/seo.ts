import { Metadata } from "next";

export const defaultSEO: Metadata = {
  title: {
    default: "MSL Biotech | Medicine Save Life",
    template: "%s | MSL Biotech",
  },
  description: "MSL Biotech Private Limited is a premium pharmaceutical manufacturing and healthcare brand dedicated to quality care across generations.",
  metadataBase: new URL("https://mslbiotech.in"),
  openGraph: {
    title: "MSL Biotech | Medicine Save Life",
    description: "MSL Biotech Private Limited is a premium pharmaceutical manufacturing and healthcare brand dedicated to quality care across generations.",
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
    title: "MSL Biotech | Medicine Save Life",
    description: "MSL Biotech Private Limited is a premium pharmaceutical manufacturing and healthcare brand dedicated to quality care across generations.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/favicons/favicon.ico",
    shortcut: "/favicons/favicon.ico",
    apple: "/favicons/apple-touch-icon.png",
  },
};
