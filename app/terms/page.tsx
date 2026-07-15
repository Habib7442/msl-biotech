import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions | MSL Biotech",
  description: "Read the Terms & Conditions governing the use of MSL Biotech Private Limited's corporate website.",
};

export default function TermsConditions() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-36 md:pb-20 text-left">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-gray-400 font-medium mb-4">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <span className="text-brand-navy">Terms & Conditions</span>
      </div>

      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-[0_10px_30px_rgba(18,33,63,0.02)]">
        <h1 className="font-heading text-3xl font-bold text-brand-navy mb-6">
          Terms & Conditions
        </h1>
        <p className="text-gray-400 text-xs mb-8">
          Last Updated: July 15, 2026
        </p>

        <div className="space-y-6 text-gray-500 text-sm leading-relaxed">
          <p>
            Welcome to the corporate website of <strong className="font-semibold text-brand-navy">MSL Biotech Private Limited</strong>. By accessing or browsing this website and using our product enquiry functions, you agree to comply with and be bound by the following Terms and Conditions. Please review them carefully.
          </p>

          <h2 className="font-heading text-lg font-bold text-brand-navy pt-4">
            1. Informational Purpose Only
          </h2>
          <p>
            All content on this website, including drug compositions, therapeutic indications, storage guidelines, and health insights, is provided solely for educational and general informational purposes. <strong>It does not constitute professional medical advice, diagnosis, or treatment.</strong> Users must not rely on the information on this website to self-diagnose or self-medicate.
          </p>

          <h2 className="font-heading text-lg font-bold text-brand-navy pt-4">
            2. Compliance with Pharmaceutical Regulations
          </h2>
          <p>
            <strong className="font-semibold text-brand-navy">MSL Biotech</strong> is a compliant manufacturer operating under India's Drugs & Cosmetics Act. We do not engage in online transactions, direct retail sales of prescription drugs, or prescription fulfillment on this website. Our catalog is strictly enquiry-driven to coordinate supplies with registered medical practitioners, wholesale chemists, and licensed distributors.
          </p>

          <h2 className="font-heading text-lg font-bold text-brand-navy pt-4">
            3. Intellectual Property
          </h2>
          <p>
            The logos, text, layouts, graphics, and product names (such as Amoxigen, Paracit-500, and Cal-D3 Max) displayed on this website are the intellectual property of <strong className="font-semibold text-brand-navy">MSL Biotech Private Limited</strong>. Unauthorized duplication, modification, or commercial distribution of these materials without explicit written consent is strictly prohibited.
          </p>

          <h2 className="font-heading text-lg font-bold text-brand-navy pt-4">
            4. User Obligations & Accuracy of Data
          </h2>
          <p>
            When submitting an enquiry or registering interest in our PCD franchise network, you agree to provide accurate, truthful, and complete details. Submitting false email addresses, spamming form inputs, or harvesting data from our products index is a violation of these terms.
          </p>

          <h2 className="font-heading text-lg font-bold text-brand-navy pt-4">
            5. Limitation of Liability
          </h2>
          <p>
            While we strive to ensure that all information on this website is scientifically factual and up-to-date, <strong className="font-semibold text-brand-navy">MSL Biotech</strong> makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, or suitability of the website content. In no event shall <strong className="font-semibold text-brand-navy">MSL Biotech</strong> be held liable for any health issues, claims, or damages resulting from reliance on the informational text of this website.
          </p>
        </div>
      </div>
    </div>
  );
}
