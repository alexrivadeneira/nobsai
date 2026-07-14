import { defineField, defineType } from "sanity";

export const vocabTerm = defineType({
  name: "vocabTerm",
  title: "Vocab Term",
  type: "document",
  fields: [
    defineField({
      name: "term",
      title: "Term",
      type: "string",
      description: "The word or phrase as readers will see it, e.g. \"AI chatbot\" or \"LLM\"",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "definition",
      title: "Definition",
      type: "text",
      rows: 3,
      description: "Short, plain-English definition shown in the popup. Aim for 1-3 sentences.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "learnMoreUrl",
      title: "Learn More Link (optional)",
      type: "string",
      description: "Where the term was introduced, e.g. /pages/what-ai-actually-is",
    }),
  ],
  preview: {
    select: { title: "term", subtitle: "definition" },
  },
});

/**
 * Block marks config that adds the Vocab annotation alongside the default link.
 * Use in any portable text field: { type: "block", marks: vocabBlockMarks }
 * (Defining `annotations` replaces Sanity's defaults, so link is re-declared here.)
 */
export const vocabBlockMarks = {
  annotations: [
    {
      name: "link",
      type: "object",
      title: "Link",
      fields: [{ name: "href", type: "url", title: "URL" }],
    },
    {
      name: "vocab",
      type: "object",
      title: "Vocab Term",
      icon: () => "📖",
      fields: [
        {
          name: "term",
          type: "reference",
          title: "Term",
          to: [{ type: "vocabTerm" }],
        },
      ],
    },
  ],
};
