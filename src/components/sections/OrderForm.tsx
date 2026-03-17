"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2, ChevronDown } from "lucide-react";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "$1",
    period: "one-time",
    desc: "Perfect for small communities.",
    popular: false,
    color: "rgba(34,211,238,0.7)",
    features: [
      "Welcome / Leave System",
      "Basic Auto-Roles",
      "1 Ticket Panel",
      "Basic Moderation (5 cmds)",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$3",
    period: "one-time",
    desc: "Full suite for serious servers.",
    popular: true,
    color: "rgba(34,211,238,0.7)",
    features: [
      "Everything in Starter",
      "Anti-Nuke + Anti-Raid",
      "Unlimited Ticket Panels",
      "Full Moderation Suite",
      "Custom Slash Commands",
      "Audit Logging",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$6",
    period: "one-time",
    desc: "Custom bot, full ownership.",
    popular: false,
    color: "rgba(167,139,250,0.7)",
    features: [
      "Everything in Pro",
      "Dedicated Bot Instance",
      "Custom Bot Branding",
      "Full Source Code",
      "30-Day Priority Support",
      "1-on-1 Onboarding Call",
    ],
  },
];

const BOT_TYPES = [
  "Moderation Bot",
  "Ticket System",
  "Anti-Nuke / Security",
  "Welcome / Onboarding",
  "Custom Commands Bot",
  "Music Bot",
  "Giveaway Bot",
  "Stream Alerts Bot",
  "Reaction Roles Bot",
  "Full Server Management Bot",
  "Other (describe in notes)",
];

const BUDGETS = [
  "Under $5",
  "$5 - $15",
  "$15 - $30",
  "$30+",
  "Lets discuss",
];

interface FormData {
  plan: string;
  username: string;
  discordUsername: string;
  discordId: string;
  botType: string;
  features: string;
  budget: string;
  deadline: string;
  notes: string;
}

const EMPTY: FormData = {
  plan: "",
  username: "",
  discordUsername: "",
  discordId: "",
  botType: "",
  features: "",
  budget: "",
  deadline: "",
  notes: "",
};

type Status = "idle" | "loading" | "success" | "error";

