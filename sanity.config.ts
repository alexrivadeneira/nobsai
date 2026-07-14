import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";
import { CopyJoinLinkAction } from "./sanity/actions/CopyJoinLink";

export default defineConfig({
  name: "default",
  title: "Working Knowledge AI",
  projectId: "sf46mco2",
  dataset: "production",
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
  document: {
    actions: (prev, { schemaType }) =>
      schemaType === "post" ? [...prev, CopyJoinLinkAction] : prev,
  },
});
