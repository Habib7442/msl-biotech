import { defineField, defineType } from "sanity";
import { FileText } from "lucide-react";

// Blog article. Normally written in the separate admin panel; the body is
// Markdown (## / ### headings, lists, links, images with alt text).
export const postType = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  icon: FileText,
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      description: "mslbiotech.in/blog/<slug>",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 2 }),
    defineField({
      name: "body",
      title: "Body (Markdown)",
      type: "text",
      rows: 20,
      description: "Start sections with ## (the title is the page's only H1).",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Featured image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string", validation: (Rule) => Rule.required() })],
    }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "author", title: "Author", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["draft", "published", "archived"], layout: "radio" },
      initialValue: "draft",
      description: "Published with a future publish date = scheduled.",
    }),
    defineField({ name: "publishedAt", title: "Publish date", type: "datetime" }),
    defineField({ name: "updatedAt", title: "Updated date", type: "datetime" }),
    defineField({ name: "seo", title: "SEO", type: "seo" }),
    defineField({ name: "secondaryKeywords", title: "Secondary keywords", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({
      name: "og",
      title: "Social sharing",
      type: "object",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "title", title: "Share title", type: "string" }),
        defineField({ name: "description", title: "Share description", type: "text", rows: 2 }),
        defineField({
          name: "image",
          title: "Share image",
          type: "image",
          fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
        }),
      ],
    }),
  ],
  orderings: [{ title: "Publish date, newest", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: { title: "title", subtitle: "status", media: "coverImage" },
  },
});
