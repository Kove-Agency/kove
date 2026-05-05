import { ArrowUpRight, Mail } from "lucide-react";
import { TechLines } from "@/components/tech-lines";

const footerLinks = [
  { label: "Services", href: "#services" },
  { label: "Processus", href: "#process" },
  { label: "Réalisations", href: "#portfolio" },
  { label: "Tarifs", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
];

export function Footer() {
  return (
    <footer className="section-deep relative overflow-hidden pt-24 pb-12 lg:pt-32">
      <TechLines variant="soft" />
      {/* Subtle top glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[800px] -translate-x-1/2 rounded-full bg-accent/[0.04] blur-[120px]" />

      <div className="relative mx-auto max-w-[1280px] px-6">
        {/* Big CTA headline */}
        <div className="mb-16 flex flex-col items-start justify-between gap-8 border-b border-white/[0.06] pb-16 lg:flex-row lg:items-end lg:gap-12">
          <h2 className="font-heading text-[clamp(2.5rem,7vw,5rem)] font-medium leading-[0.95] tracking-[-0.04em] text-white">
            <span className="text-grad-fade-dark">Prêt à lancer</span>
            <br />
            votre <em className="heading-italic">prochain site</em> ?
          </h2>
          <div className="flex flex-col gap-3 lg:items-end">
            <a href="#contact" className="pill pill-solid-white gap-2 px-6 py-3.5 text-[14px]">
              <span className="live-dot" />
              Lancer mon projet
            </a>
            <a
              href="mailto:hello@kove.agency"
              className="inline-flex items-center gap-2 text-[13px] text-white/60 transition-colors hover:text-white"
            >
              <Mail size={13} />
              hello@kove.agency
            </a>
          </div>
        </div>

        {/* Links grid */}
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <svg
              viewBox="0 0 280 100"
              className="h-7 w-auto text-white"
              fill="none"
              role="img"
              aria-label="Kove"
            >
              {/* Sliced K with cyan signature */}
              <g transform="translate(0, 14)">
                <rect x="0" y="0" width="9.5" height="72" fill="currentColor" />
                <polygon points="9.5,36 19,36 51,0 41,0" fill="currentColor" />
                <polygon points="9.5,36 19,36 51,72 41,72" fill="#22d3ee" />
              </g>
              <text
                x="76"
                y="68"
                fontFamily="Space Grotesk, system-ui, sans-serif"
                fontWeight="500"
                fontSize="62"
                letterSpacing="-2.5"
                fill="currentColor"
              >
                Kove
              </text>
            </svg>
            <p className="mt-3 text-[13px] leading-relaxed text-white/55">
              Votre site, notre craft. Sites premium livrés en 48-72h,
              propulsés par l&apos;IA. Design qui convertit, code optimisé.
            </p>
          </div>

          <div className="flex gap-14 sm:gap-20">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
                Navigation
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-[13px] text-white/70 transition-colors duration-300 hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/40">
                Social
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-flex items-center gap-1 text-[13px] text-white/70 transition-colors duration-300 hover:text-white"
                    >
                      {link.label}
                      <ArrowUpRight size={11} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 text-[12px] text-white/40 md:flex-row">
          <p>© 2026 Kove — Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-white/70">
              Mentions légales
            </a>
            <a href="#" className="transition-colors hover:text-white/70">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
