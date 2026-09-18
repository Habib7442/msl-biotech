const WHATSAPP_NUMBER = "919859757710";

interface EnquiryDetails {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export function buildEnquiryWhatsAppLink({ name, email, phone, subject, message }: EnquiryDetails): string {
  const text = `New Enquiry from Website\n\nEnquiring About: ${subject}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
