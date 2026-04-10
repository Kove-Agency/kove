import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Process } from "@/components/process";
import { Portfolio } from "@/components/portfolio";
import { WhyUs } from "@/components/why-us";
import { Testimonials } from "@/components/testimonials";
import { Pricing } from "@/components/pricing";
import { FAQ } from "@/components/faq";
import { CTAFinal } from "@/components/cta-final";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero dark */}
        <Hero />
        {/* Services LIGHT — "L'écosystème" 8lab */}
        <Services />
        {/* Process dark — pipeline live */}
        <Process />
        {/* Portfolio dark — 2+ projets mis en avant */}
        <Portfolio />
        {/* WhyUs LIGHT — "Pourquoi Kove" */}
        <WhyUs />
        {/* Testimonials dark — 2 grosses cards */}
        <Testimonials />
        {/* Pricing dark — "Rejoindre" */}
        <Pricing />
        {/* FAQ LIGHT */}
        <FAQ />
        {/* CTA final dark — formulaire contact */}
        <CTAFinal />
      </main>
      {/* Footer pur noir */}
      <Footer />
    </>
  );
}
