import { defineField, defineType } from "sanity";

export const aiQuestion = defineType({
  name: "aiQuestion",
  title: "AI Question",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Question", type: "text", rows: 4, readOnly: true }),
    defineField({ name: "email", title: "Email", type: "string", readOnly: true }),
    defineField({ name: "submittedAt", title: "Submitted At", type: "datetime", readOnly: true }),
    defineField({
      name: "answered",
      title: "Answered",
      type: "boolean",
      initialValue: false,
      description: "Toggle on to show in the 'Recently answered' box on the homepage",
    }),
    defineField({
      name: "displayQuestion",
      title: "Display Question",
      type: "string",
      description: "Optional cleaned-up version of the question to show publicly",
    }),
    defineField({ name: "answerLabel", title: "Answer Link Label", type: "string" }),
    defineField({ name: "answerUrl", title: "Answer Link URL", type: "string" }),
  ],
  preview: {
    select: { title: "question", subtitle: "email" },
  },
});
