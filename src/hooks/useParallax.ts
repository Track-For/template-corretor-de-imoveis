"use client";

import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import type { RefObject } from "react";

type ParallaxOptions = {
  speed?: number;
};

export function useParallax(
  ref: RefObject<HTMLElement | null>,
  { speed = 1 }: ParallaxOptions = {},
) {
  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const layers = gsap.utils.toArray<HTMLElement>("[data-speed]", root);

        layers.forEach((layer) => {
          const layerSpeed = Number(layer.dataset.speed ?? speed);
          const trigger = layer.closest<HTMLElement>("[data-parallax-frame]") ?? root;

          if (layer.hasAttribute("data-parallax-image")) {
            gsap.fromTo(
              layer,
              { yPercent: -10 * layerSpeed },
              {
                yPercent: 10 * layerSpeed,
                ease: "none",
                scrollTrigger: {
                  trigger,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              },
            );
            return;
          }

          gsap.fromTo(
            layer,
            { y: 0 },
            {
              y: -80 * layerSpeed,
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            },
          );
        });
      });

      return () => media.revert();
    },
    { scope: ref },
  );
}
