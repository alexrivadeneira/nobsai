import { defineField, defineType } from "sanity";

export const video = defineType({
  name: "video",
  title: "Video",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "bunnyVideoId", title: "Bunny Video ID", type: "string", description: "The video's GUID from Bunny Stream (found in the video's page or embed URL)", validation: (r) => r.required() }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),
  ],
  preview: {
    select: { title: "title", subtitle: "bunnyVideoId" },
  },
});
