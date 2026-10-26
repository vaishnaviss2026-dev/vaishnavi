"use client";

import { useState, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";

interface TiltedCardProps {
  children: ReactNode;
  className?: string;
}

export function TiltedCard({ children, className = "" }: TiltedCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    setRotateX(((y - centerY) / centerY) * -15);
    setRotateY(((x - centerX) / centerX) * 15);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div style={{ perspective: 1000, transformStyle: "preserve-3d" }} className={className}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX, rotateY }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ width: "100%", height: "100%", transformStyle: "preserve-3d" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default TiltedCard;
