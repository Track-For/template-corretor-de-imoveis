"use client";

import { neighborhoods } from "@/data/neighborhoods";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const CityMapCanvas = dynamic(
  () => import("@/components/webgl/CityMapCanvas"),
  { ssr: false },
);

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function MapFallback({ activeIndex }: { activeIndex: number }) {
  return (
    <svg
      aria-label="Mapa esquemático dos bairros atendidos"
      className="city-map-svg"
      role="img"
      viewBox="0 0 800 620"
    >
      <rect width="800" height="620" fill="#111014" />
      {Array.from({ length: 12 }, (_, index) => (
        <path
          key={`road-${index}`}
          d={`M ${60 + index * 62} 0 L ${20 + index * 68} 620`}
          fill="none"
          stroke="#2b2925"
          strokeWidth="18"
        />
      ))}
      {Array.from({ length: 9 }, (_, index) => (
        <path
          key={`cross-${index}`}
          d={`M 0 ${55 + index * 68} L 800 ${30 + index * 70}`}
          fill="none"
          stroke="#24221f"
          strokeWidth="12"
        />
      ))}
      {neighborhoods.map((neighborhood, index) => (
        <g
          key={neighborhood.id}
          transform={`translate(${400 + neighborhood.x * 22} ${310 + neighborhood.z * 22})`}
        >
          <circle
            r={activeIndex === index ? 22 : 12}
            fill="#c9954d"
            opacity={activeIndex === index ? 0.34 : 0.18}
          />
          <circle r={activeIndex === index ? 8 : 5} fill="#f0bd72" />
        </g>
      ))}
    </svg>
  );
}

export function CityMap() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [webglEnabled, setWebglEnabled] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setWebglEnabled(!reduced && supportsWebGL());
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !webglEnabled) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "20% 0px", threshold: 0.01 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [webglEnabled]);

  const selected = neighborhoods[activeIndex];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="map-title"
      className="city-map-section"
      data-chapter="05"
      data-chapter-name="Onde a luz chega"
      id="capitulo-05"
    >
      <div className="site-container city-map-heading">
        <p className="chapter-kicker">Capítulo 05</p>
        <h2 id="map-title">Onde a luz chega</h2>
      </div>

      <div className="city-map-layout">
        <nav aria-label="Bairros da coleção" className="city-map-list">
          {neighborhoods.map((neighborhood, index) => (
            <button
              key={neighborhood.id}
              aria-pressed={activeIndex === index}
              onClick={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              type="button"
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{neighborhood.name}</strong>
              <small>{neighborhood.count} imóveis</small>
            </button>
          ))}
        </nav>

        <div className="city-map-viewport">
          {webglEnabled ? (
            <CityMapCanvas active={active} activeIndex={activeIndex} />
          ) : (
            <MapFallback activeIndex={activeIndex} />
          )}
          <aside className="city-map-card" aria-live="polite">
            <span>Bairro selecionado</span>
            <strong>{selected.name}</strong>
            <p>{selected.count} imóveis disponíveis</p>
            <a href="#capitulo-02">Ver imóveis</a>
          </aside>
        </div>
      </div>
    </section>
  );
}
