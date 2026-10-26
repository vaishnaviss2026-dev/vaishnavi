"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface AccordionItem {
  title: string;
  category: string;
  color?: string;
  icon?: ReactNode;
}

export function AccordionGallery({ items, className = "" }: { items: AccordionItem[]; className?: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={`accordion-gallery ${className}`}>
      {items.map((item, index) => {
        const isActive = activeIndex === index;
        return (
          <motion.div
            key={index}
            className="accordion-item"
            onHoverStart={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
            animate={{ flex: isActive ? 3 : 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
            style={{
              position: "relative",
              height: "100%",
              borderRadius: "24px",
              overflow: "hidden",
              cursor: "pointer",
              backgroundColor: "#111",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: isActive ? "2px solid rgba(227, 58, 36, 0.5)" : "2px solid transparent",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: item.color || "#222",
                opacity: isActive ? 1 : 0.5,
                transition: "opacity 0.3s ease",
              }}
            />
            <motion.div
              animate={{ scale: isActive ? 1.2 : 1, y: isActive ? -20 : 0, opacity: isActive ? 0.3 : 1 }}
              style={{ position: "absolute", zIndex: 1 }}
            >
              {item.icon}
            </motion.div>
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  style={{ position: "absolute", bottom: "2rem", left: "2rem", right: "2rem", zIndex: 2, textAlign: "left" }}
                >
                  <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "0 0 0.5rem", color: "#fff" }}>
                    {item.title}
                  </h3>
                  <p style={{ margin: 0, color: "rgba(255,255,255,0.7)", fontSize: "0.9rem" }}>{item.category}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

export default AccordionGallery;
