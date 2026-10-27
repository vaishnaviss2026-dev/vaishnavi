import React from "react";
import { Sparkles } from "lucide-react";
import type { Tool } from "@/lib/content";

/**
 * Map of normalized tool slugs and aliases to official, authentic SVG brand icons
 * stored locally in /public/icons/.
 */
const OFFICIAL_ICONS: Record<string, string> = {
  // Adobe Premiere Pro
  premierepro: "/icons/premierepro.svg",
  premiere: "/icons/premierepro.svg",
  pr: "/icons/premierepro.svg",
  adobepremierepro: "/icons/premierepro.svg",
  "adobe-premiere-pro": "/icons/premierepro.svg",

  // Adobe After Effects
  aftereffects: "/icons/aftereffects.svg",
  ae: "/icons/aftereffects.svg",
  "after-effects": "/icons/aftereffects.svg",
  adobeaftereffects: "/icons/aftereffects.svg",
  "adobe-after-effects": "/icons/aftereffects.svg",

  // Adobe Photoshop
  photoshop: "/icons/photoshop.svg",
  ps: "/icons/photoshop.svg",
  adobephotoshop: "/icons/photoshop.svg",
  "adobe-photoshop": "/icons/photoshop.svg",

  // OpenAI ChatGPT
  chatgpt: "/icons/chatgpt.svg",
  openai: "/icons/chatgpt.svg",
  gpt: "/icons/chatgpt.svg",

  // Anthropic Claude
  claude: "/icons/claude.svg",
  anthropic: "/icons/claude.svg",
  clude: "/icons/claude.svg",

  // Higgsfield AI
  higgsfield: "/icons/higgsfield.svg",
  higgsfieldai: "/icons/higgsfield.svg",
  "higgsfield-ai": "/icons/higgsfield.svg",
  heigfield: "/icons/higgsfield.svg",
  heigsfield: "/icons/higgsfield.svg",

  // Runway
  runway: "/icons/runway.svg",
  runwayml: "/icons/runway.svg",

  // Canva
  canva: "/icons/canva.svg",
};

/**
 * Normalizes tool name or slug to match official icon keys.
 */
function resolveIcon(tool: Tool): string | null {
  const candidates = [
    tool.iconSlug,
    tool.name,
  ];

  for (const c of candidates) {
    if (!c) continue;
    const raw = c.toLowerCase().trim();
    if (OFFICIAL_ICONS[raw]) return OFFICIAL_ICONS[raw];
    const stripped = raw.replace(/[^a-z0-9]/g, "");
    if (OFFICIAL_ICONS[stripped]) return OFFICIAL_ICONS[stripped];
  }

  return null;
}

/**
 * Renders the real official brand icon for a tool.
 */
export function ToolBadge({ tool, size = 32 }: { tool: Tool; size?: number }) {
  const iconSrc = resolveIcon(tool);

  if (iconSrc) {
    return (
      <span
        className="tool-badge-icon"
        aria-hidden="true"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: size,
          height: size,
          minWidth: size,
          minHeight: size,
          borderRadius: Math.round(size * 0.22),
          overflow: "hidden",
          flexShrink: 0,
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.4)",
          transition: "transform 0.2s ease, filter 0.2s ease",
        }}
      >
        <img
          src={iconSrc}
          alt={tool.name}
          width={size}
          height={size}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
            pointerEvents: "none",
          }}
          loading="lazy"
        />
      </span>
    );
  }

  // Fallback for custom or unknown tools
  return (
    <span
      className="tool-badge-fallback"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        borderRadius: Math.round(size * 0.22),
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        border: `1px solid ${tool.color || "rgba(255, 255, 255, 0.15)"}`,
        color: tool.color || "inherit",
        flexShrink: 0,
      }}
    >
      <Sparkles size={Math.max(14, size - 12)} color={tool.color || "#ffffff"} />
    </span>
  );
}

/**
 * Backward compatibility export for any existing legacy usages of ToolIcon.
 */
export function ToolIcon({ src, color, size = 32 }: { src: string; color: string; size?: number }) {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width: size,
        height: size,
        backgroundColor: color,
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}

export default ToolBadge;
