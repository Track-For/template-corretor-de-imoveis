"use client";

import { Button } from "@/components/ui/Button";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

const selects = [
  {
    id: "tipo",
    label: "Tipo",
    options: ["Todos os tipos", "Apartamento", "Casa", "Cobertura"],
  },
  {
    id: "bairro",
    label: "Bairro",
    options: ["Todos os bairros", "[Bairro 1]", "[Bairro 2]", "[Bairro 3]"],
  },
  {
    id: "valor",
    label: "Faixa de valor",
    options: [
      "Qualquer valor",
      "Até R$ [VALOR]",
      "R$ [VALOR] a R$ [VALOR]",
      "Acima de R$ [VALOR]",
    ],
  },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const zoomRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLFormElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pin = pinRef.current;
      const media = mediaRef.current;
      const zoom = zoomRef.current;
      const title = titleRef.current;
      const copy = copyRef.current;
      const search = searchRef.current;
      const sun = sunRef.current;
      if (!section || !pin || !media || !zoom || !title || !search || !sun) {
        return;
      }

      const mediaQuery = gsap.matchMedia();
      mediaQuery.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * 1.5}`,
            pin,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .fromTo(
            media,
            { clipPath: "inset(46% 6% 5% 6% round 28px)" },
            { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1 },
            0,
          )
          .fromTo(zoom, { scale: 1.2 }, { scale: 1, duration: 1 }, 0)
          .to(title, { yPercent: -60, autoAlpha: 0, duration: 0.72 }, 0.08)
          .to(copy, { yPercent: -35, autoAlpha: 0, duration: 0.62 }, 0.08)
          .to(search, { y: 40, autoAlpha: 0, duration: 0.55 }, 0.08)
          .fromTo(
            sun,
            { backgroundPosition: "50% 80%" },
            { backgroundPosition: "50% 20%", duration: 1 },
            0,
          );

        return () => timeline.kill();
      });

      return () => mediaQuery.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="hero-section"
      id="topo"
    >
      <div ref={pinRef} className="hero-pin">
        <div ref={mediaRef} className="hero-media" data-hero-image>
          <div ref={zoomRef} className="hero-zoom">
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=90"
              alt="Sala de estar contemporânea com pé-direito duplo e luz natural"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
          <div ref={sunRef} className="hero-sunrise" />
        </div>

        <div className="site-container relative z-10 h-full">
          <div className="grid gap-8 pt-[calc(var(--header-height)+3.5rem)] md:grid-cols-12 md:items-end md:pt-[calc(var(--header-height)+4rem)]">
            <h1
              ref={titleRef}
              className="font-display text-[clamp(3.5rem,8.7vw,8.5rem)] font-light leading-[0.92] tracking-[-0.055em] text-ink md:col-span-9"
              data-hero-title
              id="hero-title"
            >
              Viva onde a luz
              <br />
              chega{" "}
              <em className="inline-block pb-2 font-light leading-[1.1] text-bronze">
                primeiro.
              </em>
            </h1>

            <div
              ref={copyRef}
              className="flex flex-col gap-6 md:col-span-3 md:pb-3"
              data-hero-copy
            >
              <p className="text-[1.0625rem] leading-7 text-muted">
                Uma curadoria de imóveis de alto padrão escolhidos um a um — para
                quem não quer ver cinquenta anúncios, e sim os cinco certos.
              </p>
              <a
                className="group grid size-[7.5rem] place-content-center rounded-full border border-ink/30 text-center text-xs font-bold uppercase leading-5 tracking-[0.14em] transition-colors duration-300 hover:border-bronze hover:bg-bronze hover:text-white"
                href="#imoveis"
              >
                <span className="flex max-w-20 items-center gap-2">
                  Role para descobrir
                  <ArrowDown
                    aria-hidden="true"
                    className="size-4 shrink-0 transition-transform group-hover:translate-y-1"
                    strokeWidth={1.8}
                  />
                </span>
              </a>
            </div>
          </div>

          <form
            ref={searchRef}
            aria-label="Busca de imóveis"
            className="hero-search grid gap-2 rounded-[26px] border border-white/60 bg-sand/95 p-3 text-ink shadow-[0_24px_70px_rgba(65,47,24,0.14)] backdrop-blur-xl md:grid-cols-[1fr_1fr_1fr_auto] md:items-end md:p-4"
            data-hero-search
          >
            {selects.map((select) => (
              <label
                key={select.id}
                className="block rounded-[18px] px-4 py-3 transition-colors hover:bg-white/55"
                htmlFor={select.id}
              >
                <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                  {select.label}
                </span>
                <select
                  data-cursor="hide"
                  className="w-full appearance-none border-0 bg-transparent pr-6 text-sm font-semibold text-ink outline-none"
                  defaultValue={select.options[0]}
                  id={select.id}
                  name={select.id}
                >
                  {select.options.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
            ))}
            <Button
              href="#imoveis"
              variant="bronze"
              className="min-h-14 px-6 md:min-h-[62px]"
            >
              Buscar imóveis
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
