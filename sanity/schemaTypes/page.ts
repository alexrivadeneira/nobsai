import { defineField, defineType } from "sanity";
import { vocabBlockMarks } from "./vocabTerm";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug (URL)", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
    defineField({
      name: "wide",
      title: "Wide Layout",
      type: "boolean",
      description: "Use a wider content column — good for embeds and interactive content",
      initialValue: false,
    }),
    defineField({
      name: "showOnHome",
      title: "Show on Homepage",
      type: "boolean",
      description: "List this page as a card in the homepage grid, like a blog post",
      initialValue: false,
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt (for homepage card)",
      type: "text",
      rows: 3,
      hidden: ({ document }) => !document?.showOnHome,
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image (for homepage card)",
      type: "image",
      options: { hotspot: true },
      hidden: ({ document }) => !document?.showOnHome,
    }),
    defineField({
      name: "category",
      title: "Category (for homepage card)",
      type: "string",
      initialValue: "Interactive",
      hidden: ({ document }) => !document?.showOnHome,
    }),
    defineField({
      name: "ribbon",
      title: "Ribbon Text (for homepage card)",
      type: "string",
      description: "Optional corner ribbon over the card, e.g. \"Interactive\" or \"Try it\". Leave empty for no ribbon.",
      hidden: ({ document }) => !document?.showOnHome,
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block", marks: vocabBlockMarks },
        { type: "image", options: { hotspot: true } },
        {
          type: "object",
          name: "signupForm",
          title: "Signup Form",
          fields: [
            defineField({
              name: "cta",
              title: "Button Text",
              type: "string",
              initialValue: "Count me in →",
            }),
            defineField({
              name: "redirect",
              title: "Redirect After Signup",
              type: "string",
              description: "Where to send people after they sign up, e.g. /pages/thanks-jul7-meeting",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "note",
              title: "Note Under Button",
              type: "string",
              initialValue: "No spam. Unsubscribe anytime.",
            }),
            defineField({
              name: "tag",
              title: "Mailchimp Tag",
              type: "string",
              description: "Optional. Tag applied to everyone who signs up here (including existing subscribers), e.g. workshop-july-9",
            }),
          ],
          preview: {
            select: { subtitle: "redirect" },
            prepare: ({ subtitle }: { subtitle?: string }) => ({
              title: "Signup Form",
              subtitle: subtitle ? `→ ${subtitle}` : "",
            }),
          },
        },
        {
          type: "object",
          name: "bunnyEmbed",
          title: "Bunny Video",
          fields: [
            defineField({
              name: "videoId",
              title: "Bunny Video ID",
              type: "string",
              description: "The video's GUID from Bunny Stream, e.g. 8b1e...  (found in the video's page or embed URL)",
            }),
            defineField({ name: "caption", title: "Caption (optional)", type: "string" }),
          ],
          preview: {
            select: { title: "videoId", subtitle: "caption" },
            prepare: ({ title, subtitle }: { title?: string; subtitle?: string }) => ({
              title: subtitle || "Bunny Video",
              subtitle: title ?? "",
            }),
          },
        },
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
