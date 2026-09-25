"use client";

import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import type { ReactNode } from "react";
import { useRef } from "react";

export function ScrollAnimations({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!root.current) return;

      const matchMedia = gsap.matchMedia();
      const splits: SplitText[] = [];

      matchMedia.add("(prefers-reduced-motion: no-preference)", () => {
        const heroTitle = root.current?.querySelector<HTMLElement>(
          "[data-hero-title]",
        );

        if (heroTitle) {
          const split = SplitText.create(heroTitle, {
            type: "lines",
            mask: "lines",
            linesClass: "hero-line",
          });
          splits.push(split);

          gsap
            .timeline({ defaults: { ease: "expo.out" } })
            .from(split.lines, {
              yPercent: 100,
              duration: 1.2,
              stagger: 0.12,
            })
            .from(
              "[data-hero-copy]",
              { autoAlpha: 0, y: 20, duration: 0.7 },
              "-=0.75",
            )
            .from(
              "[data-hero-image]",
              {
                clipPath: "inset(100% 0% 0% 0% round 30px)",
                duration: 1.25,
              },
              "-=0.72",
            )
            .from(
              "[data-hero-search]",
              { autoAlpha: 0, y: 24, duration: 0.72 },
              "-=0.55",
            );
        }

        gsap.utils.toArray<HTMLElement>("[data-reveal-title]").forEach((title) => {
          const split = SplitText.create(title, {
            type: "lines",
            mask: "lines",
            linesClass: "reveal-line",
          });
          splits.push(split);
          gsap.from(split.lines, {
            yPercent: 105,
            duration: 0.9,
            stagger: 0.08,
            ease: "expo.out",
            scrollTrigger: {
              trigger: title,
              start: "top 80%",
              once: true,
            },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal-label]").forEach((label) => {
          gsap.from(label, {
            autoAlpha: 0,
            y: 12,
            duration: 0.55,
            ease: "power3.out",
            scrollTrigger: {
              trigger: label,
              start: "top 84%",
              once: true,
            },
          });
        });

        ScrollTrigger.batch("[data-property-card]", {
          start: "top 88%",
          once: true,
          onEnter: (cards) =>
            gsap.from(cards, {
              autoAlpha: 0,
              y: 40,
              duration: 0.72,
              stagger: 0.09,
              ease: "power3.out",
            }),
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax-layer]").forEach((layer) => {
          gsap.fromTo(
            layer,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: layer.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });

        const words = gsap.utils.toArray<HTMLElement>("[data-manifesto-word]");
        if (words.length) {
          gsap.fromTo(
            words,
            { opacity: 0.2 },
            {
              opacity: 1,
              stagger: 0.08,
              ease: "none",
              scrollTrigger: {
                trigger: "[data-manifesto-copy]",
                start: "top 78%",
                end: "bottom 48%",
                scrub: true,
              },
            },
          );
        }

        gsap.utils.toArray<HTMLElement>("[data-process-line]").forEach((line, index) => {
          gsap.from(line, {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.85,
            delay: index * 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: line,
              start: "top 84%",
              once: true,
            },
          });
        });
      });

      return () => {
        splits.forEach((split) => split.revert());
        matchMedia.revert();
      };
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
