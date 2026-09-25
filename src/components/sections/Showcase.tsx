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
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const flipState = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const visible = useMemo(
    () => properties.filter((property) => matchesFilter(property.type, filter)),
    [filter],
  );

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!flipState.current || !track) return;
      const cards = track.querySelectorAll("[data-filter-card]");

      Flip.from(flipState.current, {
        targets: cards,
        duration: 0.7,
        ease: "aurora",
        absolute: true,
        stagger: 0.055,
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { autoAlpha: 0, scale: 0.9 },
            {
              autoAlpha: 1,
              scale: 1,
              duration: 0.55,
              stagger: 0.06,
              ease: "aurora",
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
      const track = trackRef.current;
      const progress = progressRef.current;
      if (!section || !track || !progress) return;

      const media = gsap.matchMedia();
      media.add(
        "(min-width: 64rem) and (prefers-reduced-motion: no-preference)",
        () => {
          const cards = gsap.utils.toArray<HTMLElement>(
            "[data-filter-card]",
            track,
          );
          const travel = () => Math.max(0, track.scrollWidth - window.innerWidth + window.innerWidth * 0.08);
          const setProgress = gsap.quickSetter(progress, "scaleX");

          const horizontalTween = gsap.to(track, {
            x: () => -travel(),
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${Math.max(travel() * 1.15, window.innerWidth)}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                setProgress(self.progress);
                const next = Math.min(
                  cards.length - 1,
                  Math.max(0, Math.round(self.progress * (cards.length - 1))),
                );
                setActiveIndex((current) => (current === next ? current : next));
              },
            },
          });

          cards.forEach((card) => {
            const image = card.querySelector<HTMLElement>("[data-card-parallax]");
            if (!image) return;
            gsap.fromTo(
              image,
              { xPercent: -15 },
              {
                xPercent: 15,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: horizontalTween,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              },
            );
          });

          return () => {
            setActiveIndex(0);
            gsap.set([track, progress], { clearProps: "all" });
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
    const track = trackRef.current;
    if (nextFilter === filter || !track) return;
    flipState.current = Flip.getState(
      track.querySelectorAll("[data-filter-card]"),
    );
    setActiveIndex(0);
    setFilter(nextFilter);
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="showcase-title"
      className="showcase-horizontal-section"
      id="imoveis"
    >
      <div className="showcase-horizontal-stage">
        <div className="showcase-horizontal-intro">
          <SectionLabel>01 — Vitrine</SectionLabel>
          <h2 className="showcase-horizontal-title" id="showcase-title">
            Imóveis selecionados
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-6 text-muted">
            Uma seleção enxuta. Cada imóvel escolhido pela luz, pela arquitetura
            e pelo modo como acolhe a vida.
          </p>
          <div className="mt-7 min-w-0">
            <FilterPills active={filter} onChange={changeFilter} />
          </div>

          <div className="mt-auto hidden items-end justify-between gap-5 pt-8 lg:flex">
            <p className="font-display text-3xl font-light tabular-nums text-ink">
              {String(activeIndex + 1).padStart(2, "0")}
              <span className="mx-2 text-base text-muted">/</span>
              <span className="text-base text-muted">
                {String(visible.length).padStart(2, "0")}
              </span>
            </p>
            <Button href="#contato" variant="outline" className="px-5">
              Ver todos
            </Button>
          </div>
        </div>

        <div
          className="showcase-horizontal-viewport hide-scrollbar"
          data-cursor="drag"
        >
          <div ref={trackRef} aria-live="polite" className="showcase-horizontal-track">
            {visible.map((property) => (
              <div
                key={property.id}
                className="showcase-horizontal-card"
                data-filter-card
              >
                <PropertyCard property={property} variant="showcase" />
              </div>
            ))}
          </div>
        </div>

        <div aria-hidden="true" className="showcase-progress">
          <span ref={progressRef} />
        </div>
      </div>
    </section>
  );
}
