"use client";

import { motion } from "framer-motion";
import { ExternalLink, Users, Headphones, MessageCircle } from "lucide-react";
import { FadeIn, SectionHeading } from "@/components/ui/Motion";
import { GlassCard } from "@/components/ui/GlassCard";

const INVITE = "https://discord.gg/Wej7Cd3XVW";

const perks = [
  {
    icon: <Headphones size={18} />,
    label: "24/7 Support",
    desc: "Staff always active",
  },
  {
    icon: <MessageCircle size={18} />,
    label: "Fast Response",
    desc: "Under 1 hour avg.",
  },
  {
    icon: <Users size={18} />,
    label: "Community",
    desc: "Updates & announcements",
  },
];

export default function SupportServer() {
  return (
    <section id="support" className="section-pad">
      <div className="max-w-3xl mx-auto px-6">
        <FadeIn>
          <SectionHeading
            tag="// 07 — Support"
            title="Join the"
            accent="Discord Server"
            subtitle="Get support, track your order, and stay updated — all inside our server."
            center
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          {/* Discord-styled card */}
          <GlassCard
            className="overflow-hidden border border-[#5865F2]/25 shadow-[0_0_40px_rgba(88,101,242,0.12)]"
            glow={false}
          >
            {/* Banner */}
            <div className="relative h-28 bg-gradient-to-br from-[#5865F2]/30 via-[#5865F2]/15 to-transparent overflow-hidden">
              <div className="absolute inset-0 bg-grid opacity-30" />
              {/* Decorative circles */}
              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-[#5865F2]/20 blur-2xl" />
              <div className="absolute top-2 left-8 font-mono text-xs text-[#5865F2]/60 tracking-widest">
                DISCORD SERVER
              </div>
            </div>

            {/* Server icon — overlaps banner */}
            <div className="px-6 pb-6">
              <div className="flex items-end justify-between -mt-10 mb-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-[#5865F2] border-4 border-dark-900 flex items-center justify-center shadow-glow-sm">
                  <span className="font-display font-black text-xl text-dark-950">FX</span>
                </div>
                <a
                  href={INVITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-5 py-2.5 text-sm"
                >
                  <ExternalLink size={13} />
                  Join Server
                </a>
              </div>

              <div className="mb-5">
                <h3 className="font-display font-bold text-white text-lg mb-1">
                  fusion.exe Support
                </h3>
                <p className="font-mono text-xs text-slate-500 mb-2">
                  discord.gg/Wej7Cd3XVW
                </p>
                <p className="font-body text-sm text-slate-400">
                  Official support server for all fusion.exe bot orders, questions,
                  and updates. Join to get your private ticket created automatically
                  after ordering.
                </p>
              </div>

              {/* Perks */}
              <div className="grid grid-cols-3 gap-3">
                {perks.map((p) => (
                  <div
                    key={p.label}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/3 border border-white/5 text-center"
                  >
                    <div className="text-[#5865F2]">{p.icon}</div>
                    <div>
                      <div className="font-display font-bold text-white text-xs">
                        {p.label}
                      </div>
                      <div className="font-mono text-xs text-slate-500 mt-0.5">
                        {p.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </FadeIn>
      </div>
    </section>
  );
}
