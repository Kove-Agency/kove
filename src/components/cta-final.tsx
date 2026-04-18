"use client";

import { motion } from "framer-motion";
import Script from "next/script";
import { Clock, FileCheck2, Video } from "lucide-react";
import { TechLines } from "@/components/tech-lines";

const CALENDLY_URL =
  "https://calendly.com/kove/nouvelle-reunion" +
  "?hide_gdpr_banner=1" +
  "&hide_event_type_details=0" +
  "&background_color=0f0f0f" +
  "&text_color=ffffff" +
  "&primary_color=3b82f6";

const reassurance = [
  { icon: Clock, label: "15 min, sans engagement" },
  { icon: FileCheck2, label: "Devis chiffré sous 24h" },
  { icon: Video, label: "Google Meet ou Zoom" },
];

export function CTAFinal() {
  return (
    <section
      id="contact"
      className="section-dark section-curve relative overflow-hidden py-28 lg:py-36"
    >
      <TechLines variant="soft" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.05] blur-[180px]" />

      <div className="relative mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="text-center"
        >
          <span className="pill pill-outline-dark">
            <span className="live-dot" />
            <span>2 places restantes ce mois-ci</span>
          </span>

          <h2 className="mt-6 font-heading text-[clamp(2.25rem,6vw,4rem)] font-medium leading-[1.04] tracking-[-0.035em] text-white">
            <span className="text-grad-fade-dark">Prêt à lancer le site</span>
            <br />
            que vous <em className="heading-italic">méritez</em> ?
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-emphasis-dark lg:text-[17px]">
            Réservez un créneau. On cadre votre projet, on chiffre le budget, et
            on vous dit franchement si on peut livrer dans vos délais.
          </p>

          <ul className="mt-7 flex flex-wrap items-center justify-center gap-2">
            {reassurance.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-[12.5px] text-white/80 backdrop-blur-sm"
              >
                <Icon size={13} className="text-accent" strokeWidth={2.2} />
                {label}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" as const }}
          className="mt-12 lg:mt-16"
        >
          <div className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-2 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-3">
            <div
              className="calendly-inline-widget overflow-hidden rounded-2xl"
              data-url={CALENDLY_URL}
              style={{ minWidth: "320px", height: "720px" }}
              aria-label="Réservation d'un appel avec l'équipe Kove via Calendly"
            />
          </div>

          <p className="mt-5 text-center text-[12.5px] text-white/45">
            Le widget ne s&apos;affiche pas ?{" "}
            <a
              href="https://calendly.com/kove/nouvelle-reunion"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent underline-offset-4 hover:underline"
            >
              Ouvrir Calendly dans un nouvel onglet
            </a>
          </p>
        </motion.div>
      </div>

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
    </section>
  );
}
