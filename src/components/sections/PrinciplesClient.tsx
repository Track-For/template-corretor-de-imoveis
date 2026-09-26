"use client";

import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useRef } from "react";

const principles = [
  {
    title: "Curadoria",
    text: "Visitamos e avaliamos cada endereço antes de apresentá-lo.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&fm=webp&w=1200&q=84",
  },
  {
    title: "Privacidade",
    text: "Conversas, visitas e decisões acontecem com a discrição necessária.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&fm=webp&w=1200&q=84",
  },
  {
    title: "Transparência",
    text: "Informação técnica e contexto de mercado sem atalhos ou ruído.",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&fm=webp&w=1200&q=84",
  },
  {
    title: "Visitas sob medida",
    text: "Roteiros pensados para a sua agenda e para o que realmente importa.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&fm=webp&w=1200&q=84",
  },
  {
    title: "Negociação segura",
    text: "Cada condição é conduzida com documentação e critérios claros.",
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&fm=webp&w=1200&q=84",
  },
  {
    title: "Pós-venda",
    text: "Seguimos presentes até que o novo endereço esteja plenamente seu.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&fm=webp&w=1200&q=84",
  },
] as const;

function setVideoState(card: HTMLElement, playing: boolean) {
  const video = card.querySelector("video");
  if (!video) return;
  if (playing) void video.play().catch(() => undefined);
  else {
    video.pause();
    video.currentTime = 0;
  }
}

export function PrinciplesClient({
  videoAvailability,
}: {
  videoAvailability: boolean[];
}) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(section.querySelectorAll("[data-principle-card]"), {
          clipPath: "inset(100% 0% 0% 0%)",
          y: 40,
          duration: 1.2,
          stagger: 0.1,
          ease: "aurora",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            once: true,
          },
        });
      });
      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="principles-title"
      className="principles-section"
      data-chapter="04"
      data-chapter-name="Nossos princípios"
      id="capitulo-04"
    >
      <div className="site-container">
        <div className="principles-heading">
          <p className="chapter-kicker">Capítulo 04</p>
          <h2 data-reveal-title id="principles-title">Nossos princípios</h2>
          <p>Seis compromissos que orientam cada conversa, visita e decisão.</p>
        </div>

        <div className="principles-grid">
          {principles.map((principle, index) => (
            <article
              key={principle.title}
              className="principle-card"
              data-principle-card
              onBlur={(event) => setVideoState(event.currentTarget, false)}
              onFocus={(event) => setVideoState(event.currentTarget, true)}
              onPointerEnter={(event) => setVideoState(event.currentTarget, true)}
              onPointerLeave={(event) => setVideoState(event.currentTarget, false)}
              tabIndex={0}
            >
              <div className="principle-media">
                {videoAvailability[index] ? (
                  <video aria-hidden="true" loop muted playsInline preload="metadata">
                    <source src={`/video/principio-0${index + 1}.mp4`} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={principle.image}
                    alt={`Atmosfera associada ao princípio ${principle.title}`}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 48vw, 92vw"
                    className="object-cover"
                  />
                )}
                <span className="principle-desaturate" aria-hidden="true" />
              </div>
              <div className="principle-copy">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
