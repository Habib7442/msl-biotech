import JsonLd from "@/components/JsonLd";
import { whatsappNumber, type SiteContact } from "@/lib/contact";
import { SITE_URL } from "@/lib/seo";

interface OrganizationJsonLdProps {
  contact: SiteContact;
}

// Structured data (schema.org Organization) for search engines. Every field
// here must be real, verifiable info already shown elsewhere on the site
// (Footer, Contact page) — no invented stats or unverified certifications.
// Phone, email, address and social links follow the admin panel's settings.
export default function OrganizationJsonLd({ contact }: OrganizationJsonLdProps) {
  const sameAs = Object.values(contact.social).filter(Boolean);
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MSL Biotech Private Limited",
    alternateName: "MSL Biotech",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.webp`,
    description: "Pharmaceutical marketing company in Guwahati, Assam offering tablets, capsules, syrups, and nutraceuticals.",
    // The default address is known field by field; an address typed in the
    // admin panel is free text, so it goes in as one line.
    address: contact.customAddress
      ? { "@type": "PostalAddress", streetAddress: contact.address, addressCountry: "IN" }
      : {
          "@type": "PostalAddress",
          streetAddress: "H.NO 60, Satgoan Road, Nowapara Bagharbari Ghy, Panjabari, GMC",
          addressLocality: "Guwahati",
          addressRegion: "Assam",
          postalCode: "781037",
          addressCountry: "IN",
        },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+${whatsappNumber(contact.phone)}`,
      contactType: "customer service",
      email: contact.email,
      areaServed: "IN",
    },
    ...(sameAs.length ? { sameAs } : {}),
    identifier: {
      "@type": "PropertyValue",
      name: "CIN",
      value: "U47721AS2026PTC030611",
    },
  };

  return <JsonLd data={data} />;
}
