"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Sparkles } from "lucide-react";
import { TechLines } from "@/components/tech-lines";

const projectTypes = [
  "Landing page",
  "Site vitrine",
  "E-commerce Shopify",
  "Refonte de site",
  "Autre",
];

export function CTAFinal() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="section-dark section-curve relative overflow-hidden py-28 lg:py-36">
      <TechLines variant="soft" corners />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.05] blur-[180px]" />

      <div className="relative mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="text-center"
        >
          <span className="pill pill-outline-dark">
            <span className="live-dot" />
            <span>On prend votre brief aujourd&apos;hui</span>
          </span>
          <h2 className="mt-6 font-heading text-[clamp(2.25rem,6vw,4rem)] font-medium leading-[1.04] tracking-[-0.035em] text-white">
            <span className="text-grad-fade-dark">Votre prochain site</span>
            <br />
            commence <em className="heading-italic">ici</em>.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-emphasis-dark lg:text-[17px]">
            Brief de 15 min, devis en 24h, site en ligne sous 72h. On ne traîne
            pas.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" as const }}
          className="mt-12 lg:mt-16"
        >
          {submitted ? (
            <div className="rounded-3xl border border-accent/25 bg-accent/[0.05] p-12 text-center backdrop-blur-xl">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/15">
                <Sparkles size={24} className="text-accent" />
              </div>
              <p className="font-heading text-[22px] font-semibold text-white">
                Demande reçue
              </p>
              <p className="mt-2 text-[14px] text-white/65">
                On vous répond sous 24h avec une proposition concrète.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-xl lg:p-10"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-[13px] font-medium text-white/75"
                  >
                    Nom
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Votre nom"
                    className="h-12 w-full rounded-full border border-white/[0.08] bg-white/[0.03] px-5 text-[14px] text-white placeholder:text-white/35 transition-all duration-300 focus:border-accent/40 focus:bg-white/[0.05] focus:outline-none focus:ring-1 focus:ring-accent/25"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-[13px] font-medium text-white/75"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="votre@email.com"
                    className="h-12 w-full rounded-full border border-white/[0.08] bg-white/[0.03] px-5 text-[14px] text-white placeholder:text-white/35 transition-all duration-300 focus:border-accent/40 focus:bg-white/[0.05] focus:outline-none focus:ring-1 focus:ring-accent/25"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="project-type"
                  className="mb-2 block text-[13px] font-medium text-white/75"
                >
                  Type de projet
                </label>
                <select
                  id="project-type"
                  name="project-type"
                  required
                  className="h-12 w-full rounded-full border border-white/[0.08] bg-white/[0.03] px-5 text-[14px] text-white transition-all duration-300 focus:border-accent/40 focus:bg-white/[0.05] focus:outline-none focus:ring-1 focus:ring-accent/25"
                >
                  <option value="" className="bg-[#0f0f0f]">
                    Sélectionnez
                  </option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type} className="bg-[#0f0f0f]">
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="message"
                  className="mb-2 block text-[13px] font-medium text-white/75"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Décrivez votre projet en quelques lignes..."
                  className="w-full resize-none rounded-3xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-[14px] text-white placeholder:text-white/35 transition-all duration-300 focus:border-accent/40 focus:bg-white/[0.05] focus:outline-none focus:ring-1 focus:ring-accent/25"
                />
              </div>

              <button
                type="submit"
                className="pill pill-solid-accent mt-8 w-full justify-center gap-2 py-4 text-[14px]"
              >
                Envoyer ma demande
                <Send size={15} />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
