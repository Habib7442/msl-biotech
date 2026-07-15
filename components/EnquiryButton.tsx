"use client";

import { MessageSquare } from "lucide-react";

interface EnquiryButtonProps {
  productName: string;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function EnquiryButton({ 
  productName, 
  variant = "primary", 
  className = "" 
}: EnquiryButtonProps) {
  
  const handleOpen = () => {
    window.dispatchEvent(
      new CustomEvent("open-enquiry", {
        detail: { subject: productName }
      })
    );
  };

  if (variant === "secondary") {
    return (
      <button
        onClick={handleOpen}
        className={`border-2 border-[#184EA4] text-[#184EA4] hover:bg-[#184EA4]/5 font-bold py-3 px-6 rounded-xl text-xs transition-all duration-200 cursor-pointer ${className}`}
      >
        Enquire Now
      </button>
    );
  }

  return (
    <button
      onClick={handleOpen}
      className={`bg-[#7FC700] hover:bg-[#6eb200] text-[#12213F] font-bold py-3.5 px-8 rounded-xl text-sm transition-all duration-200 shadow-md cursor-pointer flex items-center justify-center gap-2 ${className}`}
    >
      <MessageSquare className="size-4" />
      <span>Submit Enquiry</span>
    </button>
  );
}
