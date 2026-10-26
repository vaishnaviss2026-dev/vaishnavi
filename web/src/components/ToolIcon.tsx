import { Sparkles } from "lucide-react";
import type { Tool } from "@/lib/content";

/** A single-colour icon rendered from an SVG via CSS mask (keeps it crisp
 *  and lets us tint to each brand's colour). */
export function ToolIcon({ src, color, size = 28 }: { src: string; color: string; size?: number }) {
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

const SLUG_TO_SIMPLE_ICON: Record<string, string> = {
  premierepro: "adobepremierepro",
  aftereffects: "adobeaftereffects",
  photoshop: "adobephotoshop",
  chatgpt: "openai",
  runway: "runway",
  canva: "canva",
};

/** Renders the right icon for a tool, handling brands without a simple-icon. */
export function ToolBadge({ tool, size = 28 }: { tool: Tool; size?: number }) {
  const slug = tool.iconSlug?.toLowerCase();
  const simpleIcon = slug ? SLUG_TO_SIMPLE_ICON[slug] : undefined;

  if (simpleIcon) {
    return (
      <ToolIcon
        src={`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${simpleIcon}.svg`}
        color={tool.color}
        size={size}
      />
    );
  }

  // Higgsfield AI (and any unknown slug) — no official simple-icon available.
  return <Sparkles size={size - 2} color={tool.color} />;
}

export default ToolIcon;
