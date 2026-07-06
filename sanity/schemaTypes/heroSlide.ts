import { defineField, defineType } from "sanity";

export const heroSlide = defineType({
  name: "heroSlide",
  title: "Hero Slide",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Label (e.g. Announcement)", type: "string" }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "subtext", title: "Subtext", type: "text", rows: 2 }),
    defineField({ name: "linkLabel", title: "Link Label", type: "string" }),
    defineField({ name: "linkUrl", title: "Link URL", type: "string" }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Slides are shown lowest number first",
      initialValue: 0,
    }),
    defineField({
      name: "enabled",
      title: "Enabled",
      type: "boolean",
      description: "Turn off to hide this slide without deleting it",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "headline", subtitle: "label", media: "image" },
  },
});
