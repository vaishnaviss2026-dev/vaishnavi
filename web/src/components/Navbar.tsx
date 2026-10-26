"use client";

import dynamic from "next/dynamic";

const GooeyNav = dynamic(() => import("./GooeyNav"), { ssr: false });

export function Navbar() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="navbar">
      <div className="container" style={{ display: "flex", justifyContent: "center" }}>
        <GooeyNav
          items={navItems}
          theme="dark"
          color="#E33A24"
          activeTextColor="#ffffff"
          size="md"
          frame={true}
          onChange={(_index, item) => {
            const targetId = item.href?.replace("#", "");
            if (targetId) scrollTo(targetId);
          }}
        />
      </div>
    </header>
  );
}

export default Navbar;
