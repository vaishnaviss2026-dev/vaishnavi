"use client";

import { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  baseRadius: number;
  phase: number;
  speed: number;
  alpha: number;
  isThinking: boolean;
  thinkingDuration: number;
}

export function ThinkingDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let dots: Dot[] = [];

    const build = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      dots = [];
      const spacing = 40;
      const columns = Math.ceil(canvas.width / spacing);
      const rows = Math.ceil(canvas.height / spacing);
      for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({
            x: i * spacing,
            y: j * spacing,
            baseRadius: 1,
            phase: Math.random() * Math.PI * 2,
            speed: 0.01 + Math.random() * 0.02,
            alpha: 0.1 + Math.random() * 0.3,
            isThinking: Math.random() > 0.9,
            thinkingDuration: 0,
          });
        }
      }
    };

    window.addEventListener("resize", build);
    build();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((dot) => {
        dot.phase += dot.speed;
        if (!dot.isThinking && Math.random() < 0.001) {
          dot.isThinking = true;
          dot.thinkingDuration = 100 + Math.random() * 100;
        }
        let currentAlpha = dot.alpha + Math.sin(dot.phase) * 0.1;
        let currentRadius = dot.baseRadius;
        if (dot.isThinking) {
          currentAlpha = 0.8;
          currentRadius = dot.baseRadius * 2.5;
          dot.thinkingDuration--;
          if (dot.thinkingDuration <= 0) dot.isThinking = false;
        }
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(227, 58, 36, ${Math.max(0.05, currentAlpha)})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", build);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

export default ThinkingDots;
