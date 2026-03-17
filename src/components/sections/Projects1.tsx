"use client";

import { motion } from "framer-motion";
import { ExternalLink, Zap, Bot, Music } from "lucide-react";
import { FadeIn, StaggerChildren, staggerItem, SectionHeading } from "@/components/ui/Motion";
import { GlassCard } from "@/components/ui/GlassCard";

const projects = [
  {
    // FUSE OS — image provided by user
    image: null,
    avatarText: "F",
    avatarGradient: "from-blue-500 to-purple-600",
    bannerGradient: "from-purple-900/80 via-blue-900/60 to-dark-950",
    icon: <Zap size={20} />,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-400/10",
    tag: "Premium System",
    tagColor: "text-blue-400 border-blue-400/20 bg-blue-400/5",
    title: "FUSE OS",
    subtitle: "Advanced Discord Bot System",
    desc: "Premium system built for modern servers. Smart Tickets, Advanced Moderation, Powerful Music Player, and Persistent Systems. Fast • Reliable • Clean UI.",
    tech: ["discord.py", "Python", "aiohttp"],
    gradient: "from-blue-500/8 to-purple-500/8",
  },
  {
    // HERO'S CORE
    image: null,
    avatarText: "H",
    avatarGradient: "from-emerald-500 to-teal-600",
    bannerGradient: "from-emerald-900/60 via-teal-900/40 to-dark-950",
    icon: <Bot size={20} />,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-400/10",
    tag: "Community",
    tagColor: "text-emerald-400 border-emerald-400/20 bg-emerald-400/5",
    title: "HERO'S CORE",
    subtitle: "Server Management Bot",
    desc: "A powerful all-in-one bot built for community management, featuring moderation tools, automated roles, and custom server utilities.",
    tech: ["discord.py", "Python", "MongoDB"],
    gradient: "from-emerald-500/8 to-teal-500/8",
  },
  {
    // SPARKING HOST
    image: null,
    avatarText: "S",
    avatarGradient: "from-cyan-500 to-blue-600",
    bannerGradient: "from-cyan-900/60 via-blue-900/40 to-dark-950",
    icon: <Music size={20} />,
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-400/10",
    tag: "Hosting",
    tagColor: "text-cyan-400 border-cyan-400/20 bg-cyan-400/5",
    title: "SPARKER'S HOST",
    subtitle: "Hosting & Management Bot",
    desc: "Sparky's Squad bot powering server hosting management, automated notifications, and community tools for Sparky Play.",
    tech: ["discord.py", "Python", "REST APIs"],
    gradient: "from-cyan-500/8 to-blue-500/8",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section-pad">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <SectionHeading
            tag="// 04 — Projects"
            title="Featured"
            accent="Work"
            subtitle="Real bots built for real communities — clean, documented, and maintained."
            center
          />
        </FadeIn>

        <StaggerChildren className="grid md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <motion.div key={p.title} variants={staggerItem}>
              <GlassCard
                className={`overflow-hidden flex flex-col bg-gradient-to-br ${p.gradient}`}
              >
                {/* Discord-style banner */}
                <div className={`relative h-20 bg-gradient-to-br ${p.bannerGradient} flex-shrink-0`}>
                  <div className="absolute inset-0 bg-grid opacity-20" />
                </div>

                {/* Avatar overlapping banner */}
                <div className="px-5 pb-5">
                  <div className="flex items-end justify-between -mt-8 mb-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${p.avatarGradient} border-4 border-dark-950 flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <span className="font-display font-black text-xl text-white">
                        {p.avatarText}
                      </span>
                    </div>
                    <span className={`font-mono text-xs px-2.5 py-1 rounded-full border ${p.tagColor}`}>
                      {p.tag}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="space-y-1 mb-3">
                    <h3 className="font-display font-bold text-white text-base leading-tight">
                      {p.title}
                    </h3>
                    <p className="font-mono text-xs text-slate-500">{p.subtitle}</p>
                  </div>

                  <p className="font-body text-sm text-slate-400 leading-relaxed mb-4">
                    {p.desc}
                  </p>

                  {/* Tech + link */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1.5">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-xs px-2 py-0.5 rounded-md bg-white/4 border border-white/8 text-slate-500"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <button className="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-500 hover:text-cyan-400 transition-colors flex-shrink-0">
                      <ExternalLink size={13} />
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
