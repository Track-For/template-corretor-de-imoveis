"use client";

import type { Property } from "@/data/properties";
import { properties } from "@/data/properties";
import { gsap, SplitText } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const PropertyGalleryCanvas = dynamic(
  () => import("@/components/webgl/PropertyGalleryCanvas"),
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

function PropertyDetails({
  property,
  linked = true,
}: {
  property: Property;
  linked?: boolean;
}) {
  return (
    <>
      <p>{property.location.split("·")[0].trim()}</p>
      <h3 data-gallery-name>{property.name}</h3>
      <strong>{property.price}</strong>
      {linked ? (
        <Link href={`/imoveis/${property.slug}`}>Conhecer o imóvel</Link>
      ) : (
        <span className="property-gallery-card-link">Conhecer o imóvel</span>
      )}
    </>
  );
}

function GalleryFallback() {
  return (
    <div className="property-gallery-fallback hide-scrollbar">
      {properties.map((property) => (
        <article key={property.id} className="property-gallery-fallback-card">
          <Link href={`/imoveis/${property.slug}`} data-cursor="view">
            <div className="property-gallery-fallback-image">
              <Image
                src={property.image}
                alt={property.alt}
                fill
                sizes="(min-width: 768px) 48vw, 84vw"
                className="object-cover"
              />
            </div>
            <div className="property-gallery-fallback-copy">
              <PropertyDetails property={property} linked={false} />
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}

export function PropertyGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const [webglEnabled, setWebglEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 64rem)").matches;
    setWebglEnabled(desktop && !reduced && supportsWebGL());
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !webglEnabled) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "100% 0px", threshold: 0.01 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [webglEnabled]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || !webglEnabled) return;

      const trigger = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            progressRef.current = self.progress;
            const nextIndex = Math.min(
              properties.length - 1,
              Math.round(self.progress * (properties.length - 1)),
            );
            setActiveIndex((current) => (current === nextIndex ? current : nextIndex));
          },
        },
      });

      return () => trigger.kill();
    },
    { scope: sectionRef, dependencies: [webglEnabled] },
  );

  useGSAP(
    () => {
      const panel = panelRef.current;
      if (!panel || !webglEnabled) return;
      const name = panel.querySelector<HTMLElement>("[data-gallery-name]");
      if (!name) return;
      const split = SplitText.create(name, { type: "lines", mask: "lines" });
      const timeline = gsap.timeline({ defaults: { ease: "aurora" } });
      timeline
        .fromTo(split.lines, { yPercent: 110 }, { yPercent: 0, duration: 1.2 })
        .fromTo(
          panel.querySelectorAll("p,strong,a"),
          { y: 14, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.06 },
          "-=0.85",
        );
      return () => split.revert();
    },
    { scope: panelRef, dependencies: [activeIndex, webglEnabled], revertOnUpdate: true },
  );

  const property = properties[activeIndex];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="collection-title"
      className={`property-gallery ${webglEnabled ? "is-webgl" : "is-fallback"}`}
      data-chapter="02"
      data-chapter-name="A coleção"
      id="capitulo-02"
    >
      <div className="property-gallery-stage">
        <div className="property-gallery-heading">
          <p className="chapter-kicker">Capítulo 02</p>
          <h2 data-reveal-title id="collection-title">A coleção</h2>
          <span>{String(activeIndex + 1).padStart(2, "0")} / 06</span>
        </div>

        {webglEnabled && active ? (
          <div className="property-gallery-canvas" data-cursor="explore">
            <PropertyGalleryCanvas
              active={active}
              progressRef={progressRef}
              properties={properties}
            />
          </div>
        ) : !webglEnabled ? (
          <GalleryFallback />
        ) : (
          <div className="property-gallery-placeholder" aria-hidden="true">
            <Image
              src={properties[0].image}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}

        {webglEnabled && active ? (
          <div ref={panelRef} className="property-gallery-panel" aria-live="polite">
            <PropertyDetails property={property} />
          </div>
        ) : null}

        {webglEnabled && active ? (
          <p className="property-gallery-instruction">Role para atravessar a coleção</p>
        ) : null}
      </div>
    </section>
  );
}
