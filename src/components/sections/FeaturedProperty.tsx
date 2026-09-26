"use client";

import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { featuredProperty } from "@/data/properties";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef, useState } from "react";

const countSpecs = [
  { key: "area", label: "Área privativa", value: featuredProperty.specs.area, suffix: " m²" },
  { key: "suites", label: "Suítes", value: featuredProperty.specs.suites, suffix: "" },
  { key: "parking", label: "Vagas", value: featuredProperty.specs.parking, suffix: "" },
] as const;

export function FeaturedProperty() {
  const sectionRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      const media = gsap.matchMedia();

      media.add(
        "(min-width: 48rem) and (prefers-reduced-motion: no-preference)",
        () => {
        const images = gsap.utils.toArray<HTMLElement>(
          "[data-featured-image]",
          section,
        );
        if (images.length < 3) return;

        gsap.set(images, { clipPath: "inset(100% 0% 0% 0%)", scale: 1 });
        gsap.set(images[0], { clipPath: "inset(0% 0% 0% 0%)" });

        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const next = Math.min(2, Math.floor(self.progress * 3));
              setCurrent((value) => (value === next ? value : next));
            },
          },
        });

        timeline
          .to(images[0], { scale: 1.1, duration: 1 }, 0)
          .to(images[1], { clipPath: "inset(0% 0% 0% 0%)", duration: 0.72 }, 0.45)
          .to(images[1], { scale: 1.1, duration: 1 }, 1)
          .to(images[2], { clipPath: "inset(0% 0% 0% 0%)", duration: 0.72 }, 1.45);

        gsap.utils.toArray<HTMLElement>("[data-count-to]", section).forEach((element) => {
          const target = Number(element.dataset.countTo ?? 0);
          const suffix = element.dataset.countSuffix ?? "";
          const counter = { value: 0 };
          gsap.to(counter, {
            value: target,
            duration: 1.45,
            ease: "power3.out",
            snap: { value: 1 },
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
              once: true,
            },
            onUpdate: () => {
              element.textContent = `${Math.round(counter.value)}${suffix}`;
            },
          });
        });
        },
      );

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="featured-title"
      className="featured-story"
      id="destaque"
    >
      <div className="site-container featured-story-grid">
        <div className="featured-gallery-sticky" data-cursor="drag">
          <div className="featured-gallery-frame">
            {featuredProperty.gallery.map((image, index) => (
              <div
                key={image.src}
                className="featured-gallery-image"
                data-featured-image
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 768px) 58vw, 100vw"
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
            <div className="featured-gallery-shade" />
          </div>

          <div aria-label={`Imagem ${current + 1} de 3`} className="featured-gallery-index">
            {featuredProperty.gallery.map((_, index) => (
              <span
                key={index}
                className={index === current ? "is-active" : undefined}
              >
                {index + 1}
              </span>
            ))}
          </div>
        </div>

        <div className="featured-copy-sticky">
          <SectionLabel>03 — Imóvel da semana</SectionLabel>
          <h2 className="display-title" id="featured-title">
            {featuredProperty.name}
          </h2>
          <p className="mt-7 max-w-xl text-[1.0625rem] leading-8 text-muted">
            {featuredProperty.description}
          </p>

          <dl className="mt-9 grid grid-cols-2 gap-x-7 gap-y-7 border-t border-line pt-7">
            {countSpecs.map((spec) => (
              <div key={spec.key}>
                <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                  {spec.label}
                </dt>
                <dd
                  className="mt-2 font-display text-3xl font-normal tabular-nums text-ink"
                  data-count-suffix={spec.suffix}
                  data-count-to={spec.value}
                >
                  {spec.value}
                  {spec.suffix}
                </dd>
              </div>
            ))}
            <div>
              <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                Valor
              </dt>
              <dd className="mt-2 font-display text-3xl font-normal text-ink">
                {featuredProperty.specs.price}
              </dd>
            </div>
          </dl>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
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
