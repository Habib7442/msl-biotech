// Company contact details. Editable in the admin panel (Settings → Contact
// details and Social links); every field falls back to the values below when
// left empty, so the site never shows a blank phone or email.
// Client-safe: used by both server pages and client components.

export interface SiteContact {
  /** As displayed, e.g. "+91 98597 57710". */
  phone: string;
  /** As displayed; turned into a wa.me number by whatsappNumber(). */
  whatsapp: string;
  email: string;
  address: string;
  /** True when the address came from the admin panel (the map then follows it). */
  customAddress: boolean;
  social: { facebook?: string; instagram?: string; linkedin?: string; youtube?: string };
}

export const DEFAULT_CONTACT: SiteContact = {
  phone: "+91 98597 57710",
  whatsapp: "+91 98597 57710",
  email: "ltdmslbiotechpvt@gmail.com",
  address: "H.NO 60, Satgoan Road, Nowapara Bagharbari Ghy, Panjabari, GMC, Kamrup - 781037, Assam, India",
  customAddress: false,
  social: {},
};

const digits = (value: string) => value.replace(/\D/g, "");

/** Indian numbers may be typed without the country code: 10 digits → 91 + digits. */
function international(value: string) {
  const d = digits(value);
  return d.length === 10 ? `91${d}` : d;
}

/** "+91 98597 57710" → "tel:+919859757710". */
export function telHref(phone: string) {
  return `tel:+${international(phone)}`;
}

/** "+91 98597 57710" → "919859757710" (the format wa.me expects). */
export function whatsappNumber(value: string) {
  return international(value);
}

export function whatsappLink(value: string, text?: string) {
  return `https://wa.me/${whatsappNumber(value)}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

/** Only http(s) links are used for social profiles. */
const httpUrl = (value: unknown) =>
  typeof value === "string" && /^https?:\/\/\S+$/i.test(value.trim()) ? value.trim() : undefined;

const text = (value: unknown) => (typeof value === "string" && value.trim() ? value.trim() : undefined);

/** Settings from Sanity → contact details, with a fallback for every empty field. */
export function toSiteContact(settings: {
  phone?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  address?: string | null;
  social?: Record<string, string | null | undefined> | null;
} | null): SiteContact {
  const phone = text(settings?.phone);
  const whatsapp = text(settings?.whatsapp);
  const email = text(settings?.email);
  const address = text(settings?.address);
  // A number without enough digits would make broken tel:/wa.me links.
  const usable = (n?: string) => (n && digits(n).length >= 10 ? n : undefined);
  return {
    phone: usable(phone) ?? DEFAULT_CONTACT.phone,
    whatsapp: usable(whatsapp) ?? usable(phone) ?? DEFAULT_CONTACT.whatsapp,
    email: email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : DEFAULT_CONTACT.email,
    address: address ?? DEFAULT_CONTACT.address,
    customAddress: Boolean(address),
    social: {
      facebook: httpUrl(settings?.social?.facebook),
      instagram: httpUrl(settings?.social?.instagram),
      linkedin: httpUrl(settings?.social?.linkedin),
      youtube: httpUrl(settings?.social?.youtube),
    },
  };
}
