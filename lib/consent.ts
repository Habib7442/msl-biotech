// Visitor's choice about analytics cookies (DPDP Act 2023: consent must be
// free, specific, informed, unambiguous and given by a clear action, and as
// easy to withdraw as to give). Google Analytics is not loaded at all until
// the visitor chooses "Accept".
//
// The choice itself is kept in localStorage (it identifies no one and is
// needed to remember the answer). Client-only.

import { GA_MEASUREMENT_ID } from "@/lib/analytics";

export type ConsentChoice = "granted" | "denied";

const KEY = "msl-analytics-consent-v1";
const EVENT = "msl-consent-change";

export function readConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null; // storage blocked: treat as "not asked yet" (analytics stays off)
  }
}

export function writeConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(KEY, choice);
  } catch {
    // Storage blocked: the choice still applies for this page view.
  }
  const w = window as unknown as Record<string, unknown>;
  // Google's official opt-out flag: stops an already-loaded gtag from sending.
  w[`ga-disable-${GA_MEASUREMENT_ID}`] = choice === "denied";
  if (choice === "denied") deleteAnalyticsCookies();
  window.dispatchEvent(new CustomEvent<ConsentChoice>(EVENT, { detail: choice }));
}

/** Re-opens the consent banner (footer / privacy page "Cookie settings"). */
export function openConsentSettings() {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: "open" }));
}

export function onConsentEvent(handler: (detail: ConsentChoice | "open") => void) {
  const listener = (event: Event) => handler((event as CustomEvent<ConsentChoice | "open">).detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}

/** Removes the Google Analytics cookies (_ga, _ga_<id>) when consent is withdrawn. */
function deleteAnalyticsCookies() {
  const names = document.cookie
    .split(";")
    .map((c) => c.split("=")[0].trim())
    .filter((name) => name === "_ga" || name.startsWith("_ga_") || name === "_gid");
  const host = window.location.hostname;
  // GA sets cookies on the top-level domain (".mslbiotech.in"); clear every level.
  const parts = host.split(".");
  const domains = new Set<string>(["", host]);
  for (let i = 0; i < parts.length - 1; i++) domains.add(`.${parts.slice(i).join(".")}`);
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}
