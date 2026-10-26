"use client";

import React, { useState, useEffect } from "react";
import { Play, X, ChevronLeft, ChevronRight, Film } from "lucide-react";
import "./CinemaCarousel.css";

export interface CinemaItem {
  _id?: string;
  title: string;
  category: string;
  imageUrl?: string | null;
  videoUrl?: string;
  color?: string;
  ratio?: string;
}

export function CinemaCarousel({ items }: { items: CinemaItem[] }) {
  const [selected, setSelected] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const total = items.length;

  const current = items[selected] || items[0];

  const prev = () => setSelected((p) => (p - 1 + total) % total);
  const next = () => setSelected((p) => (p + 1) % total);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="cinema-showcase">
      <div className="cinema-ambient-glow" />

      {/* Main Theater 16:9 Screen */}
      <div className="cinema-stage-screen" onClick={() => setModalOpen(true)}>
        {current.imageUrl ? (
          <img
            src={current.imageUrl}
            alt={current.title}
            className="cinema-stage-poster"
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "radial-gradient(circle, rgba(227, 58, 36, 0.25), #111)",
            }}
          >
            <Film size={64} color="#E33A24" opacity={0.7} />
          </div>
        )}
        <div className="cinema-stage-gradient" />

        <div className="cinema-stage-top">
          <span className="cinema-stage-badge">{current.category}</span>
          <span className="cinema-stage-count">
            {String(selected + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        <div className="cinema-stage-play">
          <Play fill="#fff" size={32} style={{ marginLeft: "4px" }} />
        </div>

        <div className="cinema-stage-bottom">
          <div>
            <h3 className="cinema-stage-title">{current.title}</h3>
            <p className="cinema-stage-cat">{current.category}</p>
          </div>
        </div>
      </div>

      {/* Lower Episode / Project Filmstrip Selector */}
      <div className="cinema-selector-wrap">
        <div className="cinema-selector-header">
          <div className="cinema-selector-title-group">
            <span className="cinema-selector-label">More Videos</span>
            <span className="cinema-selector-subtitle">({total} episodes)</span>
          </div>
          <div className="cinema-selector-nav">
            <button className="cinema-selector-btn" onClick={prev} aria-label="Previous Video">
              <ChevronLeft size={18} />
            </button>
            <button className="cinema-selector-btn" onClick={next} aria-label="Next Video">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="cinema-selector-grid">
          {items.map((item, idx) => (
            <div
              key={item._id ?? idx}
              className={`cinema-thumbnail-card ${idx === selected ? "active" : ""}`}
              onClick={() => setSelected(idx)}
            >
              <div className="cinema-thumb-media">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.title} loading="lazy" />
                ) : (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "#1c1c20",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Film size={20} color="#E33A24" opacity={0.6} />
                  </div>
                )}
                <span className="cinema-thumb-index">EP. {idx + 1}</span>
              </div>
              <div className="cinema-thumb-info">
                <h4 className="cinema-thumb-title">{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal Player */}
      {modalOpen && (
        <div className="cinema-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="cinema-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="cinema-modal-close"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
            >
              <X size={22} />
            </button>
            <video
              src={current.videoUrl || "https://www.w3schools.com/html/mov_bbb.mp4"}
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

export default CinemaCarousel;
