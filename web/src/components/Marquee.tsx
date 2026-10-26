import type { Tool } from "@/lib/content";
import { ToolBadge } from "./ToolIcon";

export function Marquee({ tools }: { tools: Tool[] }) {
  const loop = [...tools, ...tools, ...tools, ...tools];
  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {loop.map((tool, i) => (
          <div className="marquee-item" key={i}>
            <ToolBadge tool={tool} />
            <span>{tool.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Marquee;
