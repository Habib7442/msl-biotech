import Link from "next/link";
import { AlertCircle, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-grow flex items-center justify-center py-24 bg-[#F4F7FB] px-4">
      <div className="bg-white rounded-[32px] p-8 sm:p-12 border border-gray-100 shadow-[0_10px_30px_rgba(18,33,63,0.03)] text-center max-w-md w-full flex flex-col items-center gap-6">
        
        {/* Visual Icon */}
        <div className="size-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center animate-bounce-slow">
          <AlertCircle className="size-8" />
        </div>

        <div className="space-y-2">
          {/* Big Header */}
          <div className="text-primary font-heading text-7xl font-extrabold tracking-tight">
            404
          </div>
          <h2 className="font-heading text-xl font-bold text-brand-navy">
            Page Not Found
          </h2>
          <p className="text-gray-400 text-xs leading-relaxed">
            The pharmaceutical file or health resource you are looking for has been relocated, renamed, or is currently unavailable.
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/"
          className="w-full bg-[#7FC700] hover:bg-[#6eb200] text-[#12213F] font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md mt-2"
        >
          <span>Return Home</span>
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
