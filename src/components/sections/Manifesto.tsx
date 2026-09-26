"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const statement = [
  { word: "Não " },
  { word: "vendemos " },
  { word: "metros " },
  { word: "quadrados. " },
  { word: "Abrimos " },
  { word: "a " },
  { word: "porta " },
  { word: "do " },
  { word: "próximo ", emphasis: true },
  { word: "capítulo ", emphasis: true },
  { word: "da " },
  { word: "sua " },
  { word: "história." },
];

const beliefs = [
  {
    number: "i.",
    title: "Curadoria, não catálogo",
    text: "Cada imóvel é visitado e avaliado antes de entrar na vitrine. Você só vê o que realmente combina com o seu momento.",
  },
  {
    number: "ii.",
    title: "Visitas sob medida",
    text: "Roteiro de visitas no seu horário, com ficha técnica de cada imóvel em mãos. Sem perder um sábado inteiro.",
  },
  {
    number: "iii.",
    title: "Negociação transparente",
    text: "Documentação conferida, valores claros e acompanhamento até a entrega das chaves.",
  },
];

export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pin = pinRef.current;
      const glow = glowRef.current;
      if (!section || !pin || !glow) return;

      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const words = gsap.utils.toArray<HTMLElement>(
          "[data-manifesto-word]",
          section,
        );
        const emphasis = gsap.utils.toArray<HTMLElement>(
          "[data-manifesto-emphasis]",
          section,
        );
        const pillars = gsap.utils.toArray<HTMLElement>(
          "[data-manifesto-pillar]",
          section,
        );

        gsap.set(words, { opacity: 0.12 });
        gsap.set(glow, { xPercent: -50, yPercent: -50 });

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${window.innerHeight * 2}`,
            pin,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(words, {
            opacity: 1,
            duration: 0.62,
            stagger: 0.055,
          })
          .to(
            emphasis,
            {
              color: "#c9a36b",
              fontVariationSettings: '"ital" 1',
              fontStyle: "italic",
              duration: 0.2,
              stagger: 0.04,
            },
            "-=0.12",
          )
          .from(
            pillars,
            {
              clipPath: "inset(100% 0% 0% 0%)",
              yPercent: 12,
              duration: 0.38,
              stagger: 0.08,
            },
            ">-0.02",
          );

        const glowX = gsap.quickTo(glow, "x", {
          duration: 0.9,
          ease: "power3.out",
        });
        const glowY = gsap.quickTo(glow, "y", {
          duration: 0.9,
          ease: "power3.out",
        });
        const onPointerMove = (event: PointerEvent) => {
          const rect = section.getBoundingClientRect();
          glowX(event.clientX - rect.left);
          glowY(event.clientY - rect.top);
        };

        section.addEventListener("pointermove", onPointerMove, { passive: true });
        return () => section.removeEventListener("pointermove", onPointerMove);
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="manifesto-title"
      className="manifesto-section"
      data-chapter="01"
      data-chapter-name="A arte de morar bem"
      id="capitulo-01"
    >
      <div ref={pinRef} className="manifesto-pin">
        <div ref={glowRef} aria-hidden="true" className="manifesto-glow" />
        <div className="site-container relative z-10">
          <SectionLabel>Capítulo 01 — A arte de morar bem</SectionLabel>
          <h2
            className="manifesto-statement"
            data-manifesto-copy
            id="manifesto-title"
          >
            {statement.map(({ word, emphasis }, index) => (
              <span
                key={`${word}-${index}`}
                data-manifesto-emphasis={emphasis ? "" : undefined}
                data-manifesto-word
              >
                {word}{" "}
              </span>
            ))}
          </h2>

          <div className="manifesto-beliefs">
            {beliefs.map((belief) => (
              <article
                key={belief.number}
                className="border-t border-current/20 pt-5 md:pr-6"
                data-manifesto-pillar
              >
                <span className="font-display text-xl italic text-bronze-light">
                  {belief.number}
                </span>
                <h3 className="mt-5 font-display text-[clamp(1.6rem,2.4vw,2.35rem)] font-light leading-tight tracking-[-0.025em]">
                  {belief.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-6 opacity-65 md:text-base">
                  {belief.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
