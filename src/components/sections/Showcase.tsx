"use client";

import { Button } from "@/components/ui/Button";
import {
  FilterPills,
  type PropertyFilter,
} from "@/components/ui/FilterPills";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { properties } from "@/data/properties";
import { Flip, gsap, ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useMemo, useRef, useState } from "react";

function matchesFilter(type: string, filter: PropertyFilter) {
  if (filter === "Todos") return true;
  if (filter === "Casas") return type === "Casa";
  if (filter === "Apartamentos") return type === "Apartamento";
  return type === "Cobertura";
}

export function Showcase() {
  const [filter, setFilter] = useState<PropertyFilter>("Todos");
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const flipState = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const visible = useMemo(
    () => properties.filter((property) => matchesFilter(property.type, filter)),
    [filter],
  );

  useGSAP(
    () => {
      if (!flipState.current || !trackRef.current) return;
      const cards = trackRef.current.querySelectorAll("[data-property-card]");

      Flip.from(flipState.current, {
        targets: cards,
        duration: 0.62,
        ease: "power2.inOut",
        absolute: true,
        stagger: 0.045,
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { autoAlpha: 0, scale: 0.94 },
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.45,
              stagger: 0.05,
              ease: "power3.out",
            },
          ),
        onComplete: () => ScrollTrigger.refresh(),
      });
      flipState.current = null;
    },
    { scope: trackRef, dependencies: [filter] },
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pin = pinRef.current;
      const viewport = viewportRef.current;
      const track = trackRef.current;
      const progress = progressRef.current;
      if (!section || !pin || !viewport || !track) return;

      const media = gsap.matchMedia();

      media.add(
        "(min-width: 64rem) and (min-height: 43.75rem) and (prefers-reduced-motion: no-preference)",
        () => {
          const cards = gsap.utils.toArray<HTMLElement>(
            "[data-orbit-card]",
            track,
          );
          if (!cards.length) return;

          let viewportWidth = 0;
          let cardCenters: number[] = [];

          const measure = () => {
            viewportWidth = viewport.clientWidth;
            cardCenters = cards.map(
              (card) => card.offsetLeft + card.offsetWidth / 2,
            );
          };

          const startX = () =>
            viewport.clientWidth * 0.58 - cards[0].offsetWidth / 2;
          const endX = () =>
            viewport.clientWidth * 0.42 -
            (track.scrollWidth - cards[cards.length - 1].offsetWidth / 2);

          const placeCardsOnOrbit = () => {
            const trackX = Number(gsap.getProperty(track, "x"));

            cards.forEach((card, index) => {
              const screenPosition =
                (trackX + cardCenters[index]) / viewportWidth;
              const visiblePosition = gsap.utils.clamp(0, 1, screenPosition);
              const proximity = gsap.utils.clamp(
                0,
                1,
                1 - Math.abs(screenPosition - 0.5) * 1.7,
              );
              const edgeVisibility = gsap.utils.clamp(
                0,
                1,
                Math.min(
                  (screenPosition + 0.08) * 4,
                  (1.08 - screenPosition) * 4,
                ),
              );
              const arc = Math.sin(visiblePosition * Math.PI);

              gsap.set(card, {
                y: 54 - arc * 92,
                rotation: (screenPosition - 0.5) * 8,
                scale: 0.86 + proximity * 0.14,
                autoAlpha: edgeVisibility,
                zIndex: Math.round(proximity * 10),
              });
            });
          };

          measure();
          gsap.set(track, { x: startX() });
          gsap.set(cards, { transformOrigin: "50% 52%" });
          gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
          placeCardsOnOrbit();

          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            onUpdate: placeCardsOnOrbit,
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => {
                const travel = Math.abs(endX() - startX());
                return `+=${Math.max(travel * 1.3, window.innerWidth * 1.15)}`;
              },
              pin,
              scrub: 0.85,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onRefreshInit: measure,
              onRefresh: placeCardsOnOrbit,
            },
          });

          timeline
            .fromTo(
              track,
              { x: startX },
              { x: endX, duration: 1, immediateRender: true },
              0,
            )
            .to(progress, { scaleX: 1, duration: 1 }, 0);

          return () => {
            gsap.set([track, ...cards, progress], { clearProps: "all" });
          };
        },
      );

      return () => media.revert();
    },
    {
      scope: sectionRef,
      dependencies: [filter],
      revertOnUpdate: true,
    },
  );

  const changeFilter = (nextFilter: PropertyFilter) => {
    if (nextFilter === filter || !trackRef.current) return;
    flipState.current = Flip.getState(
      trackRef.current.querySelectorAll("[data-property-card]"),
    );
    setFilter(nextFilter);
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="showcase-title"
      className="showcase-section section-space"
      id="imoveis"
    >
      <div ref={pinRef} className="showcase-pin">
        <div className="site-container relative z-20">
          <SectionLabel>01 — Vitrine</SectionLabel>
          <div className="flex min-w-0 flex-col items-start gap-7 md:flex-row md:items-end md:justify-between">
            <div>
              <h2
                className="showcase-title display-title max-w-3xl"
                data-reveal-title
                id="showcase-title"
              >
                Imóveis selecionados
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-6 text-muted md:text-base">
                Uma seleção que gira em torno do seu jeito de viver.
              </p>
            </div>
            <div className="w-full min-w-0 md:w-auto">
              <FilterPills active={filter} onChange={changeFilter} />
            </div>
          </div>
        </div>

        <div ref={viewportRef} className="showcase-orbit-viewport hide-scrollbar">
          <div aria-hidden="true" className="showcase-orbit-guide">
            <span className="showcase-orbit-ring showcase-orbit-ring--outer" />
            <span className="showcase-orbit-ring showcase-orbit-ring--inner" />
            <div className="showcase-orbit-core">
              <span>Aurora</span>
              <strong>360°</strong>
              <small>{String(visible.length).padStart(2, "0")} imóveis na rota</small>
            </div>
          </div>

          <div
            ref={trackRef}
            aria-live="polite"
            className="showcase-orbit-track"
          >
            {visible.map((property) => (
              <div
                key={property.id}
                className="showcase-orbit-card"
                data-filter-card
                data-orbit-card
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>

        <div className="site-container relative z-20 mt-8 flex items-center justify-between gap-6 lg:mt-0">
          <div
            aria-hidden="true"
            className="hidden min-w-0 flex-1 items-center gap-4 lg:flex"
          >
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
              Role para explorar
            </span>
            <span className="h-px min-w-10 max-w-52 flex-1 overflow-hidden bg-line">
              <span ref={progressRef} className="block h-full w-full bg-bronze" />
            </span>
          </div>
          <Button href="#contato" variant="outline">
            Ver todos os imóveis
          </Button>
        </div>
      </div>
    </section>
  );
}
