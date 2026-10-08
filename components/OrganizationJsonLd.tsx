import { SITE_URL } from "@/lib/seo";

// Structured data (schema.org Organization) for search engines. Every field
// here must be real, verifiable info already shown elsewhere on the site
// (Footer, Contact page) — no invented stats or unverified certifications.
export default function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MSL Biotech Private Limited",
    alternateName: "MSL Biotech",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.webp`,
    description: "Pharmaceutical marketing company in Guwahati, Assam offering tablets, capsules, syrups, and nutraceuticals.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "H.NO 60, Satgoan Road, Nowapara Bagharbari Ghy, Panjabari, GMC",
      addressLocality: "Guwahati",
      addressRegion: "Assam",
      postalCode: "781037",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-98597-57710",
      contactType: "customer service",
      email: "info@mslbiotech.com",
      areaServed: "IN",
    },
    identifier: {
      "@type": "PropertyValue",
      name: "CIN",
      value: "U47721AS2026PTC030611",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
