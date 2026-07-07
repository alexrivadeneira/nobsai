import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug (URL)", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        { type: "image", options: { hotspot: true } },
        {
          type: "object",
          name: "htmlEmbed",
          title: "HTML Embed",
          fields: [
            defineField({
              name: "code",
              title: "HTML / JavaScript",
              type: "text",
              rows: 10,
              description: "Raw HTML and <script> tags. Runs unsanitized on the live page — only paste code you trust.",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "note",
              title: "Label (for your reference in the editor)",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "note", subtitle: "code" },
            prepare: ({ title, subtitle }: { title?: string; subtitle?: string }) => ({
              title: title || "HTML Embed",
              subtitle: subtitle ? subtitle.slice(0, 60) : "",
            }),
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});
