import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "jtaypzbk",
    dataset: "production",
  },
  /** Generate TypeScript types for the Next.js app's GROQ queries. */
  typegen: {
    enabled: true,
    path: "../web/src/**/*.{ts,tsx,js,jsx}",
    schema: "schema.json",
    generates: "../web/sanity.types.ts",
    overloadClientMethods: true,
  },
});
