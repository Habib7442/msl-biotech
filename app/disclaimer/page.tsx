import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Medical Disclaimer | MSL Biotech",
  description: "Read the regulatory medical disclaimer of MSL Biotech Private Limited. Always consult your physician before taking any medication.",
};

export default function MedicalDisclaimer() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-36 md:pb-20 text-left">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-gray-400 font-medium mb-4">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <span className="text-brand-navy">Medical Disclaimer</span>
      </div>

      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-[0_10px_30px_rgba(18,33,63,0.02)]">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-6 mb-6">
          <div className="p-3 rounded-2xl bg-red-50 text-red-500">
            <AlertTriangle className="size-6" />
          </div>
          <div>
            <h1 className="font-heading text-3xl font-bold text-brand-navy">
              Medical Disclaimer
            </h1>
            <p className="text-gray-400 text-xs mt-1">
              Essential Regulatory Notice for MSL Biotech Web Visitors
            </p>
          </div>
        </div>

        <div className="space-y-6 text-gray-500 text-sm leading-relaxed">
          <div className="bg-red-50/50 border border-red-100 text-red-700 font-semibold p-5 rounded-2xl mb-8">
            WARNING: DO NOT USE THE INFORMATION ON THIS SITE TO SELF-DIAGNOSE OR SELF-TREAT. ALWAYS CONSULT A REGISTERED MEDICAL PRACTITIONER.
          </div>

          <p>
            The content, including product monographs, active salt compositions, specifications, packaging descriptions, and general medical advice displayed on the <strong className="font-semibold text-brand-navy">MSL Biotech Private Limited</strong> website, is designed solely for informational and educational purposes.
          </p>

          <h2 className="font-heading text-lg font-bold text-brand-navy pt-4">
            1. No Physician-Patient Relationship
          </h2>
          <p>
            Use of this website or corresponding with our team via email, WhatsApp, or contact forms does not establish a physician-patient relationship. <strong className="font-semibold text-brand-navy">MSL Biotech</strong> is a manufacturing brand and does not employ online consulting doctors, dispense medical diagnoses, or write individual prescriptions.
          </p>

          <h2 className="font-heading text-lg font-bold text-brand-navy pt-4">
            2. Professional Medical Advice Is Essential
          </h2>
          <p>
            The chemical compositions listed under our product pages (e.g. Paracetamol, Pantoprazole, Amoxicillin, Metformin, etc.) possess therapeutic qualities that must be administered only under professional supervision. Never disregard professional clinical advice or delay seeking medical help because of information you have read on this website.
          </p>

          <h2 className="font-heading text-lg font-bold text-brand-navy pt-4">
            3. Schedule H & G Prescription Restrictions
          </h2>
          <p>
            Several formulations listed in our catalog are subject to Schedule H/G classification under Indian Drugs regulations. These products display warnings indicating: <em>"To be sold on the prescription of a registered medical practitioner only."</em> <strong className="font-semibold text-brand-navy">MSL Biotech</strong> does not offer e-commerce transactions, checkout baskets, or delivery fulfillment for these medications to individual consumers.
          </p>

          <h2 className="font-heading text-lg font-bold text-brand-navy pt-4">
            4. Absolute Limit of Liability
          </h2>
          <p>
            While we verify the accuracy of scientific compositions published in our catalog against standard drug regulations, <strong className="font-semibold text-brand-navy">MSL Biotech</strong> accepts no liability for errors, omissions, or the consequences of any actions taken based on website text. Any use of our formulations must be overseen by a licensed medical provider.
          </p>
        </div>
      </div>
    </div>
  );
}
