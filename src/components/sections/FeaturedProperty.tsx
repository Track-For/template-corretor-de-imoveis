"use client";

import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { DistortedImage } from "@/components/webgl/DistortedImage";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

const gallery = [
  {
    src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1800&q=86",
    alt: "Fachada da Residência Ipê ao entardecer",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=86",
    alt: "Sala principal iluminada da Residência Ipê",
  },
  {
    src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=86",
    alt: "Área social integrada da Residência Ipê",
  },
];

const specs = [
  ["Área privativa", "[000] m²"],
  ["Suítes", "[0]"],
  ["Vagas", "[0]"],
  ["Valor", "R$ [VALOR]"],
];

export function FeaturedProperty() {
  const [current, setCurrent] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!imageRef.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.fromTo(
        imageRef.current,
        { autoAlpha: 0.45, scale: 1.025 },
        { autoAlpha: 1, scale: 1, duration: 0.7, ease: "power3.out" },
      );
    },
    { dependencies: [current] },
  );

  const move = (direction: number) => {
    setCurrent((value) => (value + direction + gallery.length) % gallery.length);
  };

  return (
    <section
      aria-labelledby="featured-title"
      className="section-space"
      id="destaque"
    >
      <div className="site-container grid items-center gap-12 md:grid-cols-12 md:gap-10 lg:gap-16">
        <div className="relative md:col-span-7" data-cursor="drag">
          <div className="parallax-frame h-[520px] rounded-[30px] bg-line md:h-[760px]">
            <div ref={imageRef} className="parallax-layer" data-parallax-layer>
              <DistortedImage
                key={gallery[current].src}
                src={gallery[current].src}
                alt={gallery[current].alt}
                sizes="(min-width: 768px) 60vw, 100vw"
              />
            </div>
          </div>
          <div className="absolute bottom-5 right-5 flex gap-2 md:bottom-7 md:right-7">
            <button
              aria-label="Imagem anterior"
              className="grid size-12 place-items-center rounded-full border border-white/55 bg-sand/92 text-ink backdrop-blur-md transition-transform hover:scale-105 active:scale-95"
              onClick={() => move(-1)}
              type="button"
            >
              <ArrowLeft aria-hidden="true" className="size-5" strokeWidth={1.8} />
            </button>
            <button
              aria-label="Próxima imagem"
              className="grid size-12 place-items-center rounded-full border border-white/55 bg-sand/92 text-ink backdrop-blur-md transition-transform hover:scale-105 active:scale-95"
              onClick={() => move(1)}
              type="button"
            >
              <ArrowRight aria-hidden="true" className="size-5" strokeWidth={1.8} />
            </button>
          </div>
        </div>

        <div className="md:col-span-5">
          <SectionLabel>03 — Imóvel da semana</SectionLabel>
          <h2
            className="display-title"
            data-reveal-title
            id="featured-title"
          >
            Residência Ipê
          </h2>
          <p className="mt-7 max-w-xl text-[1.0625rem] leading-8 text-muted">
            [Descrição do imóvel, com localização, arquitetura, atmosfera e os
            diferenciais que fazem desta residência uma escolha singular.]
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-x-7 gap-y-8 border-t border-line pt-8">
            {specs.map(([term, value]) => (
              <div key={term}>
                <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                  {term}
                </dt>
                <dd className="mt-2 font-display text-2xl font-normal text-ink">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-11 flex flex-col gap-3 sm:flex-row">
            <Button href="#contato" variant="bronze">
              Agendar visita privada
            </Button>
            <Button href="#contato" variant="outline">
              Ficha técnica
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
