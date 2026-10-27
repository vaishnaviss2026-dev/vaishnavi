import { client } from "@/sanity/client";
import { urlFor } from "@/sanity/image";
import { PROJECTS_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/queries";

export type ToolSection = "motion" | "short" | "long" | "ai";

export interface Tool {
  name: string;
  iconSlug: string;
  color: string;
}

export interface Project {
  _id?: string;
  title: string;
  category: string;
  section: ToolSection;
  ratio?: string;
  videoUrl?: string;
  color?: string;
  imageUrl?: string | null;
}

export interface SiteContent {
  hero: {
    headline: string;
    highlight: string;
    tagline: string;
    intro: string;
    imageUrl: string | null;
  };
  about: {
    heading: string;
    body: string;
    imageUrl: string | null;
  };
  tools: Tool[];
  contact: {
    heading: string;
    highlight: string;
    lead: string;
    email: string;
    whatsapp: string;
    calLink: string;
  };
  projects: Record<ToolSection, Project[]>;
}

const SAMPLE_VIDEO = "https://www.w3schools.com/html/mov_bbb.mp4";

/** Built-in defaults — the site renders fully from these even before Sanity
 *  has content (or while the project is still being connected). */
export const defaultContent: SiteContent = {
  hero: {
    headline: "Crafting",
    highlight: "Visual Stories.",
    tagline: "I believe attention is earned, frame by frame.",
    intro:
      "Hi, I'm Vaishnavi Shrivastava. I'm a video editor and a creative professional crafting engaging short-form and long-form content through sharp storytelling, dynamic visuals, and purposeful motion graphics. Let's make it happen.",
    imageUrl: null,
  },
  about: {
    heading: "About Me",
    body:
      "I focus on turning ideas into engaging visual experiences. From short-form content to long-form videos, I combine storytelling, pacing, motion graphics, and AI-powered visuals to create content that captures attention and communicates effectively. My approach is centered on pacing, storytelling and visual impact.",
    imageUrl: null,
  },
  tools: [
    { name: "Premiere Pro", iconSlug: "premierepro", color: "#9999FF" },
    { name: "After Effects", iconSlug: "aftereffects", color: "#CF96FD" },
    { name: "Photoshop", iconSlug: "photoshop", color: "#31A8FF" },
    { name: "ChatGPT", iconSlug: "chatgpt", color: "#74AA9C" },
    { name: "Claude", iconSlug: "claude", color: "#D97757" },
    { name: "Higgsfield AI", iconSlug: "higgsfield", color: "#D1FE17" },
    { name: "Runway", iconSlug: "runway", color: "#ffffff" },
    { name: "Canva", iconSlug: "canva", color: "#00C4CC" },
  ],
  contact: {
    heading: "Ready to",
    highlight: "create?",
    lead: "",
    email: "vaishnavishrivastava41@gmail.com",
    whatsapp: "919981783744",
    calLink: "",
  },
  projects: {
    motion: [
      {
        title: "Neon Dreams",
        category: "3D Animation & VFX",
        section: "motion",
        ratio: "ratio-16-9",
        imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=900&q=80&auto=format&fit=crop",
        videoUrl: SAMPLE_VIDEO,
      },
      {
        title: "Cyberpunk HUD",
        category: "Futuristic UI Animation",
        section: "motion",
        ratio: "ratio-16-9",
        imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=900&q=80&auto=format&fit=crop",
        videoUrl: SAMPLE_VIDEO,
      },
      {
        title: "Quantum Flow",
        category: "Kinetic Typography",
        section: "motion",
        ratio: "ratio-16-9",
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&q=80&auto=format&fit=crop",
        videoUrl: SAMPLE_VIDEO,
      },
      {
        title: "Liquid Chrome",
        category: "Logo Sting & Ident",
        section: "motion",
        ratio: "ratio-16-9",
        imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=900&q=80&auto=format&fit=crop",
        videoUrl: SAMPLE_VIDEO,
      },
    ],
    short: [
      { title: "Vlog Style edit", category: "Reels", section: "short", color: "#331122", videoUrl: SAMPLE_VIDEO },
      { title: "Dynamic Captions", category: "TikTok", section: "short", color: "#112233", videoUrl: SAMPLE_VIDEO },
      { title: "Gaming Highlight", category: "Shorts", section: "short", color: "#223311", videoUrl: SAMPLE_VIDEO },
      { title: "Product Showcase", category: "Reels", section: "short", color: "#333311", videoUrl: SAMPLE_VIDEO },
    ],
    long: [
      {
        title: "The Creator Economy: 2026",
        category: "Documentary Feature",
        section: "long",
        ratio: "ratio-16-9",
        imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=900&q=80&auto=format&fit=crop",
        videoUrl: SAMPLE_VIDEO,
      },
      {
        title: "Unfiltered: Studio Deep Dive",
        category: "Multi-Cam Podcast",
        section: "long",
        ratio: "ratio-16-9",
        imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=900&q=80&auto=format&fit=crop",
        videoUrl: SAMPLE_VIDEO,
      },
      {
        title: "Tech Horizon: AI Visuals",
        category: "YouTube Video Essay",
        section: "long",
        ratio: "ratio-16-9",
        imageUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=900&q=80&auto=format&fit=crop",
        videoUrl: SAMPLE_VIDEO,
      },
      {
        title: "Cinematography Masterclass",
        category: "Educational Series",
        section: "long",
        ratio: "ratio-16-9",
        imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=900&q=80&auto=format&fit=crop",
        videoUrl: SAMPLE_VIDEO,
      },
    ],
    ai: [
      { title: "Surreal Landscapes", category: "AI Generation", section: "ai", color: "#1a1025" },
      { title: "Avatar Animation", category: "AI Video", section: "ai", color: "#10251a" },
      { title: "Upscaled Classics", category: "AI Enhancement", section: "ai", color: "#251a10" },
    ],
  },
};

interface RawSettings {
  heroHeadline?: string;
  heroHighlight?: string;
  heroTagline?: string;
  heroIntro?: string;
  heroImage?: unknown;
  aboutHeading?: string;
  aboutBody?: string;
  aboutImage?: unknown;
  tools?: { name?: string; iconSlug?: string; color?: string }[];
  contactHeading?: string;
  contactHighlight?: string;
  contactLead?: string;
  email?: string;
  whatsapp?: string;
  calLink?: string;
}

interface RawProject {
  _id: string;
  title?: string;
  category?: string;
  section?: ToolSection;
  ratio?: string;
  videoUrl?: string;
  color?: string;
  thumbnail?: unknown;
}

function safeImageUrl(source: unknown): string | null {
  if (!source) return null;
  try {
    return urlFor(source as never).width(900).url();
  } catch {
    return null;
  }
}

/** Fetch content from Sanity, falling back to defaults on any error/empty. */
export async function getContent(): Promise<SiteContent> {
  let settings: RawSettings | null = null;
  let projects: RawProject[] = [];

  try {
    [settings, projects] = await Promise.all([
      client.fetch<RawSettings | null>(SITE_SETTINGS_QUERY, {}, { next: { revalidate: 60 } }),
      client.fetch<RawProject[]>(PROJECTS_QUERY, {}, { next: { revalidate: 60 } }),
    ]);
  } catch {
    // Sanity not reachable yet — use built-in content.
    return defaultContent;
  }

  if (!settings && (!projects || projects.length === 0)) {
    return defaultContent;
  }

  const d = defaultContent;

  const grouped: Record<ToolSection, Project[]> = { motion: [], short: [], long: [], ai: [] };
  for (const p of projects || []) {
    if (!p.section || !(p.section in grouped)) continue;
    grouped[p.section].push({
      _id: p._id,
      title: p.title || "Untitled",
      category: p.category || "",
      section: p.section,
      ratio: p.ratio,
      videoUrl: p.videoUrl,
      color: p.color,
      imageUrl: safeImageUrl(p.thumbnail),
    });
  }
  const anyProjects = Object.values(grouped).some((arr) => arr.length > 0);

  return {
    hero: {
      headline: settings?.heroHeadline || d.hero.headline,
      highlight: settings?.heroHighlight || d.hero.highlight,
      tagline: settings?.heroTagline || d.hero.tagline,
      intro: settings?.heroIntro || d.hero.intro,
      imageUrl: safeImageUrl(settings?.heroImage) ?? d.hero.imageUrl,
    },
    about: {
      heading: settings?.aboutHeading || d.about.heading,
      body: settings?.aboutBody || d.about.body,
      imageUrl: safeImageUrl(settings?.aboutImage) ?? d.about.imageUrl,
    },
    tools: (() => {
      const list =
        settings?.tools && settings.tools.length
          ? settings.tools.map((t) => ({
              name: t.name || "",
              iconSlug: t.iconSlug || "",
              color: t.color || "#ffffff",
            }))
          : [...d.tools];
      // Guarantee Claude is always included in tools
      const hasClaude = list.some(
        (t) => (t.iconSlug || t.name || "").toLowerCase().includes("claud")
      );
      if (!hasClaude) {
        list.splice(4, 0, { name: "Claude", iconSlug: "claude", color: "#D97757" });
      }
      return list;
    })(),
    contact: {
      heading: settings?.contactHeading || d.contact.heading,
      highlight: settings?.contactHighlight || d.contact.highlight,
      lead: settings?.contactLead ?? d.contact.lead,
      email: "vaishnavishrivastava41@gmail.com",
      whatsapp: settings?.whatsapp || d.contact.whatsapp,
      calLink: "",
    },
    projects: anyProjects ? grouped : d.projects,
  };
}
