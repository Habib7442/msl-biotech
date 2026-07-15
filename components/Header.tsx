"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Phone, ArrowRight } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Contact", href: "/contact" },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(18,33,63,0.08)] border-b border-gray-100 py-3"
          : "bg-transparent border-b border-transparent py-4"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between relative">
          {/* Logo Section */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Image
              src="/logo.webp"
              alt="MSL Biotech Logo"
              width={180}
              height={50}
              priority
              className="h-13 w-auto object-contain rounded-xl overflow-hidden"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary font-semibold" : "text-brand-navy/80"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="tel:+919859757710"
              className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              <Phone className="size-4 animate-pulse" />
              <span>+91 98597 57710</span>
            </a>
            <Link
              href="/contact"
              className="group flex items-center gap-2 bg-[#7FC700] hover:bg-[#6eb200] text-[#12213F] font-bold text-sm px-5 py-2.5 rounded-xl transition-all shadow-[0_4px_12px_rgba(127,199,0,0.2)] hover:shadow-[0_6px_16px_rgba(127,199,0,0.3)] duration-200"
            >
              <span>Enquire Now</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 duration-200" />
            </Link>
          </div>

          {/* Mobile Menu Button using Shadcn Sheet */}
          <div className="flex items-center gap-4 md:hidden">
            <a
              href="tel:+919859757710"
              className={`flex items-center justify-center p-2 rounded-xl transition-colors ${
                isScrolled
                  ? "text-primary bg-[#F4F7FB]"
                  : "text-white bg-white/10 hover:bg-white/20"
              }`}
            >
              <Phone className="size-4" />
            </a>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger
                render={
                  <button
                    className={`flex items-center justify-center p-2 rounded-xl transition-colors cursor-pointer ${
                      isScrolled
                        ? "text-brand-navy hover:bg-[#F4F7FB]"
                        : "text-white hover:bg-white/10"
                    }`}
                    aria-label="Toggle Menu"
                  />
                }
              >
                <Menu className="size-6" />
              </SheetTrigger>
              <SheetContent side="right" className="bg-white p-6 flex flex-col justify-between" showCloseButton={true}>
                <div className="flex flex-col gap-6 mt-12 text-left">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={handleLinkClick}
                        className={`text-lg font-medium py-2 border-b border-gray-50 transition-colors ${
                          isActive ? "text-primary font-bold border-primary/20" : "text-brand-navy/80 hover:text-primary"
                        }`}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </div>

                <div className="flex flex-col gap-4 mt-auto">
                  <a
                    href="tel:+919859757710"
                    className="flex items-center justify-center gap-3 bg-[#F4F7FB] text-primary font-bold py-3.5 rounded-xl text-sm"
                  >
                    <Phone className="size-4" />
                    <span>Call +91 98597 57710</span>
                  </a>
                  <Link
                    href="/contact"
                    onClick={handleLinkClick}
                    className="flex items-center justify-center gap-2 bg-[#7FC700] hover:bg-[#6eb200] text-[#12213F] font-bold py-3.5 rounded-xl text-sm shadow-md"
                  >
                    <span>Enquire Now</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
