import type { Metadata } from "next";
import Link from "next/link";
import { CookieSettingsButton } from "@/components/ConsentBanner";
import { getSiteContact } from "@/lib/sanity/settings";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How MSL Biotech Private Limited handles personal data on this website under India's Digital Personal Data Protection Act, 2023: enquiries, reviews, analytics cookies, your rights and how to raise a grievance.",
  alternates: { canonical: "/privacy" },
};

// Keep every statement here true to what the website actually does (see
// context/architecture.md). Under the DPDP Act a notice must be accurate for
// consent to be "informed". Update "Last updated" with every change.

const h2 = "font-heading text-lg font-bold text-brand-navy pt-4 scroll-mt-28";
const strong = "font-semibold text-brand-navy";

export default async function PrivacyPolicy() {
  const contact = await getSiteContact();
  const mail = (
    <a href={`mailto:${contact.email}`} className="text-primary font-semibold hover:underline">
      {contact.email}
    </a>
  );

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-36 md:pb-20 text-left">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-gray-400 font-medium mb-4">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>/</span>
        <span className="text-brand-navy">Privacy Policy</span>
      </div>

      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-[0_10px_30px_rgba(18,33,63,0.02)]">
        <h1 className="font-heading text-3xl font-bold text-brand-navy mb-6">Privacy Policy</h1>
        <p className="text-gray-400 text-xs mb-8">Last updated: October 30, 2026</p>

        <div className="space-y-6 text-gray-500 text-sm leading-relaxed">
          <p>
            This policy explains what personal data <strong className={strong}>MSL Biotech Private Limited</strong>{" "}
            (&ldquo;we&rdquo;, CIN U47721AS2026PTC030611, {contact.address}) handles through this website, why, for how
            long, and the rights you have under India&apos;s <strong>Digital Personal Data Protection Act, 2023</strong>{" "}
            (the &ldquo;DPDP Act&rdquo;). For that data, we are the &ldquo;Data Fiduciary&rdquo;.
          </p>

          <h2 id="summary" className={h2}>1. In short</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>You can browse the whole website without giving us any personal data.</li>
            <li>We only collect what you choose to send: an enquiry, a call or email, or a product review.</li>
            <li>We use Google Analytics cookies <strong>only if you click &ldquo;Accept&rdquo;</strong>, and you can change that any time.</li>
            <li>We never sell your data or share it for other companies&apos; marketing.</li>
          </ul>

          <h2 id="enquiries" className={h2}>2. Enquiries (contact page, enquiry buttons, WhatsApp)</h2>
          <p>
            <strong className={strong}>What:</strong> the name, email, phone number, subject and message you type into an
            enquiry form.
          </p>
          <p>
            <strong className={strong}>How:</strong> the forms do <strong>not</strong> store anything on our website or
            servers. When you press send, WhatsApp opens with your message filled in, and it reaches us only if you send it
            there. WhatsApp is operated by Meta under its own privacy policy. If you call or email us instead, we receive
            what you share in that call or email.
          </p>
          <p>
            <strong className={strong}>Why:</strong> only to reply to your enquiry and, if you ask, to discuss products,
            supply or a distribution partnership. Sending an enquiry is your consent for this purpose.
          </p>
          <p>
            <strong className={strong}>How long:</strong> only as long as needed to handle your enquiry and any business
            relationship that follows. After that we delete it, unless a law requires us to keep it.
          </p>

          <h2 id="reviews" className={h2}>3. Product reviews</h2>
          <p>
            <strong className={strong}>What:</strong> your star rating, the name you enter, an optional title, your review
            text and the date. We do not ask for your email or phone number.
          </p>
          <p>
            <strong className={strong}>How and why:</strong> you consent by ticking the box on the review form, which also
            confirms you are 18 or older. Reviews are stored with our content service (Sanity). Our team checks each one
            and publishes it on the product page only if approved. Unapproved reviews are never shown.
          </p>
          <p>
            To limit spam, your IP address is checked briefly when you submit. It is held only in temporary memory and
            is not stored with your review.
          </p>
          <p>
            <strong className={strong}>How long:</strong> a published review stays on the website until you ask us to
            remove it or we take it down. Email {mail} to have your review edited out or deleted.
          </p>

          <h2 id="analytics" className={h2}>4. Analytics cookies (Google Analytics), only with your consent</h2>
          <p>
            When you first visit, we ask whether we may use Google Analytics. <strong>Nothing is loaded and no
            analytics cookie is set until you click &ldquo;Accept&rdquo;.</strong> &ldquo;Reject&rdquo; is just as easy,
            and the website works the same either way.
          </p>
          <p>
            <strong className={strong}>What it collects if you accept:</strong> the pages you view and when, how you
            arrived (for example from a search engine), your device and browser type, an approximate location (city or
            country) that Google works out, and a random identifier stored in cookies named <code>_ga</code> and{" "}
            <code>_ga_…</code>. Google states that Google Analytics 4 does not log or store IP addresses. We cannot see who
            you are from these reports.
          </p>
          <p>
            <strong className={strong}>Why:</strong> to count visits and understand which pages are useful, so we can
            improve the website. Not for advertising.
          </p>
          <p>
            <strong className={strong}>Who processes it:</strong> Google, on our behalf, possibly outside India.{" "}
            <strong className={strong}>How long:</strong> for the data-retention period set in our Google Analytics account,
            at most 14 months.
          </p>
          <p>
            <strong className={strong}>Change your choice at any time:</strong>{" "}
            <CookieSettingsButton className="text-primary font-semibold underline underline-offset-2 cursor-pointer" />{" "}
            (also in the website footer). If you withdraw consent, tracking stops immediately and the Google Analytics
            cookies are deleted from your browser. Withdrawing does not affect anything processed before you withdrew.
          </p>

          <h2 id="cookies" className={h2}>5. Other cookies and storage</h2>
          <p>
            Apart from the Google Analytics cookies above (only after you accept), this website sets no cookies. It saves
            your analytics choice in your browser&apos;s local storage so it does not ask again. That entry contains only
            &ldquo;accepted&rdquo; or &ldquo;rejected&rdquo;.
          </p>

          <h2 id="sharing" className={h2}>6. Who else handles data</h2>
          <p>We use these service providers (&ldquo;Data Processors&rdquo;), only to run the website:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Vercel</strong>: hosts the website. Like any web host, it processes technical request data such as IP address to deliver pages and keep them secure.</li>
            <li><strong>Sanity</strong>: stores the website&apos;s content, including product reviews.</li>
            <li><strong>Google</strong>: Google Analytics, only if you accept.</li>
            <li><strong>WhatsApp (Meta)</strong>: only when you choose to message us there.</li>
          </ul>
          <p>
            These providers may process data outside India, which the DPDP Act permits except for countries the
            Government of India restricts. We do not sell personal data or share it with anyone for their own marketing.
            We disclose data to authorities only when the law requires it.
          </p>

          <h2 id="security" className={h2}>7. Security</h2>
          <p>
            The website is served only over encrypted HTTPS connections. Our content system is open only to authorised
            staff, each with their own password-protected login. If a personal data breach occurs, we will inform the Data
            Protection Board of India and the people affected as the DPDP Act requires.
          </p>

          <h2 id="rights" className={h2}>8. Your rights</h2>
          <p>Under the DPDP Act you can ask us, free of charge:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Access</strong>: a summary of the personal data we hold about you and how we use it, and who we have shared it with.</li>
            <li><strong>Correction</strong>: to correct, complete or update it.</li>
            <li><strong>Erasure</strong>: to delete it, unless a law requires us to keep it.</li>
            <li><strong>Withdraw consent</strong>: at any time, as easily as you gave it (for analytics, use &ldquo;Cookie settings&rdquo;).</li>
            <li><strong>Nominate</strong> someone to exercise these rights for you in the event of your death or incapacity.</li>
            <li><strong>Grievance redressal</strong>: see below.</li>
          </ul>
          <p>Email {mail}. We may ask you to confirm your identity before acting on a request.</p>

          <h2 id="grievance" className={h2}>9. Grievances and complaints</h2>
          <p>
            For any question or complaint about your personal data, contact our grievance contact at {mail} or{" "}
            <a href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`} className="text-primary font-semibold hover:underline">
              {contact.phone}
            </a>
            , or write to us at {contact.address}. If you are not satisfied with our response, you may complain to the{" "}
            <strong>Data Protection Board of India</strong>.
          </p>

          <h2 id="children" className={h2}>10. Children</h2>
          <p>
            This website is meant for adults. We do not knowingly collect personal data from anyone under 18, and the
            review form asks you to confirm you are 18 or older. If you believe a child has sent us personal data, email{" "}
            {mail} and we will delete it.
          </p>

          <h2 id="language" className={h2}>11. Language and changes</h2>
          <p>
            You can ask for this notice in any language listed in the Eighth Schedule to the Constitution of India by
            emailing {mail}. If we change how we handle personal data, we will update this page and the date above, and
            ask for your consent again where the law requires.
          </p>
        </div>
      </div>
    </div>
  );
}
