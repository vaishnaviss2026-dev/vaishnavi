import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import { projectId, dataset } from "./src/sanity/env";

export default defineConfig({
  name: "default",
  title: "Vaishnavi Portfolio Studio",
  basePath: "/studio",

  projectId,
  dataset,

  plugins: [structureTool({ structure })],

  schema: {
    types: schemaTypes,
  },
});
