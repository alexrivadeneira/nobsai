import { defineField, defineType } from "sanity";

export const workshop = defineType({
  name: "workshop",
  title: "Workshop",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "month", title: "Month (e.g. Jul)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "days", title: "Days (e.g. 10–11)", type: "string", validation: (r) => r.required() }),
    defineField({ name: "time", title: "Time (e.g. 2:00 PM)", type: "string" }),
    defineField({ name: "location", title: "Location (e.g. NYC)", type: "string" }),
    defineField({ name: "tier", title: "Tier (e.g. Premium)", type: "string" }),
    defineField({ name: "price", title: "Price (e.g. $300)", type: "string" }),
    defineField({ name: "registerUrl", title: "Register URL", type: "url" }),
    defineField({ name: "date", title: "Date (for sorting)", type: "date" }),
  ],
  preview: {
    select: { title: "title", subtitle: "month" },
  },
});
