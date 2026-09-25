"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";
import type { ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useGSAP(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      anchors: { offset: -80 },
    });
    const update = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, []);

  return children;
}
