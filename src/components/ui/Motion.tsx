"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
}: FadeInProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-80px 0px" });

  const dirMap = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...dirMap[direction] }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerChildren({ children, className, staggerDelay = 0.08 }: StaggerProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: staggerDelay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

interface SectionHeadingProps {
  tag?: string;
  title: string;
  accent?: string;
  subtitle?: string;
  center?: boolean;
}

export function SectionHeading({
  tag,
  title,
  accent,
  subtitle,
  center = false,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-14", center && "text-center")}>
      {tag && (
        <p className="font-mono text-xs text-cyan-400/80 tracking-[0.2em] uppercase mb-3">
          {tag}
        </p>
      )}
      <h2 className="section-heading text-white mb-4">
        {title}{" "}
        {accent && <span className="gradient-text">{accent}</span>}
      </h2>
      {subtitle && (
        <p className="font-body text-slate-400 text-base max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
