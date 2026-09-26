import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ChapterNavigation } from "@/components/layout/ChapterNavigation";
import { CityMap } from "@/components/sections/CityMap";
import { BrokerQuote } from "@/components/sections/BrokerQuote";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { PropertyGallery } from "@/components/sections/PropertyGallery";
import { WorldsSelector } from "@/components/sections/WorldsSelector";
import { Principles } from "@/components/sections/Principles";
import { ZoomTransition } from "@/components/sections/ZoomTransition";

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
      <ChapterNavigation />
      <main>
        <Hero />
        <ZoomTransition
          from="00"
          to="01"
          nextChapter="A arte de morar bem"
          leftWord="A arte"
          rightWord="de morar"
          image="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=2200&q=88"
          alt="Interior sereno que introduz o capítulo A arte de morar bem"
        />
        <Manifesto />
        <PropertyGallery />
        <ZoomTransition
          from="02"
          to="03"
          nextChapter="Três mundos"
          leftWord="Três"
          rightWord="mundos"
          image="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=88"
          alt="Terraço panorâmico que introduz o capítulo Três mundos"
        />
        <WorldsSelector />
        <Principles />
        <ZoomTransition
          from="04"
          to="05"
          nextChapter="Onde a luz chega"
          leftWord="Onde a luz"
          rightWord="chega"
          image="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=2200&q=88"
          alt="Cidade ao anoitecer que introduz o capítulo Onde a luz chega"
        />
        <CityMap />
        <BrokerQuote />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
