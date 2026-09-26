"use client";

import { Button } from "@/components/ui/Button";
import { gsap, SplitText } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const fallbackImage =
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=90";

type HeroClientProps = {
  hasMp4: boolean;
  hasWebm: boolean;
  hasPoster: boolean;
};

export function HeroClient({ hasMp4, hasWebm, hasPoster }: HeroClientProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [motionAllowed, setMotionAllowed] = useState(false);
  const hasVideo = hasMp4 || hasWebm;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setMotionAllowed(!media.matches);
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video || !motionAllowed) {
      video?.pause();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) void video.play().catch(() => undefined);
        else video.pause();
      },
      { threshold: 0.12 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [motionAllowed]);

  useGSAP(
    () => {
      const title = titleRef.current;
      const section = sectionRef.current;
      if (!title || !section) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduced) return;

      let cancelled = false;
      let split: SplitText | null = null;
      let timeline: gsap.core.Timeline | null = null;

      const reveal = () => {
        if (cancelled || split) return;
        split = SplitText.create(title, {
          type: "lines",
          mask: "lines",
          linesClass: "hero-title-line",
        });
        timeline = gsap
          .timeline({ defaults: { ease: "aurora" } })
          .fromTo(
            split.lines,
            { yPercent: 110 },
            { yPercent: 0, duration: 1.4, stagger: 0.15 },
          )
          .fromTo(
            section.querySelectorAll("[data-hero-detail]"),
            { y: 24, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1.2, stagger: 0.1 },
            "-=0.95",
          );
      };

      const onReady = () => void document.fonts.ready.then(reveal);
      if (document.documentElement.dataset.auroraReady === "true") onReady();
      else window.addEventListener("aurora:ready", onReady, { once: true });

      return () => {
        cancelled = true;
        window.removeEventListener("aurora:ready", onReady);
        timeline?.kill();
        split?.revert();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="hero-section"
      data-chapter="00"
      data-chapter-name="Abertura"
      id="capitulo-00"
    >
      <div className="hero-media" data-hero-image>
        {/* TODO: adicionar public/video/hero.mp4, hero.webm e images/hero-poster.webp. */}
        <div className="hero-fallback">
          <Image
            src={hasPoster ? "/images/hero-poster.webp" : fallbackImage}
            alt="Sala contemporânea banhada pela luz do início da manhã"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        {hasVideo ? (
          <video
            ref={videoRef}
            aria-label="Arquitetura e interiores da coleção Aurora"
            autoPlay={motionAllowed}
            className="hero-video"
            loop
            muted
            playsInline
            poster={hasPoster ? "/images/hero-poster.webp" : undefined}
            preload="metadata"
          >
            {hasWebm ? <source src="/video/hero.webm" type="video/webm" /> : null}
            {hasMp4 ? <source src="/video/hero.mp4" type="video/mp4" /> : null}
          </video>
        ) : null}
        <div className="hero-overlay" />
      </div>

      <div className="site-container hero-content">
        <p className="chapter-kicker hero-kicker" data-hero-detail>
          Capítulo 00 — Abertura
        </p>
        <h1 ref={titleRef} className="hero-title" data-hero-title id="hero-title">
          Viva onde a luz
          <br />
          chega primeiro.
        </h1>
        <div className="hero-actions" data-hero-detail>
          <Button href="#contato" variant="light">
            Agendar visita
          </Button>
          <a className="hero-scroll-cue" href="#capitulo-01">
            <span>Role para descobrir</span>
            <i aria-hidden="true"><span /></i>
          </a>
        </div>
      </div>
    </section>
  );
}
