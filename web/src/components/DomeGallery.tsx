"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";

export interface DomeItem {
  title: string;
  category: string;
  color?: string;
  poster?: string;
  videoUrl?: string;
}

export function DomeGallery({ items }: { items: DomeItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "500px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: "1000px",
        overflow: "hidden",
      }}
    >
      <button
        onClick={handlePrev}
        aria-label="Previous"
        style={navBtn("left")}
      >
        <ChevronLeft size={24} />
      </button>

      <div style={{ position: "relative", width: "280px", height: "400px", transformStyle: "preserve-3d" }}>
        <AnimatePresence initial={false}>
          {items.map((item, i) => {
            const offset = (i - currentIndex + items.length) % items.length;
            const isActive = offset === 0;
            const isPrev = offset === items.length - 1;
            const isNext = offset === 1;
            if (!isActive && !isPrev && !isNext) return null;

            let x = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 1;
            let rotateY = 0;
            if (isPrev) { x = -200; scale = 0.8; opacity = 0.5; rotateY = 15; }
            if (isNext) { x = 200; scale = 0.8; opacity = 0.5; rotateY = -15; }
            if (isActive) { x = 0; scale = 1; opacity = 1; zIndex = 5; }

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: x > 0 ? 300 : -300 }}
                animate={{ opacity, x, scale, zIndex, rotateY }}
                exit={{ opacity: 0, x: x > 0 ? -300 : 300 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 30 }}
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  borderRadius: "16px",
                  backgroundColor: "#111",
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: isActive ? "0 20px 40px rgba(227, 58, 36, 0.3)" : "0 10px 20px rgba(0,0,0,0.5)",
                }}
                onClick={() => {
                  if (isActive && item.videoUrl) setActiveVideo(item.videoUrl);
                  if (isNext) handleNext();
                  if (isPrev) handlePrev();
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: item.color || "#222",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundImage: item.poster ? `url(${item.poster})` : "none",
                    opacity: isActive ? 1 : 0.6,
                  }}
                />
                {item.videoUrl && isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(227, 58, 36, 0.9)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 0 20px rgba(227,58,36,0.5)",
                      }}
                    >
                      <Play fill="white" size={24} />
                    </div>
                  </motion.div>
                )}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "2rem 1.5rem 1.5rem",
                    background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
                  }}
                >
                  <h3 style={{ color: "white", margin: "0 0 0.5rem", fontSize: "1.2rem", fontWeight: "bold" }}>
                    {item.title}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.7)", margin: 0, fontSize: "0.9rem" }}>{item.category}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <button onClick={handleNext} aria-label="Next" style={navBtn("right")}>
        <ChevronRight size={24} />
      </button>

      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.92)",
              backdropFilter: "blur(10px)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => setActiveVideo(null)}
              aria-label="Close"
              style={{
                position: "absolute",
                top: "2rem",
                right: "2rem",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
                color: "white",
                cursor: "pointer",
              }}
            >
              <X size={24} />
            </button>
            <motion.video
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={activeVideo}
              controls
              autoPlay
              style={{ maxWidth: "90%", maxHeight: "85vh", borderRadius: "12px", outline: "none", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function navBtn(side: "left" | "right"): React.CSSProperties {
  return {
    position: "absolute",
    [side]: "5%",
    zIndex: 10,
    background: "rgba(255,255,255,0.1)",
    border: "none",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    color: "white",
    cursor: "pointer",
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
}

export default DomeGallery;
