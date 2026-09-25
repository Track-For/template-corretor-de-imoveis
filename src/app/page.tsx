import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Broker } from "@/components/sections/Broker";
import { Contact } from "@/components/sections/Contact";
import { FeaturedProperty } from "@/components/sections/FeaturedProperty";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { NeighborhoodStrip } from "@/components/sections/NeighborhoodStrip";
import { Process } from "@/components/sections/Process";
import { Showcase } from "@/components/sections/Showcase";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://aurora-residencias.vercel.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Aurora Residências",
  description:
    "Curadoria de imóveis de alto padrão, visitas sob medida e acompanhamento até a entrega das chaves.",
  url: siteUrl,
  image:
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=86",
  telephone: "[TELEFONE]",
  address: {
    "@type": "PostalAddress",
    addressLocality: "[Cidade]",
    addressRegion: "[UF]",
    addressCountry: "BR",
  },
  areaServed: "[Cidade - UF]",
  priceRange: "R$ [VALOR]",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Header />
      <main>
        <Hero />
        <NeighborhoodStrip />
        <Showcase />
        <Manifesto />
        <FeaturedProperty />
        <Process />
        <Broker />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
