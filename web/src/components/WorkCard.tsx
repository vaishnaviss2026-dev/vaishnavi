"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { ReactNode } from "react";
import { TiltedCard } from "./TiltedCard";

interface WorkCardProps {
  title: string;
  category: string;
  ratio?: string;
  icon?: ReactNode;
  imageUrl?: string | null;
  color?: string;
}

export function WorkCard({ title, category, ratio = "ratio-16-9", icon, imageUrl, color }: WorkCardProps) {
  return (
    <TiltedCard className="work-card-wrapper">
      <motion.div whileHover={{ y: -10 }} className="work-card">
        <div
          className={`work-card-img ${ratio}`}
          style={{
            backgroundColor: color || "#18181b",
            backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {icon && !imageUrl && (
            <div className="absolute inset-0 flex items-center justify-center" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.3 }}>
              {icon}
            </div>
          )}
          <div className="play-button">
            <Play fill="white" size={24} />
          </div>
        </div>
        <div className="work-card-content">
          <h3 className="work-card-title">{title}</h3>
          <p className="work-card-category">{category}</p>
        </div>
      </motion.div>
    </TiltedCard>
  );
}

export default WorkCard;
