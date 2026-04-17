"use client";

import { motion } from "framer-motion";
import { Check, Minus, X } from "lucide-react";
import { TechLines } from "@/components/tech-lines";

type Cell = { state: "yes" | "mid" | "no"; label?: string };

type Row = {
  label: string;
  kove: Cell;
  freelance: Cell;
  agency: Cell;
  template: Cell;
};

const rows: Row[] = [
  {
    label: "Délai de mise en ligne",
    kove: { state: "yes", label: "48 à 72h" },
    freelance: { state: "mid", label: "2 à 4 semaines" },
    agency: { state: "no", label: "2 à 3 mois" },
    template: { state: "yes", label: "Instantané" },
  },
  {
    label: "Design sur-mesure",
    kove: { state: "yes" },
    freelance: { state: "mid", label: "Variable" },
    agency: { state: "yes" },
    template: { state: "no" },
  },
  {
    label: "Code optimisé (Next.js / React)",
    kove: { state: "yes" },
    freelance: { state: "mid", label: "Variable" },
    agency: { state: "mid", label: "Souvent WordPress" },
    template: { state: "no" },
  },
  {
    label: "Score PageSpeed 90+",
    kove: { state: "yes" },
    freelance: { state: "mid" },
    agency: { state: "mid" },
    template: { state: "no" },
  },
  {
    label: "SEO technique inclus",
    kove: { state: "yes" },
    freelance: { state: "mid" },
    agency: { state: "yes", label: "En option" },
    template: { state: "mid", label: "Limité" },
  },
  {
    label: "Support post-livraison",
    kove: { state: "yes", label: "30j offerts" },
    freelance: { state: "mid", label: "Selon dispo" },
    agency: { state: "yes", label: "Sous contrat" },
    template: { state: "no", label: "Forum public" },
  },
  {
    label: "Budget",
    kove: { state: "yes", label: "890 – 3 490€" },
    freelance: { state: "mid", label: "1 500 – 5 000€" },
    agency: { state: "no", label: "8 000 – 30 000€" },
    template: { state: "yes", label: "20 – 50€/mois" },
  },
];

const Icon = ({ state }: { state: Cell["state"] }) => {
  if (state === "yes")
    return (
      <Check
        size={16}
        strokeWidth={2.5}
        className="text-accent"
        aria-label="Inclus"
      />
    );
  if (state === "mid")
    return (
      <Minus
        size={16}
        strokeWidth={2.5}
        className="text-white/40"
        aria-label="Partiel"
      />
    );
  return (
    <X
      size={16}
      strokeWidth={2.5}
      className="text-white/30"
      aria-label="Non inclus"
    />
  );
};

const CellContent = ({ cell }: { cell: Cell }) => (
  <div className="flex flex-col items-center gap-1">
    <Icon state={cell.state} />
    {cell.label && (
      <span className="text-center text-[11.5px] leading-tight text-white/55 sm:text-[12.5px]">
        {cell.label}
      </span>
    )}
  </div>
);

export function Comparison() {
  return (
    <section
      id="comparison"
      className="section-dark section-curve relative overflow-hidden py-24 lg:py-32"
    >
      <TechLines variant="soft" />

      <div className="relative mx-auto max-w-[1280px] px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="text-center"
        >
          <span className="pill pill-outline-dark">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Comparaison honnête
          </span>
          <h2 className="mt-6 font-heading text-[clamp(2rem,5vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.03em] text-white">
            <span className="text-grad-fade-dark">Pourquoi Kove plutôt</span>{" "}
            qu&apos;<em className="heading-italic">ailleurs</em>.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-emphasis-dark lg:text-[16px]">
            Les 4 options quand on veut un site qui convertit. Classées
            honnêtement, sans fioriture.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" as const }}
          className="mt-14 overflow-x-auto lg:mt-16"
        >
          <div className="min-w-[680px] rounded-3xl border border-white/[0.07] bg-white/[0.02] p-1.5 backdrop-blur-sm sm:p-2">
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="rounded-tl-2xl bg-white/[0.02] px-4 py-5 text-left align-bottom sm:px-6">
                    <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
                      Critère
                    </span>
                  </th>
                  <th className="relative bg-accent/[0.08] px-3 py-5 text-center align-bottom sm:px-5">
                    <div className="pointer-events-none absolute inset-x-3 -top-px h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-accent">
                      Kove
                    </span>
                  </th>
                  <th className="px-3 py-5 text-center align-bottom sm:px-5">
                    <span className="text-[11.5px] font-medium uppercase tracking-[0.1em] text-white/55 sm:text-[12.5px]">
                      Freelance
                    </span>
                  </th>
                  <th className="px-3 py-5 text-center align-bottom sm:px-5">
                    <span className="text-[11.5px] font-medium uppercase tracking-[0.1em] text-white/55 sm:text-[12.5px]">
                      Agence
                    </span>
                  </th>
                  <th className="rounded-tr-2xl px-3 py-5 text-center align-bottom sm:px-5">
                    <span className="text-[11.5px] font-medium uppercase tracking-[0.1em] text-white/55 sm:text-[12.5px]">
                      Template
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.label}>
                    <td
                      className={`border-t border-white/[0.05] bg-white/[0.01] px-4 py-5 text-[13px] font-medium text-white/85 sm:px-6 sm:text-[14px] ${
                        i === rows.length - 1 ? "rounded-bl-2xl" : ""
                      }`}
                    >
                      {r.label}
                    </td>
                    <td className="border-t border-accent/15 bg-accent/[0.05] px-3 py-5 sm:px-5">
                      <CellContent cell={r.kove} />
                    </td>
                    <td className="border-t border-white/[0.05] px-3 py-5 sm:px-5">
                      <CellContent cell={r.freelance} />
                    </td>
                    <td className="border-t border-white/[0.05] px-3 py-5 sm:px-5">
                      <CellContent cell={r.agency} />
                    </td>
                    <td
                      className={`border-t border-white/[0.05] px-3 py-5 sm:px-5 ${
                        i === rows.length - 1 ? "rounded-br-2xl" : ""
                      }`}
                    >
                      <CellContent cell={r.template} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 text-center text-[12.5px] text-white/45 sm:text-[13px]"
        >
          Estimations basées sur +40 projets livrés et les tarifs moyens du
          marché FR 2026.
        </motion.p>
      </div>
    </section>
  );
}
