"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Shield, Ticket, Zap, Bot } from "lucide-react";
import { FadeIn, StaggerChildren, staggerItem, SectionHeading } from "@/components/ui/Motion";
import { GlassCard } from "@/components/ui/GlassCard";

const projects = [
  {
    icon: <Shield size={20} />,
    iconColor: "text-cyan-400",
    iconBg: "bg-cyan-400/10",
    tag: "Security",
    tagColor: "text-cyan-400 border-cyan-400/20 bg-cyan-400/5",
    title: "NightGuard Anti-Nuke",
    desc: "Enterprise-grade server protection system with real-time threat detection, mass-action prevention, automatic lockdown, and detailed audit reporting.",
    tech: ["discord.js", "Node.js", "MongoDB", "Redis"],
    gradient: "from-cyan-500/8 to-blue-500/8",
  },
  {
    icon: <Ticket size={20} />,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-400/10",
    tag: "Support",
    tagColor: "text-blue-400 border-blue-400/20 bg-blue-400/5",
    title: "TicketFlow Pro",
    desc: "Full-featured ticket management system with category panels, automatic private channel creation, staff assignment, HTML transcripts, and SLA tracking.",
    tech: ["discord.js", "TypeScript", "PostgreSQL"],
    gradient: "from-blue-500/8 to-purple-500/8",
  },
  {
    icon: <Zap size={20} />,
    iconColor: "text-purple-400",
    iconBg: "bg-purple-400/10",
    tag: "Automation",
    tagColor: "text-purple-400 border-purple-400/20 bg-purple-400/5",
    title: "AutoServer Suite",
    desc: "All-in-one server management bot featuring welcome flows, auto-roles, reaction roles, scheduled announcements, giveaways, and custom commands.",
    tech: ["discord.js", "Node.js", "MongoDB"],
    gradient: "from-purple-500/8 to-pink-500/8",
  },
  {
    icon: <Bot size={20} />,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-400/10",
    tag: "Custom",
    tagColor: "text-emerald-400 border-emerald-400/20 bg-emerald-400/5",
    title: "VoidLance Esports Bot",
    desc: "Custom esports organization bot with team management, match scheduling, ELO ranking, and tournament bracket automation for competitive Discord servers.",
    tech: ["discord.js", "TypeScript", "REST APIs"],
    gradient: "from-emerald-500/8 to-cyan-500/8",
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
            subtitle="Production deployments trusted by real communities — built clean, documented, and maintained."
            center
          />
        </FadeIn>

        <StaggerChildren className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <motion.div key={p.title} variants={staggerItem}>
              <GlassCard
                className={`p-6 h-full flex flex-col gap-5 bg-gradient-to-br ${p.gradient}`}
              >
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-xl ${p.iconBg} flex items-center justify-center ${p.iconColor}`}>
                    {p.icon}
                  </div>
                  <span className={`font-mono text-xs px-2.5 py-1 rounded-full border ${p.tagColor}`}>
                    {p.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-2">
                  <h3 className="font-display font-bold text-white text-lg">
                    {p.title}
                  </h3>
                  <p className="font-body text-sm text-slate-400 leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                {/* Tech + links */}
                <div className="flex items-center justify-between gap-4">
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
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button className="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-500 hover:text-white transition-colors">
                      <Github size={14} />
                    </button>
                    <button className="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-500 hover:text-cyan-400 transition-colors">
                      <ExternalLink size={14} />
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
