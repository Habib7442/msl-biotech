"use client";

import { createContext, useContext } from "react";
import { DEFAULT_CONTACT, type SiteContact } from "@/lib/contact";

// The root layout reads the contact details from Sanity on the server and
// hands them down here, so client components (header, footer, WhatsApp
// button, contact page) show the admin panel's values without fetching.
const ContactContext = createContext<SiteContact>(DEFAULT_CONTACT);

interface ContactProviderProps {
  contact: SiteContact;
  children: React.ReactNode;
}

export function ContactProvider({ contact, children }: ContactProviderProps) {
  return <ContactContext.Provider value={contact}>{children}</ContactContext.Provider>;
}

export function useContact(): SiteContact {
  return useContext(ContactContext);
}
