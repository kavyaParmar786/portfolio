"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap, Github, Twitter } from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Pricing", href: "#pricing" },
  { label: "Order", href: "#order" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile on resize
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Active section tracking
  useEffect(() => {
    const sectionIds = navItems.map((n) => n.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass border-b border-white/5 shadow-glass"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#hero");
            }}
            className="flex items-center gap-2.5 group"
          >
            <img
              src="/logo.jpg"
              alt="fusion.exe logo"
              className="w-8 h-8 rounded-lg object-cover shadow-glow-sm"
            />
            <span className="font-display font-bold text-base tracking-tight">
              fusion<span className="text-cyan-400">.exe</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative font-body text-sm px-3.5 py-1.5 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-cyan-400"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg bg-cyan-400/8 border border-cyan-400/15"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2">
              <a
                href="#"
                className="w-8 h-8 rounded-lg glass flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github size={15} />
              </a>
              <a
                href="https://discord.gg/Wej7Cd3XVW"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-4 py-2 text-xs"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.032.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                </svg>
                Discord
              </a>
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 glass rounded-lg flex items-center justify-center text-slate-300"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-72 glass border-l border-white/5 z-50 md:hidden flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <img
                    src="/logo.jpg"
                    alt="fusion.exe logo"
                    className="w-7 h-7 rounded-lg object-cover"
                  />
                  <span className="font-display font-bold text-sm">
                    fusion<span className="text-cyan-400">.exe</span>
                  </span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 px-4 py-6 overflow-y-auto">
                <p className="font-mono text-xs text-slate-500 px-2 mb-3 tracking-widest uppercase">
                  Navigation
                </p>
                <div className="flex flex-col gap-1">
                  {navItems.map((item, i) => {
                    const isActive =
                      activeSection === item.href.replace("#", "");
                    return (
                      <motion.button
                        key={item.label}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 + 0.1 }}
                        onClick={() => handleNavClick(item.href)}
                        className={`text-left w-full px-4 py-3 rounded-xl font-body text-sm transition-all ${
                          isActive
                            ? "bg-cyan-400/10 text-cyan-400 border border-cyan-400/20"
                            : "text-slate-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {item.label}
                      </motion.button>
                    );
                  })}
                </div>
              </nav>

              {/* Bottom */}
              <div className="px-4 pb-6 border-t border-white/5 pt-4">
                <a
                  href="https://discord.gg/Wej7Cd3XVW"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full py-3 text-sm"
                  onClick={() => setMobileOpen(false)}
                >
                  Join Discord Server
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
