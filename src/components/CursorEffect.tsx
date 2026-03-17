"use client";

import { useEffect, useRef } from "react";

export default function CursorEffect() {
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const glow = glowRef.current;
    if (!dot || !glow) return;

    let x = -999, y = -999;
    let glowX = -999, glowY = -999;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    // Smooth glow follows cursor with slight lag
    const animate = () => {
      glowX += (x - glowX) * 0.12;
      glowY += (y - glowY) * 0.12;

      dot.style.transform = `translate(${x}px, ${y}px)`;
      glow.style.transform = `translate(${glowX}px, ${glowY}px)`;

      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Tiny sharp cursor dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          borderRadius: "50%",
          background: "#22d3ee",
          boxShadow: "0 0 6px 2px rgba(34,211,238,0.8)",
        }}
      />
      {/* Soft glow that lags slightly behind */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          width: 120,
          height: 120,
          marginLeft: -60,
          marginTop: -60,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(34,211,238,0.12) 0%, rgba(34,211,238,0.04) 50%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />
    </>
  );
}
