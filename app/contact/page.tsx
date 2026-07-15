"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Clock, Send, Check, Loader2, ArrowRight } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Product Enquiry");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(true);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email.";
    }

    const phoneRegex = /^[0-9+\s-]{10,15}$/;
    if (!phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(phone.replace(/[\s-]/g, ""))) {
      newErrors.phone = "Please enter a valid phone number (10-15 digits).";
    }

    if (!message.trim()) {
      newErrors.message = "Message is required.";
    } else if (message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    if (!consent) {
      newErrors.consent = "You must agree to the privacy consent.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject,
          message,
          consent,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setErrors({ submit: data.error || "Failed to submit form." });
      }
    } catch (err) {
      setErrors({ submit: "A network error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex-grow flex flex-col">
      {/* Subpage Header Banner */}
      <section className="bg-[#12213F] text-white pt-28 pb-16 md:pt-36 md:pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col gap-2.5">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
              <Link href="/" className="hover:text-[#7FC700] transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Contact Us</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-tight">
              Contact Our Team
            </h1>
            <p className="text-gray-400 text-sm max-w-xl">
              Get in touch for pricing queries, partnerships, and clinical support.
            </p>
          </div>
        </div>
      </section>

      {/* Main Details Panel */}
      <section className="bg-[#F4F7FB] py-16 flex-grow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Contact details */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Info block */}
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_10px_30px_rgba(18,33,63,0.02)] flex flex-col gap-6 text-left">
                <h3 className="font-heading text-xl font-bold text-brand-navy border-b border-gray-50 pb-4 mb-2">
                  Get In Touch
                </h3>

                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-full bg-[#EAF4DA] text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="size-5 text-[#184EA4]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider mb-1">Corporate HQ</h4>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      H.NO 60, Satgoan Road, Nowapara Bagharbari Ghy, Panjabari, GMC, Kamrup - 781037, Assam, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-full bg-[#EAF4DA] text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="size-5 text-[#184EA4]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider mb-1">Direct Dial</h4>
                    <a href="tel:+919999999999" className="text-gray-500 hover:text-primary text-xs font-semibold">
                      +91 99999 99999
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-full bg-[#EAF4DA] text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="size-5 text-[#184EA4]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider mb-1">Email Channel</h4>
                    <a href="mailto:info@mslbiotech.com" className="text-gray-500 hover:text-primary text-xs font-semibold">
                      info@mslbiotech.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-full bg-[#EAF4DA] text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="size-5 text-[#184EA4]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-navy uppercase tracking-wider mb-1">Business Hours</h4>
                    <p className="text-gray-500 text-xs leading-normal">
                      Monday - Saturday: 09:00 AM - 06:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Small FAQ Card */}
              <div className="bg-[#EAF4DA] border border-[#dcecc1] rounded-3xl p-8 text-left">
                <h4 className="font-heading text-base font-bold text-brand-navy mb-2">
                  Franchise Partnerships (PCD)
                </h4>
                <p className="text-gray-600 text-xs leading-relaxed mb-4">
                  Interested in distributing our products or launching a franchise associate store? Use the contact form select "Distributor Partnership" to speak with our business development director.
                </p>
                <a
                  href="https://wa.me/919999999999?text=Hello%20MSL%20Biotech,%20I%20am%20interested%20in%20a%20distributor%20franchise%20partnership."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary/80"
                >
                  <span>Chat with Franchise Team</span>
                  <ArrowRight className="size-3.5" />
                </a>
              </div>

            </div>

            {/* Right Column: Contact form */}
            <div className="lg:col-span-7 w-full bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_10px_30px_rgba(18,33,63,0.02)] text-left">
              {isSuccess ? (
                <div className="flex flex-col items-center text-center py-12">
                  <Check className="size-16 text-[#7FC700] mb-6 animate-bounce" />
                  <h3 className="font-heading text-2xl font-bold text-brand-navy mb-3">
                    Enquiry Logged!
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-8">
                    Your details were sent successfully. Our support desk will reach out to you within the business day.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="bg-[#7FC700] hover:bg-[#6eb200] text-[#12213F] font-bold px-8 py-3.5 rounded-xl text-sm transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="font-heading text-xl font-bold text-brand-navy mb-2">
                    Submit Message
                  </h3>
                  <p className="text-gray-400 text-xs mb-8">
                    Submit your requirement details below and we will follow up with verified documentation.
                  </p>

                  {errors.submit && (
                    <div className="bg-red-50 text-red-600 text-xs font-semibold p-4 rounded-xl mb-6">
                      {errors.submit}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Name */}
                    <div>
                      <label className="block text-[11px] font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        disabled={loading}
                        className={`w-full bg-[#F4F7FB] border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.name
                            ? "border-red-400 focus:ring-red-100"
                            : "border-gray-200 focus:border-primary focus:ring-primary/10"
                        }`}
                      />
                      {errors.name && <span className="text-red-500 text-[10px] mt-1 block">{errors.name}</span>}
                    </div>

                    {/* Email & Phone grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Email */}
                      <div>
                        <label className="block text-[11px] font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="john@example.com"
                          disabled={loading}
                          className={`w-full bg-[#F4F7FB] border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${
                            errors.email
                              ? "border-red-400 focus:ring-red-100"
                              : "border-gray-200 focus:border-primary focus:ring-primary/10"
                          }`}
                        />
                        {errors.email && <span className="text-red-500 text-[10px] mt-1 block">{errors.email}</span>}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-[11px] font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="99999 99999"
                          disabled={loading}
                          className={`w-full bg-[#F4F7FB] border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${
                            errors.phone
                              ? "border-red-400 focus:ring-red-100"
                              : "border-gray-200 focus:border-primary focus:ring-primary/10"
                          }`}
                        />
                        {errors.phone && <span className="text-red-500 text-[10px] mt-1 block">{errors.phone}</span>}
                      </div>
                    </div>

                    {/* Subject Selector */}
                    <div>
                      <label className="block text-[11px] font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                        Subject of Inquiry
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        disabled={loading}
                        className="w-full bg-[#F4F7FB] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-semibold text-brand-navy"
                      >
                        <option value="Product Enquiry">Product Enquiry</option>
                        <option value="Distributor Partnership">Distributor Partnership (PCD Franchise)</option>
                        <option value="General Enquiry">General Enquiry</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[11px] font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                        Message Details
                      </label>
                      <textarea
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Write your details or bulk requirements here..."
                        disabled={loading}
                        className={`w-full bg-[#F4F7FB] border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${
                          errors.message
                            ? "border-red-400 focus:ring-red-100"
                            : "border-gray-200 focus:border-primary focus:ring-primary/10"
                        }`}
                      />
                      {errors.message && <span className="text-red-500 text-[10px] mt-1 block">{errors.message}</span>}
                    </div>

                    {/* Consent */}
                    <div className="flex items-start gap-2.5 pt-1">
                      <input
                        type="checkbox"
                        id="contact-consent"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        disabled={loading}
                        className="mt-1 rounded border-gray-300 text-primary focus:ring-primary/20 accent-primary"
                      />
                      <label htmlFor="contact-consent" className="text-[11px] text-gray-500 leading-normal">
                        I agree to the privacy guidelines and consent to <strong className="font-bold text-brand-navy">MSL Biotech</strong> storing my details to follow up on this query. (India DPDP compliant)
                      </label>
                    </div>
                    {errors.consent && <span className="text-red-500 text-[10px] block">{errors.consent}</span>}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#7FC700] hover:bg-[#6eb200] text-[#12213F] font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md disabled:opacity-75"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Enquiry</span>
                          <Send className="size-4" />
                        </>
                      )}
                    </button>

                  </form>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Styled Google Map Section */}
      <section className="w-full h-[450px] relative border-t border-gray-100">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14327.97491748281!2d91.81596765171789!3d26.131758957582524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a5edbfa3cfcfd%3A0xe543ef6ef6951b14!2sPanjabari%2C%20Guwahati%2C%20Assam%20781037!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale"
        />
        {/* Soft floating overlay to blend the map slightly with the background */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F4F7FB] to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#F4F7FB] to-transparent pointer-events-none" />
      </section>
    </div>
  );
}
