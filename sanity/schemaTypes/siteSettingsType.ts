import { defineField, defineType } from "sanity";
import { Settings } from "lucide-react";

// Singleton (_id "siteSettings"), normally edited in the admin panel's Settings page.
export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: Settings,
  fields: [
    defineField({ name: "siteName", title: "Website name", type: "string" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "defaultSeoTitle", title: "Default SEO title", type: "string" }),
    defineField({ name: "defaultSeoDescription", title: "Default meta description", type: "text", rows: 3 }),
    defineField({
      name: "defaultOgImage",
      title: "Default share image",
      type: "image",
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "whatsapp", title: "WhatsApp", type: "string" }),
    defineField({ name: "address", title: "Address", type: "text", rows: 3 }),
    defineField({
      name: "social",
      title: "Social profiles",
      type: "object",
      fields: ["facebook", "instagram", "linkedin", "youtube"].map((name) => defineField({ name, type: "url" })),
    }),
    defineField({
      name: "redirects",
      title: "Redirects",
      type: "array",
      of: [
        {
          type: "object",
          name: "redirect",
          fields: [
            // Same rules the admin panel enforces; proxy.ts also ignores bad targets.
            defineField({
              name: "from",
              title: "From (path)",
              type: "string",
              validation: (Rule) =>
                Rule.required().custom((value) =>
                  typeof value === "string" && /^\/(?![/\\])\S*$/.test(value) ? true : "Use a path on this site, e.g. /old-page"
                ),
            }),
            defineField({
              name: "to",
              title: "To (path or URL)",
              type: "string",
              validation: (Rule) =>
                Rule.required().custom((value) =>
                  typeof value === "string" && /^(\/(?![/\\])|https?:\/\/)\S*$/.test(value)
                    ? true
                    : "Use a path starting with / or a full URL starting with https://"
                ),
            }),
            defineField({ name: "permanent", title: "Permanent", type: "boolean", initialValue: true }),
          ],
          preview: { select: { title: "from", subtitle: "to" } },
        },
      ],
    }),
    defineField({ name: "sitemapExclude", title: "Paths left out of the sitemap", type: "array", of: [{ type: "string" }] }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