export default function OrderForm() {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const set =
    (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setForm(EMPTY);
    } catch {
      setErrorMsg("Network error — please check your connection and retry.");
      setStatus("error");
    }
  };

  return (
    <section id="order" className="section-pad">
      <div className="max-w-3xl mx-auto px-6">

        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="font-mono text-xs text-cyan-400/80 tracking-[0.2em] uppercase mb-3">
            // 06 — Order
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Order a <span className="gradient-text">Custom Bot</span>
          </h2>
          <p className="font-body text-slate-400 text-base max-w-xl mx-auto leading-relaxed">
            Fill in the form below. Your order will be sent directly to Discord
            and a private ticket channel will be created automatically.
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: "rgba(7,16,32,0.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(34,211,238,0.18)",
            borderRadius: 20,
            padding: 36,
            boxShadow: "0 0 60px rgba(34,211,238,0.08), 0 20px 60px rgba(0,0,0,0.4)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-5 py-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-400/10 border border-emerald-400/25 flex items-center justify-center">
                  <CheckCircle2 size={32} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-xl mb-2">
                    Order Received!
                  </h3>
                  <p className="font-body text-slate-400 text-sm max-w-sm">
                    Your order has been sent to our Discord server. A private
                    ticket channel has been created — join the support server to see it.
                  </p>
                </div>
                <a
                  href="https://discord.gg/Wej7Cd3XVW"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-6 py-2.5 text-sm"
                >
                  Open Discord Server
                </a>
                <button
                  onClick={() => setStatus("idle")}
                  className="font-mono text-xs text-slate-500 hover:text-slate-300 transition-colors"
                >
                  Submit another order
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Plan selector */}
                <div className="space-y-2">
                  <label className="font-mono text-xs text-slate-400 tracking-wide">
                    Select Plan <span className="text-cyan-400">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {PLANS.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, plan: p.id }))}
                        style={{
                          position: "relative",
                          borderRadius: 14,
                          padding: "18px 14px 16px",
                          border: form.plan === p.id
                            ? `1.5px solid ${p.color}`
                            : "1px solid rgba(255,255,255,0.08)",
                          background: form.plan === p.id
                            ? "rgba(34,211,238,0.06)"
                            : "rgba(255,255,255,0.02)",
                          boxShadow: form.plan === p.id
                            ? "0 0 24px rgba(34,211,238,0.12)"
                            : "none",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          textAlign: "left",
                        }}
                      >
                        {/* Popular badge */}
                        {p.popular && (
                          <span style={{
                            position: "absolute",
                            top: -10,
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: "linear-gradient(135deg,#22d3ee,#60a5fa)",
                            color: "#020408",
                            fontSize: 9,
                            fontFamily: "var(--font-mono)",
                            fontWeight: 700,
                            padding: "2px 10px",
                            borderRadius: 99,
                            whiteSpace: "nowrap",
                            letterSpacing: "0.08em",
                          }}>
                            POPULAR
                          </span>
                        )}

                        {/* Price + name */}
                        <div style={{ marginBottom: 6 }}>
                          <div style={{
                            fontFamily: "var(--font-display)",
                            fontSize: 22,
                            fontWeight: 800,
                            color: form.plan === p.id ? "#22d3ee" : "#e2e8f0",
                            lineHeight: 1,
                          }}>
                            {p.price}
                            <span style={{
                              fontSize: 11,
                              fontWeight: 400,
                              color: "#475569",
                              marginLeft: 4,
                              fontFamily: "var(--font-mono)",
                            }}>{p.period}</span>
                          </div>
                          <div style={{
                            fontFamily: "var(--font-display)",
                            fontSize: 13,
                            fontWeight: 700,
                            color: form.plan === p.id ? "#22d3ee" : "#94a3b8",
                            marginTop: 2,
                          }}>
                            {p.name}
                          </div>
                          <div style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 10,
                            color: "#475569",
                            marginTop: 2,
                          }}>
                            {p.desc}
                          </div>
                        </div>

                        {/* Divider */}
                        <div style={{
                          height: 1,
                          background: form.plan === p.id
                            ? "rgba(34,211,238,0.2)"
                            : "rgba(255,255,255,0.06)",
                          margin: "10px 0",
                        }} />

                        {/* Feature list */}
                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                          {p.features.map((f) => (
                            <li key={f} style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: 6,
                              marginBottom: 5,
                              fontFamily: "var(--font-mono)",
                              fontSize: 10,
                              color: form.plan === p.id ? "#94a3b8" : "#475569",
                              lineHeight: 1.4,
                            }}>
                              <span style={{
                                color: form.plan === p.id ? "#22d3ee" : "#334155",
                                flexShrink: 0,
                                marginTop: 1,
                              }}>✓</span>
                              {f}
                            </li>
                          ))}
                        </ul>
                      </button>
                    ))}
                  </div>
                  {!form.plan && (
                    <p className="font-mono text-xs text-slate-600">
                      Choose a plan to get started
                    </p>
                  )}
                </div>

                {/* Row 1 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Your Name / Username" required>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. John Doe"
                      value={form.username}
                      onChange={set("username")}
                      required
                      autoComplete="off"
                    />
                  </Field>
                  <Field label="Discord Username" required>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. johndoe"
                      value={form.discordUsername}
                      onChange={set("discordUsername")}
                      required
                      autoComplete="off"
                    />
                  </Field>
                </div>

                {/* Row 2 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field
                    label="Discord User ID"
                    hint="Settings → Advanced → Developer Mode → right-click name → Copy ID"
                    required
                  >
                    <input
                      type="text"
                      className="form-input"
                      placeholder="e.g. 123456789012345678"
                      value={form.discordId}
                      onChange={set("discordId")}
                      required
                      autoComplete="off"
                    />
                  </Field>
                  <Field label="Bot Type" required>
                    <div className="relative">
                      <select
                        className="form-input appearance-none pr-10"
                        value={form.botType}
                        onChange={set("botType")}
                        required
                      >
                        <option value="" disabled>Select bot type...</option>
                        {BOT_TYPES.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      <ChevronDown
                        size={14}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                      />
                    </div>
                  </Field>
                </div>

                {/* Features */}
                <Field
                  label="Features Requested"
                  hint="List each feature separated by commas"
                  required
                >
                  <textarea
                    className="form-input resize-none h-28"
                    placeholder="e.g. Ticket system, Anti-nuke, Welcome messages, Auto-roles..."
                    value={form.features}
                    onChange={set("features")}
                    required
                  />
                </Field>

                {/* Row 3 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Budget" required>
                    <div className="relative">
                      <select
                        className="form-input appearance-none pr-10"
                        value={form.budget}
                        onChange={set("budget")}
                        required
                      >
                        <option value="" disabled>Select budget...</option>
                        {BUDGETS.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                      <ChevronDown
                        size={14}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                      />
                    </div>
                  </Field>
                  <Field label="Deadline" hint="When do you need this by?">
                    <input
                      type="date"
                      className="form-input"
                      value={form.deadline}
                      onChange={set("deadline")}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </Field>
                </div>

                {/* Notes */}
                <Field label="Additional Notes" hint="Anything else we should know?">
                  <textarea
                    className="form-input resize-none h-24"
                    placeholder="Server size, special requirements, reference bots..."
                    value={form.notes}
                    onChange={set("notes")}
                  />
                </Field>

                {/* Error */}
                {status === "error" && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/8 border border-red-500/20">
                    <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                    <p className="font-body text-sm text-red-400">{errorMsg}</p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  style={{ cursor: "pointer" }}
                  className="btn-primary w-full py-3.5 text-sm font-semibold disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending Order...
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Submit Order
                    </>
                  )}
                </button>

                <p className="font-mono text-xs text-slate-600 text-center">
                  Your order is sent to Discord. A private ticket channel will be
                  created in our server automatically.
                </p>

              </form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1 font-mono text-xs text-slate-400 tracking-wide">
        {label}
        {required && <span className="text-cyan-400">*</span>}
      </label>
      {children}
      {hint && (
        <p className="font-mono text-xs text-slate-600 leading-relaxed">{hint}</p>
      )}
    </div>
  );
}
