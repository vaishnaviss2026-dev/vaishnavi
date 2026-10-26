import { defineType, defineField } from "sanity";
import { PlayIcon } from "@sanity/icons/Play";

export const project = defineType({
  name: "project",
  title: "Media Project",
  type: "document",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "title",
      title: "Project / Video Title",
      type: "string",
      description: "Name of the project or video",
      validation: (r) => r.required().error("Title is required"),
    }),
    defineField({
      name: "section",
      title: "Portfolio Section",
      type: "string",
      description: "Which carousel / area on the website this project appears in",
      options: {
        list: [
          { title: "🎬 Motion Graphics (16:9 Carousel)", value: "motion" },
          { title: "📱 Short-Form (Reels & Shorts Dome)", value: "short" },
          { title: "🎥 Long-Form Videos (Theater Showcase)", value: "long" },
          { title: "✨ AI Creative Work (Card Stack)", value: "ai" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required().error("Section is required"),
    }),
    defineField({
      name: "order",
      title: "Display Number / Order",
      type: "number",
      description:
        "Adjust the sequence number. 1 displays 1st, 2 displays 2nd, etc. Change this number to reorder videos and photos.",
      initialValue: 1,
      validation: (r) => r.required().min(1).error("Order number must be 1 or higher"),
    }),
    defineField({
      name: "category",
      title: "Category / Subtitle Tag",
      type: "string",
      description: "e.g. 3D Animation, Multi-Cam Podcast, Instagram Reel, AI Generation",
    }),
    defineField({
      name: "thumbnail",
      title: "Cover Photo / Thumbnail",
      type: "image",
      description: "Upload photo/poster image for this project.",
      options: { hotspot: true },
    }),
    defineField({
      name: "videoFile",
      title: "Direct Video Upload",
      type: "file",
      description: "Upload an MP4, WebM, or MOV video file directly from your computer.",
      options: {
        accept: "video/*",
      },
    }),
    defineField({
      name: "videoUrl",
      title: "External Video Link (URL)",
      type: "url",
      description: "Or paste a direct video link, YouTube, or Vimeo URL.",
    }),
    defineField({
      name: "ratio",
      title: "Aspect Ratio",
      type: "string",
      options: {
        list: [
          { title: "16:9 (Landscape / Standard Video)", value: "ratio-16-9" },
          { title: "9:16 (Vertical / Reels & Shorts)", value: "ratio-9-16" },
          { title: "1:1 (Square)", value: "ratio-1-1" },
        ],
      },
      initialValue: "ratio-16-9",
    }),
    defineField({
      name: "color",
      title: "Card Accent Color",
      type: "string",
      description: "Fallback hex color e.g. #E33A24 or #18181b",
    }),
  ],
  orderings: [
    {
      title: "Order Number (1 → 100)",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Order Number (100 → 1)",
      name: "orderDesc",
      by: [{ field: "order", direction: "desc" }],
    },
    {
      title: "Title (A-Z)",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      order: "order",
      category: "category",
      section: "section",
      media: "thumbnail",
    },
    prepare({ title, order, category, section, media }) {
      const sectionLabels: Record<string, string> = {
        motion: "Motion Graphics",
        short: "Short-Form",
        long: "Long-Form",
        ai: "AI Creative Work",
      };
      const numLabel = order !== undefined ? `#${order}` : "No order";
      const secLabel = sectionLabels[section] || section || "General";
      return {
        title: `${numLabel} — ${title || "Untitled Project"}`,
        subtitle: `${secLabel}${category ? ` • ${category}` : ""}`,
        media,
      };
    },
  },
});
