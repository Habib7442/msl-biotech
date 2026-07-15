"use client";

import { useState, useEffect } from "react";
import { MessageSquare, ArrowUp } from "lucide-react";

export default function FloatingContact() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`flex items-center justify-center size-12 rounded-full bg-white text-primary border border-gray-100 shadow-[0_4px_16px_rgba(18,33,63,0.1)] transition-all hover:bg-gray-50 active:scale-95 duration-300 ${
          showScroll ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="size-5" />
      </button>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919999999999?text=Hello%20MSL%20Biotech,%20I%27d%20like%20to%20enquire%20about%20your%20products."
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center size-12 rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.3)] transition-all hover:scale-105 active:scale-95 duration-200 cursor-pointer"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulsing Outer Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/20 animate-ping pointer-events-none" />
        
        {/* SVG WhatsApp Logo */}
        <svg
          className="size-6 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.705 1.459h.008c6.56 0 11.9-5.336 11.902-11.894a11.864 11.864 0 00-3.481-8.413z" />
        </svg>
        
        {/* Floating tooltip */}
        <span className="absolute right-14 bg-slate-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 translate-x-4 pointer-events-none transition-all group-hover:opacity-100 group-hover:translate-x-0 duration-300 shadow-lg whitespace-nowrap">
          Chat with us
        </span>
      </a>
    </div>
  );
}
