"use client";

import { properties, type PropertyType } from "@/data/properties";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

const WorldsMediaCanvas = dynamic(
  () => import("@/components/webgl/WorldsMediaCanvas"),
  { ssr: false },
);

const worlds = [
  {
    label: "Casas",
    type: "Casa" as PropertyType,
    description:
      "Jardins, silêncio e arquitetura que aproxima o interior da paisagem.",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&fm=webp&w=1600&q=88",
  },
  {
    label: "Apartamentos",
    type: "Apartamento" as PropertyType,
    description:
      "Vistas abertas e plantas generosas no ritmo certo para a vida urbana.",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&fm=webp&w=1600&q=88",
  },
  {
    label: "Coberturas",
    type: "Cobertura" as PropertyType,
    description:
      "Horizonte, privacidade e áreas externas que mudam a escala do cotidiano.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&fm=webp&w=1600&q=88",
  },
] as const;

const worldImages = worlds.map((world) => world.image);

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function WorldsSelector() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [webglEnabled, setWebglEnabled] = useState(false);
  const [nearViewport, setNearViewport] = useState(false);
  const mediaRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setWebglEnabled(!reduced && supportsWebGL());
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNearViewport(entry.isIntersecting),
      { rootMargin: "100% 0px", threshold: 0.01 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      const media = mediaRef.current;
      if (!media || webglEnabled || !nearViewport) return;
      const images = media.querySelectorAll<HTMLElement>("[data-world-image]");
      images.forEach((image, index) => {
        gsap.set(image, {
          clipPath: index === activeIndex ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
          zIndex: index === activeIndex ? 2 : 1,
        });
      });
      gsap.fromTo(
        images[activeIndex],
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "aurora" },
      );
    },
    {
      scope: mediaRef,
      dependencies: [activeIndex, nearViewport, webglEnabled],
      revertOnUpdate: true,
    },
  );

  const select = (index: number) => setActiveIndex(index);
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
    const next = (index + direction + worlds.length) % worlds.length;
    select(next);
    tabRefs.current[next]?.focus();
  };

  const activeWorld = worlds[activeIndex];
  const count = properties.filter((property) => property.type === activeWorld.type).length;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="worlds-title"
      className="worlds-section"
      data-chapter="03"
      data-chapter-name="Três mundos"
      id="capitulo-03"
    >
      <div className="site-container worlds-grid">
        <div className="worlds-tabs-wrap">
          <p className="chapter-kicker">Capítulo 03 — Três mundos</p>
          <h2 className="sr-only" id="worlds-title">Três mundos para morar</h2>
          <div aria-label="Tipos de imóvel" className="worlds-tabs" role="tablist">
            {worlds.map((world, index) => (
              <button
                key={world.label}
                ref={(element) => { tabRefs.current[index] = element; }}
                aria-controls="world-panel"
                aria-selected={activeIndex === index}
                id={`world-tab-${index}`}
                onClick={() => select(index)}
                onFocus={() => select(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
                onMouseEnter={() => select(index)}
                role="tab"
                tabIndex={activeIndex === index ? 0 : -1}
                type="button"
              >
                <span>{world.label}</span>
                {activeIndex === index ? (
                  <small>{String(index + 1).padStart(2, "0")}/03</small>
                ) : null}
              </button>
            ))}
          </div>
        </div>

        <div className="worlds-media-column">
          <div ref={mediaRef} className="worlds-media" data-cursor="view">
            {webglEnabled && nearViewport ? (
              <WorldsMediaCanvas
                activeIndex={activeIndex}
                images={worldImages}
              />
            ) : (
              worlds.map((world) => (
                <div key={world.label} className="worlds-fallback-image" data-world-image>
                  <Image
                    src={world.image}
                    alt={`${world.label} da coleção Aurora`}
                    fill
                    sizes="(min-width: 768px) 52vw, 92vw"
                    className="object-cover"
                  />
                </div>
              ))
            )}
          </div>
          <div
            aria-labelledby={`world-tab-${activeIndex}`}
            className="worlds-panel"
            id="world-panel"
            role="tabpanel"
          >
            <p>{activeWorld.description}</p>
            <a href="#capitulo-02">Ver {count} imóveis</a>
          </div>
        </div>
      </div>
    </section>
  );
}
