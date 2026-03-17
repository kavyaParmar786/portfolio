"use client";

import { motion } from "framer-motion";
import { Code2, Terminal, Users, Clock } from "lucide-react";
import { FadeIn, StaggerChildren, staggerItem, SectionHeading } from "@/components/ui/Motion";
import { GlassCard } from "@/components/ui/GlassCard";

const stats = [
  { icon: <Users size={18} />, value: "10+", label: "Servers Served" },
  { icon: <Code2 size={18} />, value: "40+", label: "Bots Built" },
  { icon: <Clock size={18} />, value: "2+ yrs", label: "Experience" },
  { icon: <Terminal size={18} />, value: "99.9%", label: "Uptime SLA" },
];

export default function About() {
  return (
    <section id="about" className="section-pad">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left text */}
          <FadeIn direction="left">
            <SectionHeading
              tag="// 01 — About"
              title="Who is"
              accent="fusion.exe?"
              subtitle="I'm a professional Discord bot developer specializing in building robust, scalable automation systems for communities of every size."
            />
            <div className="space-y-4 font-body text-slate-400 text-base leading-relaxed">
              <p>
                With deep expertise in{" "}
                <span className="text-cyan-400">discord.js v14</span>,
                Node.js, and TypeScript, I craft bots that are not just
                functional — they're production-grade infrastructure for your
                Discord server.
              </p>
              <p>
                From airtight{" "}
                <span className="text-cyan-400">anti-nuke protection</span> to
                fully automated{" "}
                <span className="text-cyan-400">ticket systems</span> with
                private channel creation, every project is delivered clean,
                documented, and ready to scale.
              </p>
              <p>
                I've helped server owners reclaim their time — letting
                automation handle moderation, onboarding, and support so they
                can focus on growing their community.
              </p>
            </div>

            {/* Divider */}
            <div className="glow-line my-8" />

            {/* Tech badges */}
            <div className="flex flex-wrap gap-2">
              {[
                "Node.js",
                "TypeScript",
                "discord.js v14",
                "Next.js",
                "Tailwind",
                "MongoDB",
                "REST APIs",
              ].map((t) => (
                <span key={t} className="tag-pill">
                  {t}
                </span>
              ))}
            </div>
          </FadeIn>

          {/* Right — stats + terminal mockup */}
          <FadeIn direction="right" delay={0.1}>
            <div className="space-y-4">
              {/* Stats grid */}
              <StaggerChildren className="grid grid-cols-2 gap-3">
                {stats.map((s) => (
                  <motion.div key={s.label} variants={staggerItem}>
                    <GlassCard className="p-5 flex flex-col gap-2">
                      <div className="text-cyan-400">{s.icon}</div>
                      <div className="font-display text-2xl font-bold text-white">
                        {s.value}
                      </div>
                      <div className="font-body text-xs text-slate-500">
                        {s.label}
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </StaggerChildren>

              {/* Terminal card */}
              <GlassCard className="overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/2">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  <span className="font-mono text-xs text-slate-500 ml-2">
                    fusion.exe — terminal
                  </span>
                </div>
                <div className="p-4 font-mono text-xs space-y-1.5">
                  <TermLine color="text-cyan-400">{`> bot.login(process.env.TOKEN)`}</TermLine>
                  <TermLine color="text-green-400">✓ Bot connected to Discord</TermLine>
                  <TermLine color="text-slate-400">Loading 42 commands...</TermLine>
                  <TermLine color="text-green-400">✓ Slash commands registered</TermLine>
                  <TermLine color="text-slate-400">Starting anti-nuke listeners...</TermLine>
                  <TermLine color="text-green-400">✓ Protection active on 150 servers</TermLine>
                  <TermLine color="text-cyan-400">
                    {`> STATUS: `}
                    <span className="text-green-400 animate-pulse">ONLINE 🟢</span>
                  </TermLine>
                </div>
              </GlassCard>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function TermLine({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className={`${color}`}
    >
      {children}
    </motion.div>
  );
}
