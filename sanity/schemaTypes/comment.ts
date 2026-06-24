import { defineField, defineType } from "sanity";

export const comment = defineType({
  name: "comment",
  title: "Comment",
  type: "document",
  fields: [
    defineField({ name: "postSlug", title: "Post Slug", type: "string", readOnly: true }),
    defineField({ name: "name", title: "Name", type: "string", readOnly: true }),
    defineField({ name: "email", title: "Email", type: "string", readOnly: true }),
    defineField({ name: "body", title: "Comment", type: "text", rows: 4, readOnly: true }),
    defineField({ name: "approved", title: "Approved", type: "boolean", initialValue: false }),
    defineField({ name: "submittedAt", title: "Submitted At", type: "datetime", readOnly: true }),
  ],
  preview: {
    select: { title: "name", subtitle: "body" },
  },
});
