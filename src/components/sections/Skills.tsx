"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FadeIn, StaggerChildren, staggerItem, SectionHeading } from "@/components/ui/Motion";
import { GlassCard } from "@/components/ui/GlassCard";

const skills = [
  { name: "discord.js v14", level: 98, color: "from-cyan-400 to-blue-400" },
  { name: "Node.js / TypeScript", level: 94, color: "from-blue-400 to-purple-400" },
  { name: "Next.js / React", level: 88, color: "from-purple-400 to-pink-400" },
  { name: "REST API Design", level: 90, color: "from-cyan-400 to-emerald-400" },
  { name: "MongoDB / Databases", level: 82, color: "from-emerald-400 to-cyan-400" },
  { name: "System Architecture", level: 86, color: "from-amber-400 to-orange-400" },
];

const capabilities = [
  "Slash Commands",
  "Context Menus",
  "Button Interactions",
  "Select Menus",
  "Modals / Forms",
  "Auto-Moderation",
  "Anti-Nuke Systems",
  "Ticket Panels",
  "Reaction Roles",
  "Welcome Systems",
  "Invite Tracking",
  "Giveaway Bot",
  "Poll System",
  "Audit Logging",
  "Voice Channels",
  "Role Management",
  "Scheduled Tasks",
  "Webhook Forwarding",
  "MongoDB Integration",
  "Custom Embeds",
];

function SkillBar({ name, level, color }: { name: string; level: number; color: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="font-body text-sm text-slate-300">{name}</span>
        <span className="font-mono text-xs text-cyan-400">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
          style={{ boxShadow: "0 0 8px rgba(34,211,238,0.4)" }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-pad">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <SectionHeading
            tag="// 03 — Skills"
            title="Bot"
            accent="Capabilities"
            subtitle="A complete technical toolkit for professional-grade Discord development."
          />
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Skill bars */}
          <FadeIn direction="left">
            <GlassCard className="p-7 space-y-6">
              <h3 className="font-display font-bold text-white text-sm tracking-wide">
                Technical Proficiency
              </h3>
              {skills.map((s) => (
                <SkillBar key={s.name} {...s} />
              ))}
            </GlassCard>
          </FadeIn>

          {/* Capability tags */}
          <FadeIn direction="right" delay={0.1}>
            <GlassCard className="p-7">
              <h3 className="font-display font-bold text-white text-sm tracking-wide mb-5">
                Feature Arsenal
              </h3>
              <StaggerChildren className="flex flex-wrap gap-2" staggerDelay={0.04}>
                {capabilities.map((c) => (
                  <motion.span
                    key={c}
                    variants={staggerItem}
                    className="tag-pill cursor-default hover:bg-cyan-400/12 hover:border-cyan-400/35 transition-colors duration-200"
                  >
                    {c}
                  </motion.span>
                ))}
              </StaggerChildren>
            </GlassCard>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
