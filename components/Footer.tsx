"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";
import { CATEGORIES } from "@/lib/data";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Simulate subscription
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="bg-[#12213F] text-white pt-16 pb-8 border-t border-slate-800 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Banner */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-8 md:p-12 mb-16 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md">
            <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-2">
              Subscribe to Health Updates
            </h3>
            <p className="text-white/80 text-sm">
              Get the latest medical articles, product compliance updates, and health insights directly to your inbox.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex flex-col sm:flex-row gap-3 min-w-[320px]">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your professional email"
              required
              className="bg-white/10 border border-white/20 text-white rounded-xl px-4 py-3.5 text-sm placeholder:text-white/50 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/10 transition-all flex-grow"
            />
            <button
              type="submit"
              className="bg-[#7FC700] hover:bg-[#6eb200] text-[#12213F] font-bold px-6 py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shrink-0 cursor-pointer"
            >
              {subscribed ? (
                <>
                  <Check className="size-4" />
                  <span>Subscribed!</span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <Send className="size-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footgrid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/logo.webp"
                alt="MSL Biotech Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              <strong className="font-bold text-white">MSL Biotech Private Limited</strong> is a WHO-GMP and ISO certified pharmaceutical manufacturer committed to bringing premium, reliable, and affordable healthcare solutions to families nationwide.
            </p>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">
                CIN: U47721AS2026PTC030611
              </span>
              <div className="inline-flex items-center gap-2 bg-emerald-950/40 border border-emerald-900 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#7FC700] w-fit">
                <span className="size-2 rounded-full bg-[#7FC700] animate-ping" />
                <span>Medicine Save Life</span>
              </div>
            </div>
          </div>

          {/* Categories Index */}
          <div>
            <h4 className="font-heading text-base font-bold mb-6 text-white uppercase tracking-wider">
              Product Range
            </h4>
            <ul className="space-y-3">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/products?category=${encodeURIComponent(cat)}`}
                    className="text-gray-400 hover:text-[#7FC700] text-sm transition-colors"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-base font-bold mb-6 text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-400 hover:text-[#7FC700] text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-[#7FC700] text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-[#7FC700] text-sm transition-colors">
                  Contact & Enquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-heading text-base font-bold mb-6 text-white uppercase tracking-wider">
              Corporate Office
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="size-5 text-[#7FC700] shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm leading-relaxed">
                  H.NO 60, Satgoan Road, Nowapara Bagharbari Ghy, Panjabari, GMC, Kamrup - 781037, Assam, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-5 text-[#7FC700] shrink-0" />
                <a
                  href="tel:+919859757710"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  +91 98597 57710
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-5 text-[#7FC700] shrink-0" />
                <a
                  href="mailto:info@mslbiotech.com"
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  info@mslbiotech.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Medical & Regulatory Disclaimer */}
        <div className="border-t border-slate-800 pt-8 pb-6">
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 text-gray-400 text-xs leading-relaxed max-w-5xl mx-auto text-center">
            <span className="font-bold text-white block mb-2 uppercase tracking-widest text-[10px] text-[#7FC700]">
              Regulatory Medical Disclaimer
            </span>
            The information provided on this website, including product descriptions, salt compositions, health blogs, and general medical insights, is for informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this website. Products containing Schedule H/prescription drugs must not be purchased without a prescription from a registered medical practitioner.
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} MSL Biotech Private Limited. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">
              Medical Disclaimer
            </Link>
          </div>
        </div>

      </div>

      {/* Large Background Text Watermark */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 select-none pointer-events-none text-white/[0.03] font-heading text-[12vw] font-black tracking-widest whitespace-nowrap leading-none z-0">
        MSL BIOTECH
      </div>
    </footer>
  );
}
