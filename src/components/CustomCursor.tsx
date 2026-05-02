"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Check if device supports hover
    if (typeof window === "undefined" || !window.matchMedia("(hover: hover)").matches) return;

    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      const target = e.target as HTMLElement;
      setIsHovered(!!target.closest('a, button, select, .cursor-pointer, .movie-card, .coming-card, .seat-btn'));
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      setCursorPos({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div 
      className={`cursor ${isHovered ? 'hovered' : ''} hidden md:flex`} 
      style={{ left: cursorPos.x, top: cursorPos.y }}
      aria-hidden="true"
    />
  );
}
