import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Heart, ShieldCheck, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | MSL Biotech",
  description: "Learn about MSL Biotech Private Limited's mission to save lives through affordable, high-quality, WHO-GMP certified pharmaceuticals.",
};

export default function About() {
  const values = [
    {
      title: "Quality First",
      desc: "Every formulation must exceed baseline quality parameters before dispatch. We do not compromise on purity.",
      icon: ShieldCheck,
    },
    {
      title: "Compassionate Empathy",
      desc: "Our work directly affects human healing. We treat every medicine as if it were for our own family.",
      icon: Heart,
    },
    {
      title: "Professional Integrity",
      desc: "Full compliance with the Drugs & Cosmetics Act and honest, transparent pricing pathways.",
      icon: HelpCircle,
    },
  ];

  return (
    <div className="w-full">
      {/* Subpage Header Banner */}
      <section className="bg-[#12213F] text-white pt-28 pb-16 md:pt-36 md:pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col gap-2.5">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
              <Link href="/" className="hover:text-[#7FC700] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">About Us</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-tight">
              About MSL Biotech
            </h1>
            <p className="text-gray-400 text-sm max-w-xl">
              Established with a singular commitment captured by our motto: *Medicine Save Life*.
            </p>
          </div>
        </div>
      </section>

      {/* Corporate Narrative & Story */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Column: Big Founding year indicator */}
            <div className="lg:col-span-5 flex flex-col gap-6 bg-[#F4F7FB] p-8 sm:p-10 rounded-[32px] border border-gray-100">
              <div className="text-[#184EA4] font-heading text-7xl font-extrabold leading-none">
                2011
              </div>
              <h3 className="font-heading text-xl font-bold text-brand-navy">
                Our Founding & Rise
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                Starting as a specialized clinical formulations developer in Guwahati, Assam, <strong className="font-bold text-brand-navy">MSL Biotech Private Limited</strong> has grown to distribute over 120 therapeutic products across 28 states, backed by strict WHO-GMP compliance.
              </p>
              <div className="border-t border-gray-200/60 pt-6 mt-2 grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-heading text-2xl font-bold text-primary">120+</h4>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Approved Products</p>
                </div>
                <div>
                  <h4 className="font-heading text-2xl font-bold text-primary">28+</h4>
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Indian States</p>
                </div>
              </div>
            </div>

            {/* Right Column: Narrative */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-navy leading-snug">
                Pioneering Accessible Healthcare Solutions Across Generations
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                MSL Biotech was founded on the belief that premium-grade medications should not be a luxury. Over the past decade and a half, we have dedicated ourselves to building a robust manufacturing footprint that blends technological biotechnology precision with empathetic, patient-first care.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Whether formulating child-safe pediatric drops, sustained-release glycemic controllers for Type 2 diabetes, or broad-spectrum penicillin capsules, we apply uniform rigor. Every raw ingredient, chemical process, and batch packaging is monitored by a team of veteran Quality Assurance (QA) experts.
              </p>
              <div className="mt-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 bg-[#7FC700] hover:bg-[#6eb200] text-[#12213F] font-bold px-6 py-3.5 rounded-xl text-xs transition-colors shadow-md"
                >
                  <span>Explore Our Formulations</span>
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="bg-[#F4F7FB] py-20 border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Mission Card */}
            <div className="bg-[#EAF4DA] rounded-[32px] p-8 sm:p-10 border border-[#dcecc1] shadow-sm text-left flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-4">
                  Our Mission
                </span>
                <h3 className="font-heading text-2xl font-bold text-brand-navy mb-4">
                  Democratizing Healthcare Access
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed mb-8">
                  To research, manufacture, and distribute essential life-saving and life-enhancing medications complying with the highest international standards, ensuring that every family, from the very first breath, has access to affordable, reliable healing.
                </p>
              </div>
              <ul className="space-y-3">
                {["Ethical raw sourcing", "Affordable medicine pricing", "Pan-India logistics"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-brand-navy">
                    <Check className="size-4 text-[#7FC700]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision Card */}
            <div className="bg-white rounded-[32px] p-8 sm:p-10 border border-gray-100 shadow-sm text-left flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-4">
                  Our Vision
                </span>
                <h3 className="font-heading text-2xl font-bold text-brand-navy mb-4">
                  To Be India's Most Trusted Pharma Brand
                </h3>
                <p className="text-gray-600 text-xs leading-relaxed mb-8">
                  To stand as the absolute gold standard of pharmaceutical reliability and therapeutic efficacy. We envision a future where the MSL Biotech mark on a formulation serves as an unquestioned guarantee of health, wellness, and quality care across generations.
                </p>
              </div>
              <ul className="space-y-3">
                {["WHO-GMP global compliance", "Biotech formulary innovation", "Sustainable manufacturing"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-brand-navy">
                    <Check className="size-4 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-heading text-3xl font-bold text-brand-navy mb-3">
              Values That Drive Us
            </h2>
            <p className="text-gray-500 text-sm">
              We operate under an unyielding code of medical ethics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, idx) => {
              const IconComp = value.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-[24px] p-8 border border-gray-100 shadow-[0_10px_30px_rgba(18,33,63,0.02)] text-left flex flex-col items-start hover:shadow-[0_15px_35px_rgba(18,33,63,0.05)] transition-all duration-300"
                >
                  <div className="size-12 rounded-full bg-[#EAF4DA] text-primary flex items-center justify-center mb-6">
                    <IconComp className="size-5 text-[#184EA4]" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-brand-navy mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
