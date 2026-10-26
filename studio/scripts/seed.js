import { getCliClient } from "sanity/cli";

const client = getCliClient({ apiVersion: "2024-01-01" });

const SAMPLE_VIDEO = "https://www.w3schools.com/html/mov_bbb.mp4";

const defaultSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  heroHeadline: "Crafting",
  heroHighlight: "Visual Stories.",
  heroTagline: "I believe attention is earned, frame by frame.",
  heroIntro:
    "Hi, I'm Vaishnavi Shrivastava. I'm a video editor and a creative professional crafting engaging short-form and long-form content through sharp storytelling, dynamic visuals, and purposeful motion graphics. Let's make it happen.",
  aboutHeading: "About Me",
  aboutBody:
    "I focus on turning ideas into engaging visual experiences. From short-form content to long-form videos, I combine storytelling, pacing, motion graphics, and AI-powered visuals to create content that captures attention and communicates effectively. My approach is centered on pacing, storytelling and visual impact.",
  tools: [
    { _key: "t1", name: "Premiere Pro", iconSlug: "premierepro", color: "#9999FF" },
    { _key: "t2", name: "After Effects", iconSlug: "aftereffects", color: "#CF96FD" },
    { _key: "t3", name: "Photoshop", iconSlug: "photoshop", color: "#31A8FF" },
    { _key: "t4", name: "ChatGPT", iconSlug: "chatgpt", color: "#74AA9C" },
    { _key: "t5", name: "Higgsfield AI", iconSlug: "higgsfield", color: "#FF6B2C" },
    { _key: "t6", name: "Runway", iconSlug: "runway", color: "#ffffff" },
    { _key: "t7", name: "Canva", iconSlug: "canva", color: "#00C4CC" },
  ],
  contactHeading: "Ready to",
  contactHighlight: "create?",
  contactLead:
    "Let's turn your ideas into compelling visual stories. Reach out via email or schedule a quick intro call.",
  email: "vaishnaviss2026@gmail.com",
  whatsapp: "919981783744",
  calLink: "https://calendly.com",
};

