"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Processus", href: "#process" },
  { label: "Réalisations", href: "#portfolio" },
  { label: "Tarifs", href: "#pricing" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" as const }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/[0.06] bg-[#0f0f0f]/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:h-[72px] lg:px-8">
        {/* Logo */}
        <a
          href="#"
          aria-label="Kove — accueil"
          className="inline-flex items-center text-white transition-opacity hover:opacity-85"
        >
          <svg
            viewBox="0 0 180 48"
            className="h-5 w-auto lg:h-[22px]"
            fill="none"
            aria-hidden="true"
          >
            <g fill="currentColor">
              <path d="M12 10h7.2v13.2L30.8 10h8.6L27 23.4 40.2 38h-9.1L19.2 25v13H12V10Z" />
              <path d="M59.2 38.6c-8.4 0-13.9-5.9-13.9-14.5S50.8 9.6 59.2 9.6c8.4 0 13.9 5.8 13.9 14.5s-5.5 14.5-13.9 14.5Zm0-6.6c4.1 0 6.6-3 6.6-7.9 0-4.9-2.5-7.9-6.6-7.9-4.1 0-6.7 3-6.7 7.9 0 4.9 2.6 7.9 6.7 7.9Z" />
              <path d="M86.9 38 76.4 10h7.9l6.9 20.4L98.1 10h7.7L95.3 38h-8.4Z" />
              <path d="M111.4 38V10h21.9v6.4h-14.7v4.5h13v6.2h-13v4.5h14.9V38h-22.1Z" />
            </g>
            <circle cx="146" cy="35" r="3.4" fill="#3b82f6" />
          </svg>
        </a>

        {/* Desktop nav — centered */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[14px] font-medium text-white/75 transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA — white pill 8lab style */}
        <div className="hidden md:block">
          <a
            href="#contact"
            className="pill pill-solid-white"
          >
            Devis gratuit
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="relative z-50 text-white/90 transition-colors hover:text-white md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" as const }}
            className="overflow-hidden border-t border-white/[0.06] bg-[#0f0f0f]/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="rounded-lg px-3 py-3 text-[15px] font-medium text-white/85 transition-colors hover:bg-white/[0.04] hover:text-white"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="pill pill-solid-white mt-4 justify-center"
              >
                Devis gratuit
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
