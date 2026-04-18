import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ClientsMarquee } from "@/components/clients-marquee";
import { Services } from "@/components/services";
import { Process } from "@/components/process";
import { Portfolio } from "@/components/portfolio";
import { MidCTA } from "@/components/mid-cta";
import { WhyUs } from "@/components/why-us";
import { Pricing } from "@/components/pricing";
import { FAQ } from "@/components/faq";
import { CTAFinal } from "@/components/cta-final";
import { Footer } from "@/components/footer";

// Re-render at most once per hour so the hero's "delivered by [day]" stays
// fresh without paying the cost of per-request dynamic rendering.
export const revalidate = 3600;

const FRENCH_WEEKDAYS = [
  "dimanche",
  "lundi",
  "mardi",
  "mercredi",
  "jeudi",
  "vendredi",
  "samedi",
] as const;

/** Delivery promise = today + 2 days, in French (e.g. Fri → "dimanche"). */
function getDeliveryDay(): string {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  return FRENCH_WEEKDAYS[d.getDay()];
}

export default function Home() {
  const deliveryDay = getDeliveryDay();

  return (
    <>
      <Navbar />
      <main>
        <Hero deliveryDay={deliveryDay} />
        <ClientsMarquee />
        <Services />
        <Process />
        <Portfolio />
        <MidCTA />
        <WhyUs />
        <Pricing />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
