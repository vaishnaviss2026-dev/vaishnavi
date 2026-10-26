"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, X, ChevronLeft, ChevronRight, Video, Film } from "lucide-react";
import "./VideoCarousel.css";

export interface VideoCarouselItem {
  _id?: string;
  title: string;
  category: string;
  imageUrl?: string | null;
  videoUrl?: string;
  color?: string;
  ratio?: string;
}

interface VideoCarouselProps {
  items: VideoCarouselItem[];
  type?: "motion" | "long";
}

export function VideoCarousel({ items, type = "motion" }: VideoCarouselProps) {
  const [index, setIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // If there are few items, duplicate or ensure smooth navigation
  const total = items.length;

  const next = () => {
    setIndex((prev) => (prev + 1) % total);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + total) % total);
  };

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

  // Close modal on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="video-carousel">
      <div className="video-carousel-header">
        <button
          className="video-carousel-btn"
          onClick={prev}
          aria-label="Previous video"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          className="video-carousel-btn"
          onClick={next}
          aria-label="Next video"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div
        className="video-carousel-viewport"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="video-carousel-track"
          style={{
            transform: `translateX(-${index * (100 / Math.min(2, total))}%)`,
          }}
        >
          {items.map((item, i) => (
            <div
              key={item._id ?? i}
              className="video-carousel-card"
              onClick={() => {
                const vid = item.videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4";
                setActiveVideo(vid);
              }}
            >
              <div
                className="video-carousel-media"
                style={{ backgroundColor: item.color || "#18181b" }}
              >
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="video-carousel-img"
                    loading="lazy"
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "radial-gradient(circle at center, rgba(227, 58, 36, 0.2), #141416)",
                    }}
                  >
                    {type === "motion" ? (
                      <Video size={48} color="#E33A24" opacity={0.6} />
                    ) : (
                      <Film size={48} color="#E33A24" opacity={0.6} />
                    )}
                  </div>
                )}
                <div className="video-carousel-gradient" />
                <span className="video-carousel-badge">{item.category}</span>
                <div className="video-carousel-play">
                  <Play fill="#fff" size={24} style={{ marginLeft: "3px" }} />
                </div>
              </div>

              <div className="video-carousel-info">
                <h3 className="video-carousel-title">{item.title}</h3>
                <p className="video-carousel-cat">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {total > 1 && (
        <div className="video-carousel-dots">
          {items.map((_, i) => (
            <button
              key={i}
              className={`video-carousel-dot ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Video Modal Player */}
      {activeVideo && (
        <div
          className="video-modal-backdrop"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="video-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="video-modal-close"
              onClick={() => setActiveVideo(null)}
              aria-label="Close video"
            >
              <X size={22} />
            </button>
            <video
              src={activeVideo}
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

export default VideoCarousel;
