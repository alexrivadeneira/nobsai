import { defineField, defineType } from "sanity";
import { vocabBlockMarks } from "./vocabTerm";

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "author", title: "Author", type: "string" }),
    defineField({ name: "gated", title: "Members Only", type: "boolean", description: "If true, only logged-in members can read the full post." }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block", marks: vocabBlockMarks },
        { type: "image", options: { hotspot: true } },
        {
          type: "object",
          name: "bunnyEmbed",
          title: "Bunny Video",
          fields: [
            { name: "videoId", title: "Bunny Video ID", type: "string", description: "The video's GUID from Bunny Stream, e.g. 8b1e...  (found in the video's page or embed URL)" },
            { name: "caption", title: "Caption (optional)", type: "string" },
          ],
          preview: {
            select: { title: "videoId", subtitle: "caption" },
            prepare: ({ title, subtitle }: { title?: string; subtitle?: string }) => ({ title: subtitle || "Bunny Video", subtitle: title ?? "" }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});
