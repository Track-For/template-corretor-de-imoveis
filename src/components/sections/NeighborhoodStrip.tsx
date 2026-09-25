"use client";

import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const neighborhoods = [
  "[Bairro 1]",
  "[Bairro 2]",
  "[Bairro 3]",
  "[Bairro 4]",
  "[Bairro 5]",
  "[Bairro 6]",
];

function MarqueeGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden} className="flex shrink-0 items-center">
      {neighborhoods.map((neighborhood) => (
        <span key={neighborhood} className="marquee-name">
          {neighborhood}
          <span className="mx-6 text-[0.52em] not-italic text-bronze-light md:mx-10">
            ✦
          </span>
        </span>
      ))}
    </div>
  );
}

export function NeighborhoodStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const primaryRef = useRef<HTMLDivElement>(null);
  const reverseRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const primary = primaryRef.current;
      const reverse = reverseRef.current;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (!primary || !reverse || reduced) return;

      const primaryLoop = gsap.fromTo(
        primary,
        { xPercent: 0 },
        {
          xPercent: -50,
          duration: 34,
          repeat: -1,
          ease: "none",
          modifiers: { xPercent: gsap.utils.wrap(-50, 0) },
        },
      );
      const reverseLoop = gsap.fromTo(
        reverse,
        { xPercent: -50 },
        {
          xPercent: 0,
          duration: 39,
          repeat: -1,
          ease: "none",
          modifiers: { xPercent: gsap.utils.wrap(-50, 0) },
        },
      );
      const primarySpeed = gsap.quickTo(primaryLoop, "timeScale", {
        duration: 0.42,
        ease: "power2.out",
      });
      const reverseSpeed = gsap.quickTo(reverseLoop, "timeScale", {
        duration: 0.42,
        ease: "power2.out",
      });
      const primarySkew = gsap.quickTo(primary, "skewX", {
        duration: 0.35,
        ease: "power3.out",
      });
      const reverseSkew = gsap.quickTo(reverse, "skewX", {
        duration: 0.35,
        ease: "power3.out",
      });
      let direction = 1;

      const update = () => {
        const lenis = (
          window as unknown as {
            auroraLenis?: { velocity?: number; direction?: number };
          }
        ).auroraLenis;
        const velocity = lenis?.velocity ?? 0;
        if (Math.abs(velocity) > 0.08) direction = velocity < 0 ? -1 : 1;
        const multiplier = direction * (1 + Math.min(Math.abs(velocity) * 0.1, 4));
        const skew = gsap.utils.clamp(-12, 12, velocity * 0.32);

        primarySpeed(multiplier);
        reverseSpeed(multiplier);
        primarySkew(skew);
        reverseSkew(-skew);
      };

      gsap.ticker.add(update);
      return () => {
        gsap.ticker.remove(update);
        primaryLoop.kill();
        reverseLoop.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Bairros selecionados"
      className="site-container overflow-hidden py-3"
    >
      <div className="marquee-shell border-y border-line py-6 md:py-8">
        <div ref={primaryRef} className="marquee-track">
          <MarqueeGroup />
          <MarqueeGroup hidden />
        </div>
        <div
          ref={reverseRef}
          aria-hidden="true"
          className="marquee-track marquee-track--outline mt-3 md:mt-5"
        >
          <MarqueeGroup hidden />
          <MarqueeGroup hidden />
        </div>
      </div>
    </section>
  );
}
