import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
// @ts-expect-error – vision types may lag behind sanity version
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "NoBSAI",
  projectId: "sf46mco2",
  dataset: "production",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
