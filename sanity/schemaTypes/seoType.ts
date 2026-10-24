import { defineField, defineType } from "sanity";

// Shared SEO block for products and blog posts (same shape the admin panel writes).
export const seoType = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({ name: "title", title: "SEO title", type: "string", description: "Recommended 50–60 characters." }),
    defineField({ name: "description", title: "Meta description", type: "text", rows: 3, description: "Recommended 140–160 characters." }),
    defineField({
      name: "focusKeyword",
      title: "Focus keyword",
      type: "string",
      description: "Editor guidance only; not output as a meta keywords tag.",
    }),
    defineField({ name: "canonical", title: "Canonical URL", type: "url", description: "Leave empty to point to the page itself." }),
    defineField({ name: "noindex", title: "Hide from search engines (noindex)", type: "boolean", initialValue: false }),
  ],
});
