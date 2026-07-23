import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "bannerEnabled",
      title: "Show Announcement Banner",
      type: "boolean",
      description: "Turn on to show the banner at the very top of every page",
      initialValue: false,
    }),
    defineField({ name: "bannerText", title: "Banner Text", type: "string" }),
    defineField({ name: "bannerLinkLabel", title: "Banner Link Label", type: "string", description: "Optional, e.g. 'Sign up →'" }),
    defineField({ name: "bannerLinkUrl", title: "Banner Link URL", type: "string" }),
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
