"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

const moments = [
  { at: 0, bg: "#F3E6D8", fg: "#1A1814" },
  { at: 0.26, bg: "#F3EFE8", fg: "#1A1814" },
  { at: 0.5, bg: "#EFE2CC", fg: "#1A1814" },
  { at: 0.73, bg: "#2A1D16", fg: "#F3E6D8" },
  { at: 1, bg: "#111014", fg: "#EDE6DA" },
] as const;

export function DayCycle() {
  useGSAP(() => {
    const root = document.documentElement;

    const paint = (progress: number) => {
      const nextIndex = moments.findIndex((moment) => moment.at >= progress);
      const upper = nextIndex <= 0 ? 1 : nextIndex;
      const lower = upper - 1;
      const from = moments[lower];
      const to = moments[upper];
      const local = gsap.utils.clamp(
        0,
        1,
        (progress - from.at) / Math.max(to.at - from.at, 0.0001),
      );

      root.style.setProperty("--bg", gsap.utils.interpolate(from.bg, to.bg, local));
      root.style.setProperty("--fg", gsap.utils.interpolate(from.fg, to.fg, local));
    };

    paint(0);
    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "max",
      onUpdate: (self) => paint(self.progress),
      onRefresh: (self) => paint(self.progress),
    });

    return () => trigger.kill();
  }, []);

  return null;
}
