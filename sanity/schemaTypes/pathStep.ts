import { defineField, defineType } from "sanity";

export const pathStep = defineType({
  name: "pathStep",
  title: "Path Step",
  type: "document",
  fields: [
    defineField({ name: "stepNumber", title: "Step Number", type: "number", validation: (r) => r.required().min(1) }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "state",
      title: "State",
      type: "string",
      options: {
        list: [
          { title: "Ready", value: "ready" },
          { title: "Next up", value: "next" },
          { title: "Coming soon", value: "coming" },
        ],
        layout: "radio",
      },
      initialValue: "coming",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "statusLabel",
      title: "Status Label (optional)",
      type: "string",
      description: 'Overrides the default label (Ready / Next up / Coming soon), e.g. "Preview below".',
    }),
    defineField({
      name: "timeEstimate",
      title: "Time Estimate",
      type: "string",
      description: 'e.g. "15 min". Leave blank for coming-soon steps.',
    }),
    defineField({
      name: "href",
      title: "Link",
      type: "string",
      description: "Where this step links, e.g. /read/what-ai-is. Leave blank for no link.",
    }),
    defineField({
      name: "enabled",
      title: "Enabled",
      type: "boolean",
      initialValue: true,
      description: "Uncheck to hide this step without deleting it.",
    }),
  ],
  orderings: [{ title: "Step order", name: "stepAsc", by: [{ field: "stepNumber", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "state", n: "stepNumber" },
    prepare: ({ title, subtitle, n }: { title?: string; subtitle?: string; n?: number }) => ({
      title: `${n ?? "?"}. ${title ?? ""}`,
      subtitle: subtitle ?? "",
    }),
  },
});
