"use client";

import { useContact } from "@/components/ContactProvider";

// Brand icons (Lucide ships none), drawn as simple 24×24 paths.
const icons = {
  facebook: "M14 8h2.5V4.5H14c-2.5 0-4 1.6-4 4.2V11H7.5v3.5H10V21h3.6v-6.5h2.6l.5-3.5h-3.1V9.1c0-.7.3-1.1.9-1.1Z",
  instagram:
    "M12 7.4A4.6 4.6 0 1 0 12 16.6 4.6 4.6 0 0 0 12 7.4Zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm4.8-8.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2ZM20.9 8c-.1-1.5-.4-2.8-1.5-3.9S17 2.7 15.5 2.6C14 2.5 10 2.5 8.5 2.6 7 2.7 5.7 3 4.6 4.1S3.2 6.5 3.1 8C3 9.5 3 13.5 3.1 15c.1 1.5.4 2.8 1.5 3.9s2.4 1.4 3.9 1.5c1.5.1 5.5.1 7 0 1.5-.1 2.8-.4 3.9-1.5s1.4-2.4 1.5-3.9c.1-1.5.1-5.5 0-7Zm-2 9.6a2.9 2.9 0 0 1-1.6 1.6c-1.1.4-3.8.3-5.3.3s-4.2.1-5.3-.3a2.9 2.9 0 0 1-1.6-1.6c-.4-1.1-.3-3.8-.3-5.3s-.1-4.2.3-5.3a2.9 2.9 0 0 1 1.6-1.6c1.1-.4 3.8-.3 5.3-.3s4.2-.1 5.3.3a2.9 2.9 0 0 1 1.6 1.6c.4 1.1.3 3.8.3 5.3s.1 4.2-.3 5.3Z",
  linkedin:
    "M6.9 8.8H3.6V20h3.3V8.8ZM5.3 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM20.4 13.8c0-3-.6-5.3-4.1-5.3-1.7 0-2.8.9-3.3 1.8V8.8H9.8V20h3.3v-5.5c0-1.5.3-2.9 2.1-2.9s1.8 1.7 1.8 3V20h3.4v-6.2Z",
  youtube:
    "M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3L10 15Z",
} as const;

const labels = { facebook: "Facebook", instagram: "Instagram", linkedin: "LinkedIn", youtube: "YouTube" } as const;

/** Social profile icons from the admin panel's settings; renders nothing until one is set. */
export default function SocialLinks() {
  const { social } = useContact();
  const links = (Object.keys(icons) as (keyof typeof icons)[]).filter((key) => social[key]);
  if (!links.length) return null;

  return (
    <ul className="flex items-center gap-2.5" aria-label="MSL Biotech on social media">
      {links.map((key) => (
        <li key={key}>
          <a
            href={social[key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`MSL Biotech on ${labels[key]}`}
            className="flex size-9 items-center justify-center rounded-full bg-white/10 text-gray-300 transition-colors hover:bg-[#7FC700] hover:text-[#12213F]"
          >
            <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden="true">
              <path d={icons[key]} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
