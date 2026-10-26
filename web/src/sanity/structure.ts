import type { StructureResolver } from "sanity/structure";
import { CogIcon } from "@sanity/icons/Cog";
import { PlayIcon } from "@sanity/icons/Play";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Portfolio Studio")
    .items([
      // Site Settings Singleton
      S.listItem()
        .title("⚙️ Site Settings (Hero, About, Contact)")
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings")
        ),

      S.divider(),

      // Motion Graphics
      S.listItem()
        .title("🎬 Motion Graphics (16:9 Carousel)")
        .icon(PlayIcon)
        .child(
          S.documentList()
            .title("Motion Graphics Videos")
            .filter('_type == "project" && section == "motion"')
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),

      // Short-Form
      S.listItem()
        .title("📱 Short-Form (Reels & Shorts)")
        .icon(PlayIcon)
        .child(
          S.documentList()
            .title("Short-Form Videos")
            .filter('_type == "project" && section == "short"')
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),

      // Long-Form
      S.listItem()
        .title("🎥 Long-Form Videos (Theater Showcase)")
        .icon(PlayIcon)
        .child(
          S.documentList()
            .title("Long-Form Videos")
            .filter('_type == "project" && section == "long"')
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),

      // AI Creative Work
      S.listItem()
        .title("✨ AI Creative Work (Card Stack)")
        .icon(PlayIcon)
        .child(
          S.documentList()
            .title("AI Creative Work")
            .filter('_type == "project" && section == "ai"')
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),

      S.divider(),

      // All Projects
      S.documentTypeListItem("project")
        .title("📁 All Media / Projects")
        .icon(PlayIcon),
    ]);
