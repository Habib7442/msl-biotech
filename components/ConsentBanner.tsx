"use client";

import Link from "next/link";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Cookie } from "lucide-react";
import { useEffect, useState } from "react";
import { onConsentEvent, openConsentSettings, readConsent, writeConsent, type ConsentChoice } from "@/lib/consent";

interface ConsentBannerProps {
  /** GA4 ID, or null where analytics is off anyway (previews, dev). */
  analyticsId: string | null;
}

/**
 * Asks before any analytics runs (DPDP Act 2023). Nothing is loaded and no
 * analytics cookie is set until "Accept". "Reject" is just as prominent, the
 * site works the same either way, and "Cookie settings" (footer, privacy
 * page) reopens this to change the answer at any time.
 */
export default function ConsentBanner({ analyticsId }: ConsentBannerProps) {
  // null until mounted: the server can't know the stored choice, so nothing
  // renders on the server and there's no hydration mismatch.
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads browser storage once after hydration
    setChoice(stored);
    setOpen(stored === null);
    setMounted(true);
    return onConsentEvent((detail) => {
      if (detail === "open") setOpen(true);
      else {
        setChoice(detail);
        setOpen(false);
      }
    });
  }, []);

  if (!analyticsId || !mounted) return null;

  return (
    <>
      {choice === "granted" ? <GoogleAnalytics gaId={analyticsId} /> : null}
      {open ? (
        <div
          role="region"
          aria-label="Cookie choice"
          className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_20px_50px_-15px_rgba(18,33,63,0.35)] sm:inset-x-6 sm:bottom-6 sm:p-5"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex flex-1 items-start gap-3">
              <Cookie className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
              <p className="text-sm leading-relaxed text-gray-600">
                May we use <strong className="text-brand-navy">Google Analytics cookies</strong> to count visits and see
                which pages are useful? It helps us improve the website. Nothing is collected unless you accept, and you
                can change your choice any time.{" "}
                <Link href="/privacy#analytics" className="font-semibold text-primary underline underline-offset-2">
                  Privacy Policy
                </Link>
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              {/* Equal size and weight: rejecting is as easy as accepting. */}
              <button
                type="button"
                onClick={() => writeConsent("denied")}
                className="flex-1 rounded-xl border-2 border-primary px-5 py-2.5 text-sm font-bold text-primary transition-colors hover:bg-primary/5 sm:w-28 sm:flex-none"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => writeConsent("granted")}
                className="flex-1 rounded-xl border-2 border-primary bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary/90 sm:w-28 sm:flex-none"
              >
                Accept
              </button>
            </div>
          </div>
          {choice ? (
            <p className="mt-3 text-xs text-gray-400">
              Current choice: {choice === "granted" ? "accepted" : "rejected"}.
            </p>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

/** "Cookie settings" link-style button that reopens the banner. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={openConsentSettings}>
      Cookie settings
    </button>
  );
}
