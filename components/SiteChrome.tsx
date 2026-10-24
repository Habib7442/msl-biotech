"use client";

import { usePathname } from "next/navigation";
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
  children: React.ReactNode;
}

export default function SiteChrome({ contact, children }: SiteChromeProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <ContactProvider contact={contact}>
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
