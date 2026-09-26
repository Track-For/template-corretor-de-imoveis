"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";

const chapters = [
  { number: "00", name: "Abertura", target: "#capitulo-00" },
  { number: "01", name: "A arte de morar bem", target: "#capitulo-01" },
  { number: "02", name: "A coleção", target: "#capitulo-02" },
  { number: "03", name: "Três mundos", target: "#capitulo-03" },
  { number: "04", name: "Nossos princípios", target: "#capitulo-04" },
  { number: "05", name: "Onde a luz chega", target: "#capitulo-05" },
  { number: "06", name: "Palavra do corretor", target: "#capitulo-06" },
  { number: "07", name: "Contato", target: "#contato" },
] as const;

type AuroraWindow = Window & {
  auroraLenis?: { scrollTo: (target: string | HTMLElement, options?: { offset?: number }) => void };
};

export function ChapterNavigation() {
  const rootRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      const progress = progressRef.current;
      if (!progress) return;
      const setProgress = gsap.quickSetter(progress, "scaleY");
      const triggers = chapters.flatMap((chapter, index) => {
        const section = document.querySelector<HTMLElement>(chapter.target);
        if (!section) return [];
        return ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      });
      const pageProgress = ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top top",
        end: "max",
        onUpdate: (self) => setProgress(self.progress),
        onRefresh: (self) => setProgress(self.progress),
      });

      return () => {
        triggers.forEach((trigger) => trigger.kill());
        pageProgress.kill();
      };
    },
    { scope: rootRef },
  );

  useGSAP(
    () => {
      const readout = readoutRef.current;
      if (!readout) return;
      gsap.fromTo(
        readout.children,
        { yPercent: 110 },
        { yPercent: 0, duration: 1.2, stagger: 0.05, ease: "aurora" },
      );
    },
    { scope: rootRef, dependencies: [activeIndex], revertOnUpdate: true },
  );

  useGSAP(
    () => {
      const menu = menuRef.current;
      if (!menu || !open) return;
      const timeline = gsap.timeline({ defaults: { ease: "aurora" } });
      timeline
        .fromTo(
          menu,
          { clipPath: "inset(0% 100% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2 },
        )
        .fromTo(
          menu.querySelectorAll("[data-chapter-link]"),
          { x: -28, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 1.2, stagger: 0.06 },
          "-=0.85",
        );
      return () => timeline.kill();
    },
    { scope: rootRef, dependencies: [open], revertOnUpdate: true },
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const goTo = (target: string) => {
    const lenis = (window as AuroraWindow).auroraLenis;
    if (lenis) lenis.scrollTo(target, { offset: 0 });
    else document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const activeChapter = chapters[activeIndex];

  return (
    <div ref={rootRef} className="chapter-nav">
      <span className="chapter-progress" aria-hidden="true">
        <span ref={progressRef} />
      </span>
      <button
        aria-controls="chapter-menu"
        aria-expanded={open}
        className="chapter-readout"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span ref={readoutRef} key={activeChapter.number}>
          <strong>{activeChapter.number}</strong>
          <i>—</i>
          <span>{activeChapter.name}</span>
        </span>
      </button>

      {open ? (
        <div ref={menuRef} className="chapter-menu" id="chapter-menu">
          <p>Navegação por capítulos</p>
          <nav aria-label="Capítulos">
            {chapters.map((chapter, index) => (
              <button
                key={chapter.number}
                aria-current={activeIndex === index ? "true" : undefined}
                data-chapter-link
                onClick={() => goTo(chapter.target)}
                type="button"
              >
                <span>{chapter.number}</span>
                <strong>{chapter.name}</strong>
              </button>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
