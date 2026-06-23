import { defineField, defineType } from "sanity";

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
        { type: "block" },
        { type: "image", options: { hotspot: true } },
        {
          type: "object",
          name: "vimeoEmbed",
          title: "Vimeo Video",
          fields: [
            { name: "vimeoId", title: "Vimeo Video ID", type: "string", description: "The number at the end of the Vimeo URL, e.g. 1203899292" },
            { name: "caption", title: "Caption (optional)", type: "string" },
          ],
          preview: {
            select: { title: "vimeoId" },
            prepare: ({ title }: { title?: string }) => ({ title: `Vimeo: ${title ?? ""}` }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});
