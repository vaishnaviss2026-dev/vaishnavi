"use client";

import dynamic from "next/dynamic";

// Lazy-load the canvas backgrounds on the client only — they're decorative
// and heavy, so they shouldn't block first paint or run during SSR.
const Starfield = dynamic(() => import("./Starfield").then((m) => m.Starfield), { ssr: false });
const ThinkingDots = dynamic(() => import("./ThinkingDots").then((m) => m.ThinkingDots), { ssr: false });

export function SiteBackground() {
  return (
    <>
      <ThinkingDots />
      <Starfield starCount={600} speedFactor={0.03} starColor={[255, 255, 255]} backgroundColor="#050505" />
    </>
  );
}

export default SiteBackground;
