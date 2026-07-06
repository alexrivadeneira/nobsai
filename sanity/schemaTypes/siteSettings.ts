import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "aboutTitle", title: "About Title", type: "string" }),
    defineField({ name: "aboutBody", title: "About Bio", type: "text", rows: 4 }),
    defineField({ name: "aboutImage", title: "About Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "aboutLinkLabel", title: "About Link Label", type: "string" }),
    defineField({ name: "aboutLinkUrl", title: "About Link URL", type: "string" }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
