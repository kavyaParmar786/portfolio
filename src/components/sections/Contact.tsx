"use client";

import { FadeIn, SectionHeading } from "@/components/ui/Motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { MessageSquare, Clock, Globe } from "lucide-react";

const INVITE = "https://discord.gg/Wej7Cd3XVW";

const methods = [
  {
    icon: <MessageSquare size={20} />,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    label: "Discord Server",
    value: "discord.gg/Wej7Cd3XVW",
    href: INVITE,
  },
  {
    icon: <Clock size={20} />,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    label: "Response Time",
    value: "Usually under 1 hour",
    href: null,
  },
  {
    icon: <Globe size={20} />,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    label: "Availability",
    value: "24/7 on Discord",
    href: null,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section-pad">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <SectionHeading
            tag="// 08 — Contact"
            title="Get in"
            accent="Touch"
            subtitle="Ready to build? Have questions? Reach out — I respond fast."
            center
          />
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-5 max-w-3xl mx-auto">
          {methods.map((m) => (
            <FadeIn key={m.label} delay={0.05}>
              <GlassCard className="p-6 flex flex-col gap-4 text-center items-center">
                <div className={`w-11 h-11 rounded-xl ${m.bg} flex items-center justify-center ${m.color}`}>
                  {m.icon}
                </div>
                <div>
                  <p className="font-mono text-xs text-slate-500 mb-1">{m.label}</p>
                  {m.href ? (
                    <a
                      href={m.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display font-semibold text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      {m.value}
                    </a>
                  ) : (
                    <p className="font-display font-semibold text-sm text-white">
                      {m.value}
                    </p>
                  )}
                </div>
              </GlassCard>
            </FadeIn>
          ))}
        </div>

        {/* CTA banner */}
        <FadeIn delay={0.2}>
          <div className="mt-10 max-w-3xl mx-auto">
            <GlassCard className="p-8 text-center border-cyan-400/20" glow>
              <p className="font-display font-bold text-white text-xl mb-2">
                Ready to automate your server?
              </p>
              <p className="font-body text-slate-400 text-sm mb-6">
                Join 150+ server owners who trust fusion.exe to run their communities.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#order"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="btn-primary px-6 py-3 text-sm"
                >
                  Order a Bot
                </a>
                <a
                  href={INVITE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost px-6 py-3 text-sm"
                >
                  Join Discord
                </a>
              </div>
            </GlassCard>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
