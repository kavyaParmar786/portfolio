"use client";

import { motion } from "framer-motion";
import { Shield, Ticket, Zap, BarChart3, Settings, Bell } from "lucide-react";
import { FadeIn, StaggerChildren, staggerItem, SectionHeading } from "@/components/ui/Motion";
import { GlassCard } from "@/components/ui/GlassCard";

const services = [
  {
    icon: <Shield size={24} />,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    title: "Anti-Nuke Protection",
    desc: "Real-time threat detection against raids, mass deletions, permission abuse, and bot nukes — with instant server lockdown.",
    tags: ["Anti-Raid", "Auto-Lock", "Threat Intel"],
  },
  {
    icon: <Ticket size={24} />,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    title: "Ticket System",
    desc: "Professional support ticketing with private channel creation, staff routing, transcripts, and full close/archive controls.",
    tags: ["Auto-Channel", "Transcripts", "Roles"],
  },
  {
    icon: <Zap size={24} />,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    title: "Automation Flows",
    desc: "Auto-roles, welcome messages, scheduled announcements, reaction roles, and custom event triggers.",
    tags: ["Auto-Role", "Scheduler", "Events"],
  },
  {
    icon: <Settings size={24} />,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    title: "Moderation Suite",
    desc: "Complete mod toolkit: ban, kick, warn, mute, purge, slowmode, lockdown, with full audit logging.",
    tags: ["Logging", "Infractions", "Lockdown"],
  },
  {
    icon: <BarChart3 size={24} />,
    color: "text-amber-400",
    bg: "bg-amber-400/10",
    title: "Custom Bots",
    desc: "Fully custom bots built to your spec — unique commands, custom branding, any feature you need.",
    tags: ["Slash Commands", "Branding", "API"],
  },
  {
    icon: <Bell size={24} />,
    color: "text-rose-400",
    bg: "bg-rose-400/10",
    title: "Stream Alerts",
    desc: "Twitch, YouTube, and Twitter/X notification bots that ping your community automatically on new content.",
    tags: ["Twitch", "YouTube", "Live Alerts"],
  },
];

export default function Services() {
  return (
    <section id="services" className="section-pad">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <SectionHeading
            tag="// 02 — Services"
            title="What I"
            accent="Build"
            subtitle="End-to-end Discord bot development — from simple utilities to complex, multi-feature systems."
            center
          />
        </FadeIn>

        <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc) => (
            <motion.div key={svc.title} variants={staggerItem}>
              <GlassCard className="p-6 h-full flex flex-col gap-4">
                <div className={`w-11 h-11 rounded-xl ${svc.bg} flex items-center justify-center ${svc.color}`}>
                  {svc.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-base font-bold text-white mb-2">
                    {svc.title}
                  </h3>
                  <p className="font-body text-sm text-slate-400 leading-relaxed">
                    {svc.desc}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {svc.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-xs px-2 py-0.5 rounded-md bg-white/4 border border-white/8 text-slate-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
