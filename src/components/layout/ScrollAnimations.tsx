"use client";

import { gsap, SplitText } from "@/lib/gsap";
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
