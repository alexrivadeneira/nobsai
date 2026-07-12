import { defineField, defineType } from "sanity";

export const digest = defineType({
  name: "digest",
  title: "AI News Digest",
  type: "document",
  fields: [
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "items",
      title: "Stories",
      type: "array",
      validation: (r) => r.required().min(1),
      of: [
        {
          type: "object",
          name: "digestItem",
          title: "Story",
          fields: [
            defineField({ name: "headline", title: "Headline", type: "string", validation: (r) => r.required() }),
            { name: "summary", title: "Summary (max 3 sentences)", type: "text", rows: 3 },
            { name: "url", title: "Source Link", type: "url" },
            { name: "source", title: "Source Name", type: "string", description: "e.g. Hacker News, Anthropic" },
          ],
          preview: {
            select: { title: "headline", subtitle: "source" },
          },
        },
      ],
    }),
  ],
  orderings: [
    {
      title: "Date, newest first",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "date" },
    prepare: ({ title }: { title?: string }) => ({ title: `Digest – ${title ?? "undated"}` }),
  },
});
