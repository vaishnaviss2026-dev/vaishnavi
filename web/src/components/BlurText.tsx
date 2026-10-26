"use client";

import { motion, type Variants } from "framer-motion";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

export function BlurText({ text, className = "", delay = 0, duration = 0.8 }: BlurTextProps) {
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 100, duration },
    },
    hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
  };

  return (
    <motion.div
      className={`blur-text ${className}`}
      style={{
        overflow: "hidden",
        display: "flex",
        flexWrap: "wrap",
        gap: "0.25em",
        lineHeight: 1.15,
        paddingBottom: "0.12em",
      }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          key={index}
          style={{ display: "inline-block", willChange: "transform, filter, opacity" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default BlurText;
