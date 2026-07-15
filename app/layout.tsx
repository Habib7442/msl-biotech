import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import EnquiryModal from "@/components/EnquiryModal";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";

import { defaultSEO } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata = defaultSEO;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <Preloader />
        <SmoothScroll>
          <Header />
          <main className="flex-1 flex flex-col w-full">
            {children}
          </main>
          <Footer />
          <FloatingContact />
          <EnquiryModal />
        </SmoothScroll>
      </body>
    </html>
  );
}



