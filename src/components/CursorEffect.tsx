"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

const COLORS = [
  "#22d3ee", // cyan
  "#60a5fa", // blue
  "#a78bfa", // purple
  "#e879f9", // pink
  "#22d3ee", // cyan again (weighted)
  "#22d3ee",
];

let particleId = 0;

export default function CursorEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number>(0);
  const lastPosRef = useRef({ x: -999, y: -999 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Don't run on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Size canvas to viewport
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Track mouse
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      // Spawn particles based on distance moved
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 3) {
        // Main trail particle
        spawnParticle(e.clientX, e.clientY, 1);

        // Extra sparkle every so often
        if (Math.random() > 0.5) {
          spawnSparkle(e.clientX, e.clientY);
        }
        lastPosRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    function spawnParticle(x: number, y: number, speed: number) {
      const angle = Math.random() * Math.PI * 2;
      const vel = (Math.random() * 1.2 + 0.3) * speed;
      const size = Math.random() * 4 + 1.5;
      const life = Math.random() * 25 + 20;

      particlesRef.current.push({
        id: particleId++,
        x,
        y,
        size,
        opacity: 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        vx: Math.cos(angle) * vel,
        vy: Math.sin(angle) * vel - 0.5,
        life,
        maxLife: life,
      });
    }

    function spawnSparkle(x: number, y: number) {
      // Tiny bright spark that shoots upward
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      particlesRef.current.push({
        id: particleId++,
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        size: Math.random() * 2.5 + 1,
        opacity: 1,
        color,
        vx: (Math.random() - 0.5) * 2,
        vy: -(Math.random() * 3 + 1.5),
        life: Math.random() * 20 + 15,
        maxLife: 35,
      });
    }

    // Render loop
    function render() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

      for (const p of particlesRef.current) {
        p.life--;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06; // gravity
        p.vx *= 0.97; // drag
        p.size *= 0.97;

        const progress = p.life / p.maxLife;
        p.opacity = progress;

        // Glow effect
        ctx!.save();
        ctx!.globalAlpha = p.opacity * 0.4;
        const glow = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        glow.addColorStop(0, p.color);
        glow.addColorStop(1, "transparent");
        ctx!.fillStyle = glow;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();

        // Core dot
        ctx!.save();
        ctx!.globalAlpha = p.opacity;
        ctx!.fillStyle = p.color;
        ctx!.shadowColor = p.color;
        ctx!.shadowBlur = 8;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      }

      // Cursor ring
      if (visible) {
        const { x, y } = mouseRef.current;

        // Outer ring
        ctx!.save();
        ctx!.globalAlpha = 0.5;
        ctx!.strokeStyle = "#22d3ee";
        ctx!.lineWidth = 1;
        ctx!.shadowColor = "#22d3ee";
        ctx!.shadowBlur = 10;
        ctx!.beginPath();
        ctx!.arc(x, y, 16, 0, Math.PI * 2);
        ctx!.stroke();
        ctx!.restore();

        // Inner dot
        ctx!.save();
        ctx!.globalAlpha = 0.9;
        ctx!.fillStyle = "#22d3ee";
        ctx!.shadowColor = "#22d3ee";
        ctx!.shadowBlur = 12;
        ctx!.beginPath();
        ctx!.arc(x, y, 3, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      }

      rafRef.current = requestAnimationFrame(render);
    }

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
