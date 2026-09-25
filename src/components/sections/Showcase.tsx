"use client";

import { Button } from "@/components/ui/Button";
import {
  FilterPills,
  type PropertyFilter,
} from "@/components/ui/FilterPills";
import { PropertyCard } from "@/components/ui/PropertyCard";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { properties } from "@/data/properties";
import { Flip, gsap } from "@/lib/gsap";
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
  const gridRef = useRef<HTMLDivElement>(null);
  const flipState = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const visible = useMemo(
    () => properties.filter((property) => matchesFilter(property.type, filter)),
    [filter],
  );

  useGSAP(
    () => {
      if (!flipState.current || !gridRef.current) return;
      const cards = gridRef.current.querySelectorAll("[data-filter-card]");
      Flip.from(flipState.current, {
        targets: cards,
        duration: 0.62,
        ease: "power2.inOut",
        absolute: true,
        stagger: 0.045,
        onEnter: (elements) =>
          gsap.fromTo(
            elements,
            { autoAlpha: 0, y: 22 },
            { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.05 },
          ),
      });
      flipState.current = null;
    },
    { scope: gridRef, dependencies: [filter] },
  );

  const changeFilter = (nextFilter: PropertyFilter) => {
    if (nextFilter === filter || !gridRef.current) return;
    flipState.current = Flip.getState(
      gridRef.current.querySelectorAll("[data-filter-card]"),
    );
    setFilter(nextFilter);
  };

  return (
    <section
      aria-labelledby="showcase-title"
      className="section-space"
      id="imoveis"
    >
      <div className="site-container">
        <SectionLabel>01 — Vitrine</SectionLabel>
        <div className="mb-12 flex min-w-0 flex-col items-start gap-8 md:mb-16 md:flex-row md:items-end md:justify-between">
          <h2
            className="display-title max-w-3xl"
            data-reveal-title
            id="showcase-title"
          >
            Imóveis selecionados
          </h2>
          <div className="w-full min-w-0 md:w-auto">
            <FilterPills active={filter} onChange={changeFilter} />
          </div>
        </div>

        <div
          ref={gridRef}
          aria-live="polite"
          className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-7 lg:gap-y-20"
        >
          {visible.map((property) => (
            <div key={property.id} data-filter-card>
              <PropertyCard property={property} />
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center md:mt-20">
          <Button href="#contato" variant="outline">
            Ver todos os imóveis
          </Button>
        </div>
      </div>
    </section>
  );
}
