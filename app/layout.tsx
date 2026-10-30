import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SiteChrome from "@/components/SiteChrome";

import { urlForImage } from "@/lib/sanity/image";
import { analyticsId } from "@/lib/analytics";
import { getSiteContact, getSiteSettings } from "@/lib/sanity/settings";
import { defaultSEO } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
});

// Site-wide defaults. The SEO title, description and share image set in the
// admin panel (Settings → SEO defaults) override the coded ones when present.
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  if (!settings) return defaultSEO;

  const title = settings.defaultSeoTitle || undefined;
  const description = settings.defaultSeoDescription || undefined;
  const image = settings.defaultOgImage?.asset?._ref
    ? {
        url: urlForImage(settings.defaultOgImage).width(1200).height(630).fit("crop").auto("format").url(),
        width: 1200,
        height: 630,
        alt: settings.defaultOgImage.alt || "MSL Biotech",
      }
    : undefined;
  if (!title && !description && !image) return defaultSEO;

  return {
    ...defaultSEO,
    ...(title ? { title: { default: title, template: "%s | MSL Biotech" } } : {}),
    ...(description ? { description } : {}),
    openGraph: {
      ...defaultSEO.openGraph,
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      ...(image ? { images: [image] } : {}),
    },
    twitter: {
      ...defaultSEO.twitter,
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      ...(image ? { images: [image.url] } : {}),
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Contact details from the admin panel (same cached read as the metadata above).
  const contact = await getSiteContact();
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        inter.variable,
        montserrat.variable,
        "font-sans"
      )}
    >
      <body className="min-h-full flex flex-col bg-[#F4F7FB] text-[#12213F]">
        <SiteChrome contact={contact} analyticsId={analyticsId()}>{children}</SiteChrome>
      </body>
    </html>
  );
}