const defaultProjects = [
  // Motion Graphics
  {
    title: "Neon Dreams",
    category: "3D Animation & VFX",
    section: "motion",
    order: 1,
    ratio: "ratio-16-9",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=900&q=80&auto=format&fit=crop",
    videoUrl: SAMPLE_VIDEO,
  },
  {
    title: "Cyberpunk HUD",
    category: "Futuristic UI Animation",
    section: "motion",
    order: 2,
    ratio: "ratio-16-9",
    imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=900&q=80&auto=format&fit=crop",
    videoUrl: SAMPLE_VIDEO,
  },
  {
    title: "Quantum Flow",
    category: "Kinetic Typography",
    section: "motion",
    order: 3,
    ratio: "ratio-16-9",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&q=80&auto=format&fit=crop",
    videoUrl: SAMPLE_VIDEO,
  },
  {
    title: "Liquid Chrome",
    category: "Logo Sting & Ident",
    section: "motion",
    order: 4,
    ratio: "ratio-16-9",
    imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=900&q=80&auto=format&fit=crop",
    videoUrl: SAMPLE_VIDEO,
  },

  // Short-Form
  {
    title: "Vlog Style Edit",
    category: "Reels / High Energy",
    section: "short",
    order: 1,
    ratio: "ratio-9-16",
    color: "#331122",
    videoUrl: SAMPLE_VIDEO,
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&q=80&auto=format&fit=crop",
  },
  {
    title: "Dynamic Captions",
    category: "TikTok / Fast Paced",
    section: "short",
    order: 2,
    ratio: "ratio-9-16",
    color: "#112233",
    videoUrl: SAMPLE_VIDEO,
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&q=80&auto=format&fit=crop",
  },
  {
    title: "Gaming Highlight Reel",
    category: "Shorts / Visual Effects",
    section: "short",
    order: 3,
    ratio: "ratio-9-16",
    color: "#223311",
    videoUrl: SAMPLE_VIDEO,
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=900&q=80&auto=format&fit=crop",
  },
  {
    title: "Luxury Product Showcase",
    category: "Reels / Commercial Cut",
    section: "short",
    order: 4,
    ratio: "ratio-9-16",
    color: "#333311",
    videoUrl: SAMPLE_VIDEO,
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&q=80&auto=format&fit=crop",
  },

  // Long-Form
  {
    title: "The Creator Economy: 2026",
    category: "Documentary Feature",
    section: "long",
    order: 1,
    ratio: "ratio-16-9",
    imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=900&q=80&auto=format&fit=crop",
    videoUrl: SAMPLE_VIDEO,
  },
  {
    title: "Unfiltered: Studio Deep Dive",
    category: "Multi-Cam Podcast",
    section: "long",
    order: 2,
    ratio: "ratio-16-9",
    imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=900&q=80&auto=format&fit=crop",
    videoUrl: SAMPLE_VIDEO,
  },
  {
    title: "Tech Horizon: AI Visuals",
    category: "YouTube Video Essay",
    section: "long",
    order: 3,
    ratio: "ratio-16-9",
    imageUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=900&q=80&auto=format&fit=crop",
    videoUrl: SAMPLE_VIDEO,
  },
  {
    title: "Cinematography Masterclass",
    category: "Educational Series",
    section: "long",
    order: 4,
    ratio: "ratio-16-9",
    imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=900&q=80&auto=format&fit=crop",
    videoUrl: SAMPLE_VIDEO,
  },

  // AI Creative Work
  {
    title: "Surreal Landscapes",
    category: "AI Generation",
    section: "ai",
    order: 1,
    ratio: "ratio-16-9",
    color: "#1a1025",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&q=80&auto=format&fit=crop",
  },
  {
    title: "Avatar Animation",
    category: "AI Video",
    section: "ai",
    order: 2,
    ratio: "ratio-16-9",
    color: "#10251a",
    imageUrl: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=900&q=80&auto=format&fit=crop",
  },
  {
    title: "Upscaled Classics",
    category: "AI Enhancement",
    section: "ai",
    order: 3,
    ratio: "ratio-16-9",
    color: "#251a10",
    imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=900&q=80&auto=format&fit=crop",
  },
  {
    title: "Quantum Horizons",
    category: "Generative World",
    section: "ai",
    order: 4,
    ratio: "ratio-16-9",
    color: "#1b1429",
    imageUrl: "https://images.unsplash.com/photo-1633493106115-68a8607fa6d3?w=900&q=80&auto=format&fit=crop",
  },
];

async function uploadImageFromUrl(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const asset = await client.assets.upload("image", buffer, {
      filename: `thumb-${Date.now()}.jpg`,
    });
    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    };
  } catch (err) {
    console.warn("Could not upload image from", url, err.message);
    return null;
  }
}

async function run() {
  console.log("1. Seeding Site Settings...");
  await client.createOrReplace(defaultSettings);
  console.log("✓ Site Settings created.");

  console.log("2. Seeding Projects with initial numbers and cover photos...");
  for (const item of defaultProjects) {
    let thumbnailObj = null;
    if (item.imageUrl) {
      console.log(`Uploading thumbnail for: ${item.title}...`);
      thumbnailObj = await uploadImageFromUrl(item.imageUrl);
    }

    const doc = {
      _type: "project",
      title: item.title,
      category: item.category,
      section: item.section,
      order: item.order,
      ratio: item.ratio || "ratio-16-9",
      color: item.color || "#18181b",
      videoUrl: item.videoUrl || undefined,
      ...(thumbnailObj ? { thumbnail: thumbnailObj } : {}),
    };

    const created = await client.create(doc);
    console.log(`✓ Created [#${item.order}] ${item.title} (${item.section}) [ID: ${created._id}]`);
  }

  console.log("\n🎉 Seeding completed successfully! All projects and settings are now in Sanity Studio.");
}

run().catch((e) => {
  console.error("Seeding failed:", e);
  process.exit(1);
});
