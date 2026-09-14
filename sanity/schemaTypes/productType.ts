import { defineField, defineType } from "sanity";
import { Pill } from "lucide-react";

export const PRODUCT_CATEGORIES = [
  "Tablets",
  "Capsules",
  "Syrups",
  "Nutraceuticals",
  "Pediatric Care",
  "Diabetes Care",
  "Gastro Care",
  "Personal Care",
];

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: Pill,
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      description: "Used in the product page URL, e.g. mslbiotech.com/products/flemosel-tablets",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: PRODUCT_CATEGORIES, layout: "dropdown" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Product Images",
      description: "The first image is used as the primary card/hero photo. Add more for the detail-page gallery.",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              description: "Describe the photo for accessibility and image SEO.",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.min(1).error("Add at least one product photo."),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "composition",
      title: "Composition",
      type: "string",
      description: 'Salt composition as printed on the pack, e.g. "Trypsin BP, Bromelain BP & Rutoside Trihydrate IP"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "form",
      title: "Dosage Form",
      type: "string",
      description: "e.g. Tablet, Capsule, Syrup, Oral Drops, Gel",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "packaging",
      title: "Packaging",
      type: "string",
      description: 'e.g. "10 x 10 Tablets Blister Pack"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "indications",
      title: "Key Benefits / Therapeutic Indications",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.min(1).error("Add at least one indication."),
    }),
    defineField({
      name: "storage",
      title: "Storage Instructions",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Show in Featured Formulations",
      type: "boolean",
      initialValue: false,
      description: "Featured products appear in the homepage highlight strip.",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "category", media: "images.0" },
  },
});
