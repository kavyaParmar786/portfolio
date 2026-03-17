"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star, Zap, Shield, Ticket } from "lucide-react";

const skillTags = [
  "Discord.js v14",
  "Node.js",
  "TypeScript",
  "Next.js",
  "Auto-Moderation",
  "Anti-Nuke",
  "Ticket Systems",
  "Webhooks",
  "REST APIs",
  "MongoDB",
];

const floatCards = [
  {
    icon: <Zap size={16} className="text-cyan-400" />,
    label: "Bot Online",
    value: "99.9% Uptime",
    color: "from-cyan-500/10 to-blue-500/10",
    border: "border-cyan-400/15",
  },
  {
    icon: <Shield size={16} className="text-blue-400" />,
    label: "Protected",
    value: "150+ Servers",
    color: "from-blue-500/10 to-purple-500/10",
    border: "border-blue-400/15",
  },
  {
    icon: <Ticket size={16} className="text-emerald-400" />,
    label: "Tickets",
    value: "Auto-Create",
    color: "from-emerald-500/10 to-cyan-500/10",
    border: "border-emerald-400/15",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Glow pulse behind heading */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-500/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left — text */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6"
        >
          {/* Badge */}
          <motion.div variants={item}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs text-slate-300 tracking-wide">
                Available for Projects
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div variants={item} className="space-y-2">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight text-white">
              Discord Bot
            </h1>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight gradient-text">
              Developer
            </h1>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight text-white/40">
              &amp; Automation
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="font-body text-slate-400 text-lg leading-relaxed max-w-lg"
          >
            I build powerful, production-ready Discord bots — from anti-nuke
            systems to full ticket automation. Your server, running on autopilot.
          </motion.p>

          {/* Skill tags */}
          <motion.div variants={item} className="flex flex-wrap gap-2">
            {skillTags.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-3 pt-2">
            <a
              href="#order"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-primary px-6 py-3 text-sm font-semibold"
            >
              Order a Bot
              <ArrowRight size={15} />
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-ghost px-6 py-3 text-sm font-semibold"
            >
              View Projects
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={item}
            className="flex items-center gap-3 pt-2"
          >
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-dark-950 bg-gradient-to-br from-cyan-400/40 to-blue-500/40"
                />
              ))}
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
              ))}
            </div>
            <span className="font-body text-xs text-slate-500">
              Trusted by 150+ server owners
            </span>
          </motion.div>
        </motion.div>

        {/* Right — floating cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative hidden lg:flex items-center justify-center"
        >
          {/* Center hexagon/logo display */}
          <div className="relative w-72 h-72">
            {/* Rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-cyan-400/10"
              style={{
                background:
                  "conic-gradient(from 0deg, transparent 60%, rgba(34,211,238,0.15) 100%)",
              }}
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-8 rounded-full border border-blue-400/10"
              style={{
                background:
                  "conic-gradient(from 180deg, transparent 60%, rgba(59,130,246,0.1) 100%)",
              }}
            />

            {/* Center — real logo */}
            <div className="absolute inset-14 rounded-2xl overflow-hidden border border-cyan-400/25 shadow-glow-lg">
              <img src="/logo.jpg" alt="fusion.exe" className="w-full h-full object-cover" />
            </div>

            {/* Floating stat cards */}
            {floatCards.map((card, i) => {
              const positions = [
                "-top-4 -right-8",
                "-bottom-4 -right-8",
                "top-1/2 -translate-y-1/2 -left-16",
              ];
              return (
                <motion.div
                  key={card.label}
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: 3 + i * 0.7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5,
                  }}
                  className={`absolute ${positions[i]} glass rounded-xl px-4 py-3 border ${card.border} min-w-[140px]`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {card.icon}
                    <span className="font-mono text-xs text-slate-400">
                      {card.label}
                    </span>
                  </div>
                  <div className="font-display text-sm font-bold text-white">
                    {card.value}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs text-slate-600 tracking-widest uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-cyan-400/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
