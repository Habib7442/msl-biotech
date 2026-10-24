import { whatsappLink } from "@/lib/contact";

interface EnquiryDetails {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

/** `to`: the company's WhatsApp number (from useContact()), in any format. */
export function buildEnquiryWhatsAppLink(to: string, { name, email, phone, subject, message }: EnquiryDetails): string {
  const text = `New Enquiry from Website\n\nEnquiring About: ${subject}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;
  return whatsappLink(to, text);
}
