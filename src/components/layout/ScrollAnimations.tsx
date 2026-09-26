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
      let cancelled = false;
      let initialized = false;

      const setup = () => {
        if (cancelled || initialized) return;
        initialized = true;
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
            duration: 1.2,
            stagger: 0.08,
            ease: "aurora",
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
            duration: 1.2,
            ease: "aurora",
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
            duration: 1.2,
            delay: index * 0.06,
            ease: "aurora",
            scrollTrigger: {
              trigger: line,
              start: "top 84%",
              once: true,
            },
          });
        });
        });
        ScrollTrigger.refresh();
      };

      const activate = () => void document.fonts.ready.then(setup);
      const events = ["wheel", "touchstart", "keydown"] as const;
      events.forEach((event) => window.addEventListener(event, activate, { once: true }));
      const fallbackTimer = window.setTimeout(activate, 8000);

      return () => {
        cancelled = true;
        window.clearTimeout(fallbackTimer);
        events.forEach((event) => window.removeEventListener(event, activate));
        splits.forEach((split) => split.revert());
        matchMedia.revert();
      };
    },
    { scope: root },
  );

  return <div ref={root}>{children}</div>;
}
