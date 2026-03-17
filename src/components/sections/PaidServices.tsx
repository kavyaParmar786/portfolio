"use client";

import { motion } from "framer-motion";
import { Check, X, Zap } from "lucide-react";
import { FadeIn, StaggerChildren, staggerItem, SectionHeading } from "@/components/ui/Motion";
import { GlassCard } from "@/components/ui/GlassCard";

const plans = [
  {
    name: "Starter",
    price: "$15",
    period: "one-time",
    desc: "Perfect for small communities getting started.",
    color: "border-white/8",
    highlight: false,
    features: [
      { text: "Welcome / Leave System", included: true },
      { text: "Basic Auto-Roles", included: true },
      { text: "1 Ticket Panel", included: true },
      { text: "Basic Moderation (5 cmds)", included: true },
      { text: "Anti-Nuke Protection", included: false },
      { text: "Custom Commands", included: false },
      { text: "Priority Support", included: false },
      { text: "Source Code", included: false },
    ],
    cta: "Order Starter",
    ctaStyle: "btn-ghost",
  },
  {
    name: "Pro",
    price: "$45",
    period: "one-time",
    desc: "The full suite for growing, serious communities.",
    color: "border-cyan-400/30",
    highlight: true,
    badge: "Most Popular",
    features: [
      { text: "Everything in Starter", included: true },
      { text: "Anti-Nuke + Anti-Raid", included: true },
      { text: "Unlimited Ticket Panels", included: true },
      { text: "Full Moderation Suite", included: true },
      { text: "Custom Slash Commands", included: true },
      { text: "Audit Logging", included: true },
      { text: "Priority Support (7 days)", included: true },
      { text: "Source Code", included: false },
    ],
    cta: "Order Pro",
    ctaStyle: "btn-primary",
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "one-time",
    desc: "Dedicated instance, custom branding, full ownership.",
    color: "border-white/8",
    highlight: false,
    features: [
      { text: "Everything in Pro", included: true },
      { text: "Dedicated Bot Instance", included: true },
      { text: "Custom Bot Branding", included: true },
      { text: "1-on-1 Onboarding Call", included: true },
      { text: "Custom Feature Development", included: true },
      { text: "Full Source Code", included: true },
      { text: "30-Day Priority Support", included: true },
      { text: "SLA Guarantee", included: true },
    ],
    cta: "Contact for Enterprise",
    ctaStyle: "btn-ghost",
  },
];

export default function PaidServices() {
  const scrollToOrder = () => {
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="section-pad">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <SectionHeading
            tag="// 05 — Pricing"
            title="Simple"
            accent="Packages"
            subtitle="Transparent one-time pricing. No subscriptions, no hidden fees — just a clean delivery."
            center
          />
        </FadeIn>

        <StaggerChildren className="grid md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={staggerItem}
              className={plan.highlight ? "md:-mt-4" : ""}
            >
              <GlassCard
                className={`p-7 flex flex-col gap-6 border ${plan.color} ${
                  plan.highlight ? "shadow-glow" : ""
                }`}
                glow={plan.highlight}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="flex justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-dark-950 font-display font-bold text-xs">
                      <Zap size={10} className="fill-dark-950" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Header */}
                <div>
                  <p className="font-mono text-xs text-slate-500 tracking-widest uppercase mb-2">
                    {plan.name}
                  </p>
                  <div className="flex items-end gap-1 mb-2">
                    <span className="font-display text-4xl font-extrabold text-white">
                      {plan.price}
                    </span>
                    <span className="font-body text-sm text-slate-500 mb-1.5">
                      {plan.period}
                    </span>
                  </div>
                  <p className="font-body text-sm text-slate-400">{plan.desc}</p>
                </div>

                {/* Divider */}
                <div className="glow-line" />

                {/* Features */}
                <ul className="space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-center gap-3">
                      {f.included ? (
                        <Check size={14} className="text-cyan-400 flex-shrink-0" />
                      ) : (
                        <X size={14} className="text-slate-600 flex-shrink-0" />
                      )}
                      <span
                        className={`font-body text-sm ${
                          f.included ? "text-slate-300" : "text-slate-600"
                        }`}
                      >
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={scrollToOrder}
                  className={`${plan.ctaStyle} w-full py-3 text-sm font-semibold`}
                >
                  {plan.cta}
                </button>
              </GlassCard>
            </motion.div>
          ))}
        </StaggerChildren>

        {/* Note */}
        <FadeIn delay={0.3}>
          <p className="text-center font-body text-xs text-slate-600 mt-8">
            All packages include setup, testing, and deployment assistance. Prices may vary based on custom requirements.{" "}
            <button
              onClick={scrollToOrder}
              className="text-cyan-400/70 hover:text-cyan-400 underline underline-offset-2 transition-colors"
            >
              Discuss your project →
            </button>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
