import { defineField, defineType } from "sanity";

export const readingList = defineType({
  name: "readingList",
  title: "Reading List",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Article Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "url", title: "URL", type: "url", validation: (r) => r.required() }),
    defineField({ name: "source", title: "Source (e.g. MIT Tech Review)", type: "string" }),
    defineField({ name: "description", title: "One-line description (optional)", type: "string" }),
    defineField({ name: "publishedAt", title: "Date Added", type: "datetime" }),
  ],
  preview: {
    select: { title: "title", subtitle: "source" },
  },
});
