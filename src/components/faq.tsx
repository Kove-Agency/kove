"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "Comment vous faites pour livrer aussi vite ?",
    answer:
      "Notre stack IA automatise les tâches répétitives (structure, responsive, optimisation). On se concentre sur ce qui compte : le design et la stratégie de conversion.",
  },
  {
    question: "48h, c'est pas trop rapide pour un bon résultat ?",
    answer:
      "Non. Rapide ne veut pas dire bâclé. Vous validez le design avant le développement. Chaque site passe par un audit performance, SEO et accessibilité avant livraison.",
  },
  {
    question: "Je vois tout le process en temps réel ?",
    answer:
      "Oui. Brief, maquette, développement, déploiement — vous avez un accès live à chaque étape. Zéro zone d'ombre.",
  },
  {
    question: "Que se passe-t-il après la livraison ?",
    answer:
      "30 jours de support inclus + révisions selon votre plan (1 à 5). On propose aussi un forfait maintenance pour ceux qui veulent continuer.",
  },
  {
    question: "Quelles technologies utilisez-vous ?",
    answer:
      "Shopify pour l'e-commerce, Next.js + React pour le custom. Stack moderne, rapide, SEO-first. Score PageSpeed 95+ garanti.",
  },
  {
    question: "Et si le résultat ne me plaît pas ?",
    answer:
      "Vous validez chaque étape. Si le résultat final ne correspond pas au brief validé, on corrige sans frais supplémentaires.",
  },
];

function FaqItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#0f0f0f]/10 last:border-b-0">
      <button
        onClick={() => setOpen(!open)}
        className="group flex w-full items-center gap-5 py-6 text-left transition-colors lg:py-7"
      >
        <span className="font-mono text-[12px] font-medium text-[#5e5f6e] lg:text-[13px]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 text-[15px] font-medium text-[#0f0f0f] transition-colors lg:text-[17px]">
          {question}
        </span>
        <Plus
          size={18}
          className={`shrink-0 text-[#0f0f0f]/50 transition-all duration-300 ${
            open ? "rotate-45 text-accent" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" as const }}
            className="overflow-hidden"
          >
            <p className="pb-6 pl-11 text-[14px] leading-relaxed text-emphasis-light lg:text-[15px]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  return (
    <section className="section-light section-curve relative overflow-hidden py-28 lg:py-36">
      <div className="relative mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="text-center"
        >
          <span className="pill pill-outline-light">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0f0f0f]" />
            FAQ
          </span>
          <h2 className="mt-6 font-heading text-[clamp(2rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-[#0f0f0f]">
            <span className="text-grad-fade-light">Vous vous demandez.</span>
            <br />
            On <em className="heading-italic">répond</em>.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-emphasis-light lg:text-[17px]">
            Les questions les plus fréquentes sur notre process, nos délais et
            nos garanties.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" as const }}
          className="mt-12 rounded-[28px] border border-[#0f0f0f]/[0.08] bg-white px-6 py-2 shadow-[0_1px_2px_rgba(17,17,17,0.04)] sm:px-8 lg:mt-16"
        >
          {faqs.map((faq, i) => (
            <FaqItem key={faq.question} index={i} {...faq} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
