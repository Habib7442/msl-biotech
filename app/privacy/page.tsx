import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | MSL Biotech",
  description: "Read the Privacy Policy of MSL Biotech Private Limited. We are committed to protecting your personal data in accordance with the Indian DPDP Act.",
};

export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-36 md:pb-20 text-left">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-gray-400 font-medium mb-4">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <span className="text-brand-navy">Privacy Policy</span>
      </div>

      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-[0_10px_30px_rgba(18,33,63,0.02)]">
        <h1 className="font-heading text-3xl font-bold text-brand-navy mb-6">
          Privacy Policy
        </h1>
        <p className="text-gray-400 text-xs mb-8">
          Last Updated: July 15, 2026
        </p>

        <div className="space-y-6 text-gray-500 text-sm leading-relaxed">
          <p>
            At <strong className="font-semibold text-brand-navy">MSL Biotech Private Limited</strong>, we prioritize the protection of your personal information. This Privacy Policy outlines how we collect, use, process, and protect your personal data when you visit our corporate pharmaceutical website, submit product enquiry forms, or correspond with our relations team.
          </p>

          <h2 className="font-heading text-lg font-bold text-brand-navy pt-4">
            1. Consent & Compliance (India DPDP Act)
          </h2>
          <p>
            By submitting information through our contact or product enquiry forms, you explicitly consent to the collection and storage of your personal details (such as Name, Email, and Phone number) by <strong className="font-semibold text-brand-navy">MSL Biotech</strong>. In compliance with India's <strong>Digital Personal Data Protection (DPDP) Act</strong>, we only process data for the explicit purpose of responding to your business inquiries. You retain the right to withdraw your consent or request data correction/erasure at any time by emailing us at <a href="mailto:info@mslbiotech.com" className="text-primary font-semibold hover:underline">info@mslbiotech.com</a>.
          </p>

          <h2 className="font-heading text-lg font-bold text-brand-navy pt-4">
            2. Information We Collect
          </h2>
          <p>
            We collect information that you voluntarily provide to us when using our website, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Enquiry Details</strong>: Full Name, Email address, phone number, and bulk product requirements that you type into our form boxes.</li>
            <li><strong>Usage Logs</strong>: Anonymized analytics details such as browser type, time spent browsing catalog sections, and click-through tracking on call/WhatsApp shortcuts.</li>
          </ul>

          <h2 className="font-heading text-lg font-bold text-brand-navy pt-4">
            3. How We Use Your Data
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To reply to your queries regarding pricing, salt compositions, packaging, or franchise logistics.</li>
            <li>To compile anonymous metrics to optimize our website loading speed and performance.</li>
            <li>To coordinate shipping and supply parameters with our chemist and distributor networks.</li>
          </ul>

          <h2 className="font-heading text-lg font-bold text-brand-navy pt-4">
            4. Data Security & Storage
          </h2>
          <p>
            Your information is stored securely on encrypted server layers and is never sold, traded, or shared with third-party marketing firms. Access is strictly limited to authorized <strong className="font-semibold text-brand-navy">MSL Biotech</strong> business directors and operations administrators. We retain details only as long as necessary to fulfill your enquiry or complete our distributor partnership negotiations.
          </p>

          <h2 className="font-heading text-lg font-bold text-brand-navy pt-4">
            5. Cookies
          </h2>
          <p>
            We use essential site cookies to maintain state and track basic user interactions (like category active tabs). You can configure your browser to reject cookies, though some layout state properties may reset.
          </p>
        </div>
      </div>
    </div>
  );
}
