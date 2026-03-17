"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2, ChevronDown } from "lucide-react";
import { FadeIn, SectionHeading } from "@/components/ui/Motion";
import { GlassCard } from "@/components/ui/GlassCard";

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
  "Under $15",
  "$15 – $30",
  "$30 – $60",
  "$60 – $100",
  "$100+",
  "Let's discuss",
];

interface FormData {
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

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [field]: e.target.value }));

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
        <FadeIn>
          <SectionHeading
            tag="// 06 — Order"
            title="Order a"
            accent="Custom Bot"
            subtitle="Fill in the form below. Your order will be sent directly to Discord and a private ticket channel will be created automatically."
            center
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <GlassCard className="p-8 shadow-glow" glow>
            {/* Success state */}
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
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
                      ticket channel has been created — check your DMs or the
                      support server.
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
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
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
                      />
                    </Field>
                    <Field label="Discord Username" required>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. johndoe#0001"
                        value={form.discordUsername}
                        onChange={set("discordUsername")}
                        required
                      />
                    </Field>
                  </div>

                  {/* Row 2 */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field
                      label="Discord User ID"
                      hint="Enable Developer Mode → right-click your name → Copy ID"
                      required
                    >
                      <input
                        type="text"
                        className="form-input"
                        placeholder="e.g. 123456789012345678"
                        value={form.discordId}
                        onChange={set("discordId")}
                        pattern="[0-9]{17,20}"
                        title="Discord IDs are 17–20 digit numbers"
                        required
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
                          <option value="" disabled>
                            Select bot type...
                          </option>
                          {BOT_TYPES.map((t) => (
                            <option key={t} value={t}>
                              {t}
                            </option>
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
                    hint="List each feature on a new line or separated by commas"
                    required
                  >
                    <textarea
                      className="form-input resize-none h-28"
                      placeholder="e.g. Ticket system with categories, Anti-nuke with auto-lockdown, Welcome embeds with auto-role..."
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
                          <option value="" disabled>
                            Select budget range...
                          </option>
                          {BUDGETS.map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
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
                      placeholder="Server size, special requirements, reference bots, design preferences..."
                      value={form.notes}
                      onChange={set("notes")}
                    />
                  </Field>

                  {/* Error */}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-red-500/8 border border-red-500/20"
                    >
                      <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                      <p className="font-body text-sm text-red-400">{errorMsg}</p>
                    </motion.div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-primary w-full py-3.5 text-sm font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
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
                    Your order is sent via Discord webhook. A private ticket channel will be
                    created in our server automatically.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </GlassCard>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Field wrapper ────────────────────────────────────────────────────────────
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
