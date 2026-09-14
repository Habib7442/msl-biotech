"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import EnquiryModal from "@/components/EnquiryModal";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import OrganizationJsonLd from "@/components/OrganizationJsonLd";

interface SiteChromeProps {
  children: React.ReactNode;
}

export default function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <OrganizationJsonLd />
      <Preloader />
      <SmoothScroll>
        <Header />
        <main className="flex-1 flex flex-col w-full">{children}</main>
        <Footer />
        <FloatingContact />
        <EnquiryModal />
      </SmoothScroll>
    </>
  );
}
