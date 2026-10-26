"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, X, ChevronLeft, ChevronRight, Video } from "lucide-react";
import "./MotionCarousel.css";

export interface MotionItem {
  _id?: string;
  title: string;
  category: string;
  imageUrl?: string | null;
  videoUrl?: string;
  color?: string;
  ratio?: string;
}

export function MotionCarousel({ items }: { items: MotionItem[] }) {
  const [active, setActive] = useState(0);
  const [modalVideo, setModalVideo] = useState<string | null>(null);
  const total = items.length;
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const prev = () => setActive((p) => (p - 1 + total) % total);
  const next = () => setActive((p) => (p + 1) % total);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next();
      else prev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalVideo(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="motion-flow-carousel">
      <div
        className="motion-flow-stage"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((item, i) => {
          const offset = (i - active + total) % total;
          let role = "hidden";
          if (offset === 0) role = "active";
          else if (offset === 1 || (total === 2 && offset === 1)) role = "next";
          else if (offset === total - 1) role = "prev";

          return (
            <div
              key={item._id ?? i}
              className={`motion-flow-card ${role}`}
              onClick={() => {
                if (role === "active") {
                  setModalVideo(item.videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4");
                } else if (role === "next") {
                  next();
                } else if (role === "prev") {
                  prev();
                }
              }}
            >
              <div className="motion-flow-media">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.title} loading="lazy" />
                ) : (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "radial-gradient(circle, rgba(227,58,36,0.25), #141416)",
                    }}
                  >
                    <Video size={48} color="#E33A24" opacity={0.65} />
                  </div>
                )}
                <div className="motion-flow-overlay" />
                <span className="motion-flow-badge">{item.category}</span>
                {role === "active" && (
                  <div className="motion-flow-play">
                    <Play fill="#fff" size={26} style={{ marginLeft: "3px" }} />
                  </div>
                )}
              </div>
              <div className="motion-flow-info">
                <h3 className="motion-flow-title">{item.title}</h3>
                <p className="motion-flow-cat">{item.category}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="motion-flow-controls">
        <button className="motion-flow-nav-btn" onClick={prev} aria-label="Previous">
          <ChevronLeft size={22} />
        </button>
        <div className="motion-flow-dots">
          {items.map((_, i) => (
            <button
              key={i}
              className={`motion-flow-dot ${i === active ? "active" : ""}`}
              onClick={() => setActive(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <button className="motion-flow-nav-btn" onClick={next} aria-label="Next">
          <ChevronRight size={22} />
        </button>
      </div>

      {modalVideo && (
        <div className="motion-modal-backdrop" onClick={() => setModalVideo(null)}>
          <div className="motion-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="motion-modal-close" onClick={() => setModalVideo(null)} aria-label="Close">
              <X size={22} />
            </button>
            <video
              src={modalVideo}
              controls
              autoPlay
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MotionCarousel;
