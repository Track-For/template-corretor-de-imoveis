"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";
import { useParallax } from "@/hooks/useParallax";
import Image from "next/image";
import { useRef } from "react";

export function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  useParallax(sectionRef, { speed: 1 });

  return (
    <section
      ref={sectionRef}
      aria-labelledby="manifesto-title"
      className="chapter-manifesto"
      data-chapter="01"
      data-chapter-name="A arte de morar bem"
      id="capitulo-01"
    >
      <span
        aria-hidden="true"
        className="chapter-outline-number"
        data-parallax-decor
        data-speed="-0.65"
      >
        01
      </span>

      <div className="site-container chapter-manifesto-grid">
        <div className="chapter-manifesto-copy" data-speed="1" data-parallax-title>
          <SectionLabel>Capítulo 01 — A arte de morar bem</SectionLabel>
          <h2 className="chapter-manifesto-title" data-reveal-title id="manifesto-title">
            Uma casa não começa na planta.
          </h2>
          <p>
            Começa no modo como a luz atravessa a manhã, no silêncio entre os
            ambientes e na sensação de que cada escolha foi feita para durar.
            Nossa curadoria procura isso antes de procurar números.
          </p>
        </div>

        <figure className="chapter-manifesto-media" data-parallax-frame>
          <div className="chapter-manifesto-image" data-parallax-image data-speed="1">
            <Image
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=88"
              alt="Interior residencial de materiais naturais iluminado pelo sol"
              fill
              sizes="(min-width: 768px) 44vw, 92vw"
              className="object-cover"
            />
          </div>
          <figcaption>Arquitetura que acolhe antes de impressionar.</figcaption>
        </figure>
      </div>
    </section>
  );
}
