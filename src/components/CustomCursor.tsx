"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Check if device supports hover
    if (typeof window === "undefined" || !window.matchMedia("(hover: hover)").matches) return;

    const onMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsHovered(!!target.closest('a, button, select, .cursor-pointer, .movie-card, .coming-card, .seat-btn'));
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div 
      className={`cursor pointer-events-none ${isHovered ? 'hovered' : ''} hidden md:flex`} 
      style={{ 
        transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0) translate(-50%, -50%)`,
        zIndex: 10000
      }}
      aria-hidden="true"
    />
  );
}
