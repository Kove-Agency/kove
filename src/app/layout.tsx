import type { Metadata } from "next";
import { Inter, Space_Grotesk, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Kove — Votre site, notre craft.",
  description:
    "Agence web nouvelle génération. Sites e-commerce, vitrines et landing pages livrés en 48-72h grâce à l'IA. Design premium, performance maximale.",
  keywords: [
    "agence web",
    "création site internet",
    "shopify",
    "landing page",
    "site e-commerce",
    "site vitrine",
    "agence IA",
  ],
  openGraph: {
    title: "Kove — Votre site, notre craft.",
    description:
      "Sites web premium livrés en 48-72h. E-commerce, vitrines, landing pages.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} dark h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col overflow-x-hidden">
        {/* Global noise overlay (subtle texture) */}
        <svg
          className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.02]"
          aria-hidden="true"
        >
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
