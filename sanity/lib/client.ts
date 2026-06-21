import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "sf46mco2",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});
