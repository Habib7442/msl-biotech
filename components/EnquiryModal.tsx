"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle, Loader2, ArrowRight } from "lucide-react";

export default function EnquiryModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(true);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.subject) {
        setSubject(customEvent.detail.subject);
      } else {
        setSubject("");
      }
      setIsSuccess(false);
      setIsOpen(true);
    };

    window.addEventListener("open-enquiry", handleOpen);
    return () => window.removeEventListener("open-enquiry", handleOpen);
  }, []);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

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
      newErrors.consent = "You must agree to the privacy guidelines.";
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
          subject: subject || "General Inquiry",
          message,
          consent,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSuccess(true);
        // Clear fields
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setErrors({ submit: data.error || "Failed to submit enquiry." });
      }
    } catch (err) {
      setErrors({ submit: "A network error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => !loading && setIsOpen(false)}
      />

      {/* Modal Dialog Center */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl border border-gray-100 transition-all transform animate-in fade-in zoom-in-95 duration-200">
          
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            disabled={loading}
            className="absolute right-6 top-6 p-2 rounded-xl text-gray-400 hover:text-brand-navy hover:bg-[#F4F7FB] transition-colors disabled:opacity-50"
            aria-label="Close modal"
          >
            <X className="size-5" />
          </button>

          {isSuccess ? (
            /* Success View */
            <div className="flex flex-col items-center text-center py-6">
              <div className="relative mb-6">
                <CheckCircle className="size-16 text-[#7FC700] animate-bounce" />
                <span className="absolute inset-0 rounded-full bg-[#7FC700]/10 animate-ping pointer-events-none" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-brand-navy mb-3">
                Enquiry Submitted!
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-8">
                Thank you for contacting MSL Biotech. Your request has been recorded. Our team will review your query and contact you within 24 hours.
              </p>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full bg-[#7FC700] hover:bg-[#6eb200] text-[#12213F] font-bold py-3.5 rounded-xl text-sm transition-colors cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            /* Form View */
            <div>
              <div className="mb-6">
                <h3 className="font-heading text-xl font-bold text-brand-navy mb-1.5">
                  Send Product Enquiry
                </h3>
                <p className="text-gray-500 text-xs">
                  Fill out the form below to receive quick pricing, catalog specs, or PCD-franchise details.
                </p>
              </div>

              {errors.submit && (
                <div className="bg-red-50 text-red-600 text-xs font-semibold p-4 rounded-xl mb-6">
                  {errors.submit}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Product Name (Disabled prefill field if exists) */}
                {subject && (
                  <div>
                    <label className="block text-[11px] font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                      Enquiring For
                    </label>
                    <input
                      type="text"
                      disabled
                      value={subject}
                      className="w-full bg-emerald-50/50 border border-emerald-100 text-emerald-800 font-semibold rounded-xl px-4 py-3 text-sm cursor-not-allowed"
                    />
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-[11px] font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                    Your Name
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

                {/* Grid for Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                {/* Message */}
                <div>
                  <label className="block text-[11px] font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                    Requirement Details
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your bulk requirements, compositions, or queries here..."
                    disabled={loading}
                    className={`w-full bg-[#F4F7FB] border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.message
                        ? "border-red-400 focus:ring-red-100"
                        : "border-gray-200 focus:border-primary focus:ring-primary/10"
                    }`}
                  />
                  {errors.message && <span className="text-red-500 text-[10px] mt-1 block">{errors.message}</span>}
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    disabled={loading}
                    className="mt-1 rounded border-gray-300 text-primary focus:ring-primary/20 accent-primary"
                  />
                  <label htmlFor="consent" className="text-[11px] text-gray-500 leading-normal">
                    I agree to the privacy guidelines and consent to MSL Biotech storing my details to follow up on this enquiry. (India DPDP compliant)
                  </label>
                </div>
                {errors.consent && <span className="text-red-500 text-[10px] block">{errors.consent}</span>}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#7FC700] hover:bg-[#6eb200] text-[#12213F] font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-70 mt-6 shadow-md"
                >
                  {loading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span>Submitting Enquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Enquiry</span>
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
