"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Star,
  Award,
  ShieldCheck,
  Users,
  Heart,
  Clock,
  ChevronRight,
  Activity,
  Flame,
  Layers,
  Thermometer,
  Eye,
  Plus,
  Lightbulb,
  UserCheck
} from "lucide-react";
import { PRODUCTS, TESTIMONIALS, CATEGORIES } from "@/lib/data";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  const openEnquiry = (subject?: string) => {
    window.dispatchEvent(new CustomEvent("open-enquiry", { detail: { subject } }));
  };

  const categoryMetaData: { [key: string]: { tagline: string; color: string; cardBg: string; imagePath: string } } = {
    "Tablets": { tagline: "Solid Oral Dose", color: "border-blue-100/50 bg-blue-50/10", cardBg: "bg-blue-50/20 hover:bg-blue-50/40 border-blue-100/40", imagePath: "/images/categories/tablets.png" },
    "Capsules": { tagline: "Gelatin Shelled", color: "border-purple-100/50 bg-purple-50/10", cardBg: "bg-purple-50/20 hover:bg-purple-50/40 border-purple-100/40", imagePath: "/images/categories/capsules.png" },
    "Syrups": { tagline: "Liquid Formulations", color: "border-orange-100/50 bg-orange-50/10", cardBg: "bg-orange-50/20 hover:bg-orange-50/40 border-orange-100/40", imagePath: "/images/categories/syrups.png" },
    "Nutraceuticals": { tagline: "Daily Supplements", color: "border-red-100/50 bg-red-50/10", cardBg: "bg-red-50/20 hover:bg-red-50/40 border-red-100/40", imagePath: "/images/categories/nutraceuticals.png" },
    "Pediatric Care": { tagline: "Child Safe Drops", color: "border-pink-100/50 bg-pink-50/10", cardBg: "bg-pink-50/20 hover:bg-pink-50/40 border-pink-100/40", imagePath: "/images/categories/pediatric.png" },
    "Diabetes Care": { tagline: "Glycemic Solutions", color: "border-cyan-100/50 bg-cyan-50/10", cardBg: "bg-cyan-50/20 hover:bg-cyan-50/40 border-cyan-100/40", imagePath: "/images/categories/diabetes.png" },
    "Gastro Care": { tagline: "Reflux Inhibitors", color: "border-emerald-100/50 bg-emerald-50/10", cardBg: "bg-emerald-50/20 hover:bg-emerald-50/40 border-emerald-100/40", imagePath: "/images/categories/gastro.png" },
    "Personal Care": { tagline: "Somatic Skin Gels", color: "border-yellow-100/50 bg-yellow-50/10", cardBg: "bg-yellow-50/20 hover:bg-yellow-50/40 border-yellow-100/40", imagePath: "/images/categories/personal.png" },
  };

  const featuredProducts = PRODUCTS.filter((p) => p.featured);

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <section className="relative bg-white pt-28 pb-20 lg:pt-36 lg:pb-24 overflow-hidden border-b border-gray-50 flex items-center min-h-[550px]">
        {/* Hero Background Image */}
        <Image
          src="/hero_bg.webp"
          alt="Hero Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right pointer-events-none z-0"
        />

        {/* Dark Netflix-style overlay for mobile/tablet (hidden on large screens) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 lg:hidden z-0 pointer-events-none" />


        {/* Soft Background Accent circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none z-0" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none z-0" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

            {/* Left Column Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-8 flex flex-col gap-6 text-center lg:text-left relative z-10"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white lg:bg-[#EAF4DA] lg:border-[#dcecc1] lg:text-primary px-4 py-1.5 rounded-full text-xs font-bold w-fit mx-auto lg:mx-0">
                <span className="size-2 rounded-full bg-[#7FC700] animate-pulse" />
                <span className="uppercase tracking-widest text-white lg:text-[#184EA4]">Medicine Save Life</span>
              </div>

              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white lg:text-brand-navy leading-[1.15] tracking-tight max-w-xl lg:max-w-[600px] mx-auto lg:mx-0">
                Caring for Life, <br />
                <span className="text-[#7FC700] lg:text-primary">
                  From the Very First Breath
                </span>
              </h1>

              <p className="text-white/95 lg:text-gray-700 font-medium text-base sm:text-lg max-w-xl leading-relaxed mx-auto lg:mx-0">
                <strong className="font-bold text-white lg:text-brand-navy">MSL Biotech Private Limited</strong> delivers premium-quality, WHO-GMP certified pharmaceuticals. We safeguard health across generations with reliable and accessible formulations.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mt-2">
                <Link
                  href="/products"
                  className="w-full sm:w-auto text-center bg-[#7FC700] hover:bg-[#6eb200] text-[#12213F] font-bold px-8 py-4 rounded-xl shadow-[0_4px_16px_rgba(127,199,0,0.3)] transition-all hover:-translate-y-0.5 duration-200"
                >
                  Explore Products
                </Link>
                <Link
                  href="/about"
                  className="w-full sm:w-auto text-center border-2 border-white text-white hover:bg-white/10 lg:border-[#184EA4] lg:text-[#184EA4] lg:hover:bg-[#184EA4]/5 font-bold px-8 py-4 rounded-xl transition-all duration-200"
                >
                  Know More About Us
                </Link>
              </div>

              {/* Trust badges */}
              <div className="border-t border-white/10 lg:border-gray-100 pt-8 mt-4 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center size-8 rounded-full bg-emerald-500/20 text-emerald-300 lg:bg-emerald-50 lg:text-emerald-600">
                    <Check className="size-4" />
                  </div>
                  <div className="text-[11px] font-bold text-white lg:text-brand-navy leading-tight">
                    WHO-GMP<br /><span className="text-white/70 lg:text-gray-400 font-normal">Certified</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center size-8 rounded-full bg-emerald-500/20 text-emerald-300 lg:bg-emerald-50 lg:text-emerald-600">
                    <Check className="size-4" />
                  </div>
                  <div className="text-[11px] font-bold text-white lg:text-brand-navy leading-tight">
                    CIN Registered<br /><span className="text-white/70 lg:text-gray-400 font-normal text-[9px] break-all">U47721AS2026PTC030611</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center size-8 rounded-full bg-emerald-500/20 text-emerald-300 lg:bg-emerald-50 lg:text-emerald-600">
                    <Check className="size-4" />
                  </div>
                  <div className="text-[11px] font-bold text-white lg:text-brand-navy leading-tight">
                    100% Quality<br /><span className="text-white/70 lg:text-gray-400 font-normal">Assured</span>
                  </div>
                </div>
              </div>

              {/* Patient Trust Indicator */}
              <div className="flex items-center justify-center lg:justify-start gap-2.5 mt-2 text-xs text-white/80 lg:text-gray-500">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span>Trusted by 5,000+ families & pharmacists</span>
              </div>

            </motion.div>



          </div>
        </div>
      </section>

      {/* 3. PRODUCT RANGE (CATEGORIES) */}
      <section className="bg-white py-20 md:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >

          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl font-bold text-brand-navy mb-3">
              Explore Our Product Range
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              We manufacture a comprehensive catalog of therapeutic solutions. Click on a category below to explore dedicated formulations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => {
              const meta = categoryMetaData[cat] || { tagline: "Healthcare solutions", color: "border-blue-100/50 bg-blue-50/10", cardBg: "bg-blue-50/20 hover:bg-blue-50/40 border-blue-100/40", imagePath: "/images/categories/tablets.png" };
              return (
                <Link
                  key={cat}
                  href={`/products?category=${encodeURIComponent(cat)}`}
                  className={`group rounded-3xl p-6 border ${meta.cardBg} shadow-[0_10px_30px_rgba(18,33,63,0.01)] hover:shadow-[0_15px_35px_rgba(18,33,63,0.03)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-start text-left relative overflow-hidden`}
                >
                  {/* Specific Illustration Watermark Background */}
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 z-0 pointer-events-none opacity-[0.25] group-hover:opacity-[0.40] group-hover:scale-110 transition-all duration-500">
                    <Image
                      src={meta.imagePath}
                      alt={`${cat} Watermark`}
                      fill
                      sizes="96px"
                      className="object-contain"
                    />
                  </div>

                  <div className={`relative z-10 size-12 rounded-full border ${meta.color} mb-6 flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                    <Image
                      src={meta.imagePath}
                      alt={cat}
                      width={28}
                      height={28}
                      className="object-contain rounded-full"
                    />
                  </div>
                  <h3 className="relative z-10 font-heading text-lg font-bold text-brand-navy group-hover:text-primary transition-colors mb-1.5">
                    {cat
                  }</h3>
                  <p className="relative z-10 text-gray-400 text-xs mb-6">
                    {meta.tagline}
                  </p>
                  <div className="relative z-10 flex items-center gap-1 text-[11px] font-bold text-primary mt-auto">
                    <span>View Catalog</span>
                    <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>

        </motion.div>
      </section>

      {/* 4. FEATURED PRODUCTS */}
      <section className="bg-[#F4F7FB] py-20 md:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 text-center sm:text-left">
            <div>
              <h2 className="font-heading text-3xl font-bold text-brand-navy mb-2">
                Featured Formulations
              </h2>
              <p className="text-gray-500 text-sm">
                Our leading prescription and OTC therapeutic products.
              </p>
            </div>
            <Link
              href="/products"
              className="flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors"
            >
              <span>View Full Catalog</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div 
            className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-6 pb-6 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0 snap-x snap-mandatory scrollbar-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {featuredProducts.map((prod) => (
              <Link
                key={prod.id}
                href={`/products/${prod.id}`}
                className="group/card bg-white rounded-3xl p-5 border border-gray-100/60 shadow-[0_4px_20px_rgba(18,33,63,0.02)] hover:shadow-[0_12px_30px_rgba(18,33,63,0.06)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between w-[285px] lg:w-auto shrink-0 snap-center text-left"
              >
                <div>
                  {/* Compact Image Container */}
                  <div className="h-64 relative w-full rounded-2xl overflow-hidden mb-4 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center border border-gray-100/30 group-hover/card:scale-[1.02] transition-transform duration-500">
                    <Award className="size-12 text-primary/30" />
                    <span className="absolute top-3 left-3 rounded-full bg-[#EAF4DA] px-2.5 py-0.5 text-[9px] font-bold text-primary shadow-xs">
                      {prod.category}
                    </span>
                  </div>

                  {/* Product Name */}
                  <h3 className="font-heading text-sm font-bold text-brand-navy group-hover/card:text-primary transition-colors mb-1 leading-snug">
                    {prod.name}
                  </h3>

                  {/* One Line Short Description */}
                  <p className="text-gray-500 text-[11px] line-clamp-1 leading-relaxed">
                    {prod.description}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mt-4 pt-3 border-t border-gray-50">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">(5.0)</span>
                </div>
              </Link>
            ))}
          </div>

        </motion.div>
      </section>

      {/* 5. ABOUT / WHY US */}
      <section className="bg-white py-20 md:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column Image */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[450px] aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-[#EAF4DA] p-1.5">
                <div className="relative w-full h-full rounded-[22px] overflow-hidden">
                  <Image
                    src="/images/our_motivation.webp"
                    alt="Our Motivation"
                    fill
                    sizes="(max-w-768px) 100vw, 450px"
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Right Column Text */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                Our Motivation
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-brand-navy leading-snug">
                What Motivates Us to Bring the Best to You
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                At <strong className="font-bold text-brand-navy">MSL Biotech</strong>, we believe that healthcare is a fundamental human right. Our daily commitment is fueled by the hope of saving lives and improving physical wellness across generations.
              </p>

              <ul className="space-y-4 text-left max-w-md mx-auto lg:mx-0">
                {[
                  "State-of-the-art manufacturing complying with international guidelines",
                  "Certified quality check at every stage of the raw-to-packaged supply chain",
                  "Affordable pricing matrices ensuring public health access",
                  "Pan-India distribution networks for timely delivery"
                ].map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs text-gray-500">
                    <div className="size-5 rounded-full bg-[#EAF4DA] text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="size-3 text-[#7FC700]" />
                    </div>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex justify-center lg:justify-start">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-container text-white font-bold px-6 py-3 rounded-xl text-xs transition-colors shadow-md"
                >
                  <span>Know More About Us</span>
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* 6. OUR VALUES */}
      <section className="bg-[#F4F7FB] py-20 md:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >

          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl font-bold text-brand-navy mb-3">
              Our Core Pillars
            </h2>
            <p className="text-gray-500 text-sm">
              The values that dictate our chemical research and corporate operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: "Quality", desc: "Unyielding standards of purity and formulation effectiveness.", icon: Award },
              { title: "Empathy", desc: "Focusing on patient pain relief and support.", icon: Heart },
              { title: "Integrity", desc: "Honesty in pricing and compliant manufacturing guidelines.", icon: ShieldCheck },
              { title: "Innovation", desc: "Embracing medical biotech research updates.", icon: Lightbulb },
              { title: "Customer First", desc: "Prioritizing timely distribution to our chemist networks.", icon: UserCheck }
            ].map((value, idx) => {
              const IconComponent = value.icon;
              return (
                <div key={idx} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_10px_30px_rgba(18,33,63,0.02)] text-center flex flex-col items-center">
                  <div className="size-12 rounded-full bg-[#EAF4DA] text-primary flex items-center justify-center mb-6">
                    <IconComponent className="size-5 text-[#184EA4]" />
                  </div>
                <h3 className="font-heading text-base font-bold text-brand-navy mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-400 text-[11px] leading-relaxed">
                  {value.desc}
                </p>
              </div>
            );
          })}
          </div>

        </motion.div>
      </section>

      {/* 7. CARE BAND */}
      <section className="bg-gradient-to-r from-[#7FC700] to-[#91db0b] text-[#12213F] py-16">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="max-w-xl">
              <h2 className="font-heading text-3xl font-bold text-brand-navy mb-4">
                Let Us Take Care of Your Health
              </h2>
              <p className="text-brand-navy/85 text-sm leading-relaxed">
                Connect directly with our corporate medical relations team on WhatsApp. Ask about products availability, dosage guidelines, or franchise partnerships.
              </p>
            </div>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#12213F] hover:bg-[#1c3057] text-white font-bold px-8 py-4 rounded-xl text-sm transition-all hover:scale-105 shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Chat on WhatsApp</span>
              <ChevronRight className="size-4" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="bg-white py-20 md:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >

          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl font-bold text-brand-navy mb-3">
              Trusted by Professionals & Families
            </h2>
            <p className="text-gray-500 text-sm">
              Read real-life testimonials from pharmacists, doctors, and consumers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_10px_30px_rgba(18,33,63,0.03)] flex flex-col justify-between text-left"
              >
                <div>
                  <div className="flex gap-0.5 mb-6">
                    {[...Array(test.rating)].map((_, i) => (
                      <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed italic mb-8">
                    &ldquo;{test.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-4 border-t border-gray-50 pt-6">
                  {/* Avatar Placeholder */}
                  <div className="size-10 rounded-full bg-[#F4F7FB] border border-gray-100 flex items-center justify-center font-bold text-primary text-xs">
                    {test.name[0]}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-navy">
                      {test.name}
                    </h4>
                    <p className="text-[10px] text-gray-400">
                      {test.role}
                    </p>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </motion.div>
      </section>

    </div>
  );
}
