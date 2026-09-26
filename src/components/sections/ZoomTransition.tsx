"use client";

import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";

type ZoomTransitionProps = {
  from: string;
  to: string;
  nextChapter: string;
  leftWord: string;
  rightWord: string;
  image: string;
  alt: string;
};

export function ZoomTransition({
  from,
  to,
  nextChapter,
  leftWord,
  rightWord,
  image,
  alt,
}: ZoomTransitionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const pin = pinRef.current;
      const frame = frameRef.current;
      const imageLayer = imageRef.current;
      if (!section || !pin || !frame || !imageLayer) return;

      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const words = section.querySelectorAll<HTMLElement>("[data-zoom-word]");
        const opening = section.querySelector<HTMLElement>("[data-zoom-opening]");
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
            frame,
            { clipPath: "inset(32% 36% 32% 36% round 20px)" },
            { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1 },
            0,
          )
          .fromTo(imageLayer, { scale: 1.3 }, { scale: 1, duration: 1 }, 0)
          .to(words[0], { xPercent: -60, autoAlpha: 0, duration: 0.76 }, 0.08)
          .to(words[1], { xPercent: 60, autoAlpha: 0, duration: 0.76 }, 0.08)
          .fromTo(
            opening,
            { y: 42, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.28 },
            0.72,
          );

        return () => timeline.kill();
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-label={`Transição do capítulo ${from} para o capítulo ${to}`}
      className="zoom-transition"
    >
      <div ref={pinRef} className="zoom-transition-pin">
        <div ref={frameRef} className="zoom-transition-frame">
          <div ref={imageRef} className="zoom-transition-image">
            <Image src={image} alt={alt} fill sizes="100vw" className="object-cover" />
          </div>
          <div className="zoom-transition-shade" />
          <div className="zoom-transition-opening" data-zoom-opening>
            <span>Capítulo {to}</span>
            <strong>{nextChapter}</strong>
          </div>
        </div>
        <span className="zoom-transition-word zoom-transition-word--left" data-zoom-word>
          {leftWord}
        </span>
        <span className="zoom-transition-word zoom-transition-word--right" data-zoom-word>
          {rightWord}
        </span>
      </div>
    </section>
  );
}
