"use client";

import { useRef, useEffect } from "react";

interface StarfieldProps {
  starCount?: number;
  speedFactor?: number;
  backgroundColor?: string;
  starColor?: [number, number, number];
}

export function Starfield({
  starCount = 600,
  speedFactor = 0.03,
  backgroundColor = "#050505",
  starColor = [255, 255, 255],
}: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;
    let stars: { x: number; y: number; z: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * 1600 - 800,
        y: Math.random() * 900 - 450,
        z: Math.random() * 1000,
      });
    }

    const clear = () => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const putPixel = (x: number, y: number, brightness: number) => {
      ctx.fillStyle = `rgba(${starColor[0]}, ${starColor[1]}, ${starColor[2]}, ${brightness})`;
      ctx.fillRect(x, y, 1, 1);
    };

    const moveStars = (distance: number) => {
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.z -= distance;
        while (s.z <= 1) s.z += 1000;
      }
    };

    const render = () => {
      clear();
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const x = cx + star.x / (star.z * 0.001);
        const y = cy + star.y / (star.z * 0.001);
        if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) continue;
        const d = star.z / 1000.0;
        const b = 1 - d * d;
        putPixel(x, y, b);
      }
      moveStars(speedFactor * 10);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [starCount, speedFactor, backgroundColor, starColor]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
      }}
    />
  );
}

export default Starfield;
