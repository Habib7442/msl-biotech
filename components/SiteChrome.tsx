"use client";

import { usePathname } from "next/navigation";
import ConsentBanner from "@/components/ConsentBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import EnquiryModal from "@/components/EnquiryModal";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import OrganizationJsonLd from "@/components/OrganizationJsonLd";
import { ContactProvider } from "@/components/ContactProvider";
import type { SiteContact } from "@/lib/contact";

interface SiteChromeProps {
  contact: SiteContact;
  /** GA4 measurement ID, or null where visits shouldn't be counted (see lib/analytics.ts). */
  analyticsId: string | null;
  children: React.ReactNode;
}

export default function SiteChrome({ contact, analyticsId, children }: SiteChromeProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  // The embedded Sanity Studio gets no analytics: staff editing isn't a visit.
  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <ContactProvider contact={contact}>
      {/* Asks first; Google Analytics loads only after "Accept" (DPDP Act). */}
      <ConsentBanner analyticsId={analyticsId} />
      <OrganizationJsonLd contact={contact} />
      <Preloader />
      <SmoothScroll>
        <Header />
        <main className="flex-1 flex flex-col w-full">{children}</main>
        <Footer />
        <FloatingContact />
        <EnquiryModal />
      </SmoothScroll>
    </ContactProvider>
  );
}
