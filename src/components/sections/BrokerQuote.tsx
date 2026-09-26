"use client";

import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";

const quote =
  "[Depoimento ou frase do corretor sobre sua filosofia de trabalho.]";

export function BrokerQuote() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const words = section.querySelectorAll<HTMLElement>("[data-quote-word]");
        gsap.fromTo(
          words,
          { opacity: 0.15 },
          {
            opacity: 1,
            stagger: 0.08,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 45%",
              end: "bottom 75%",
              scrub: 1,
            },
          },
        );
      });
      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="broker-quote"
      className="broker-quote-section"
      data-chapter="06"
      data-chapter-name="Palavra do corretor"
      id="capitulo-06"
    >
      <div className="site-container broker-quote-sticky">
        <p className="chapter-kicker">Capítulo 06 — Palavra do corretor</p>
        <blockquote id="broker-quote">
          <span className="sr-only">“{quote}”</span>
          <span aria-hidden="true" className="broker-quote-words">
            <span>“</span>
            {quote.split(" ").map((word, index) => (
              <span key={`${word}-${index}`} data-quote-word>
                {word}{" "}
              </span>
            ))}
            <span>”</span>
          </span>
        </blockquote>

        <div className="broker-signature">
          <div className="broker-avatar">
            <Image
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&fm=webp&w=320&q=86"
              alt="Retrato de [Nome do corretor]"
              fill
              sizes="72px"
              className="object-cover"
            />
          </div>
          <p>
            <strong>[Nome do corretor]</strong>
            <span>CRECI [NÚMERO]</span>
          </p>
        </div>
      </div>
    </section>
  );
}
