"use client";

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
    label: "11 Members",
    desc: "9 Online now",
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
            accent="Support Server"
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
            {/* Yellow/gold banner — matching FUSIC VERSE screenshot */}
            <div className="relative h-28 overflow-hidden bg-gradient-to-br from-amber-400/60 via-yellow-500/40 to-amber-600/30">
              <div className="absolute inset-0 bg-grid opacity-20" />
              <div className="absolute -top-6 -right-6 w-40 h-40 rounded-full bg-amber-400/20 blur-2xl" />
              <div className="absolute top-2 left-8 font-mono text-xs text-amber-200/60 tracking-widest uppercase">
                Discord Server
              </div>
              {/* Est. date */}
              <div className="absolute bottom-3 left-8 font-mono text-xs text-amber-200/50">
                Est. Mar 2026
              </div>
            </div>

            {/* Server icon + info */}
            <div className="px-6 pb-6">
              <div className="flex items-end justify-between -mt-10 mb-5">
                {/* Server icon with logo */}
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-4 border-dark-900 shadow-glow-sm flex-shrink-0">
                  <img
                    src="/logo.jpg"
                    alt="FUSIC VERSE"
                    className="w-full h-full object-cover"
                  />
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

              <div className="mb-2">
                <h3 className="font-display font-bold text-white text-lg mb-0.5">
                  FUSIC VERSE ✦
                </h3>
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center gap-1.5 font-mono text-xs text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                    9 Online
                  </span>
                  <span className="font-mono text-xs text-slate-500">
                    • 11 Members
                  </span>
                </div>
                <p className="font-mono text-xs text-slate-500 mb-3">
                  discord.gg/Wej7Cd3XVW
                </p>
                <p className="font-body text-sm text-slate-400">
                  Official support server for all fusion.exe bot orders, questions,
                  and updates. Join to get your private ticket created automatically
                  after ordering.
                </p>
              </div>

              {/* Divider */}
              <div className="glow-line my-4" />

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
