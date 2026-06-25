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
    defineField({ name: "heroLabel", title: "Hero Label (e.g. Announcement)", type: "string" }),
    defineField({ name: "heroHeadline", title: "Hero Headline", type: "string" }),
    defineField({ name: "heroSubtext", title: "Hero Subtext", type: "text", rows: 2 }),
    defineField({ name: "heroLinkLabel", title: "Hero Link Label", type: "string" }),
    defineField({ name: "heroLinkUrl", title: "Hero Link URL", type: "string" }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
