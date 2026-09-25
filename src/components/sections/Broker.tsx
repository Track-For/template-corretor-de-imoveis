import { SectionLabel } from "@/components/ui/SectionLabel";
import Image from "next/image";

export function Broker() {
  return (
    <section
      aria-labelledby="broker-title"
      className="section-space"
      id="corretor"
    >
      <div className="site-container grid items-center gap-12 md:grid-cols-12 md:gap-14 lg:gap-20">
        <div className="parallax-frame h-[560px] rounded-[30px] bg-line md:col-span-5 md:h-[720px]">
          <div className="parallax-layer" data-parallax-layer>
            <Image
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=86"
              alt="Retrato profissional do corretor responsável pela Aurora Residências"
              fill
              sizes="(min-width: 768px) 42vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        <div className="md:col-span-7 md:pl-[4vw]">
          <SectionLabel>05 — Quem cuida de você</SectionLabel>
          <h2
            className="display-title"
            data-reveal-title
            id="broker-title"
          >
            [Nome do corretor]
          </h2>
          <p className="mt-8 max-w-2xl text-[1.0625rem] leading-8 text-muted">
            [Bio do corretor: trajetória, especialização, conhecimento da região
            e a forma pessoal de acompanhar cada cliente do primeiro contato à
            entrega das chaves.]
          </p>

          <figure className="mt-12 max-w-2xl border-l-2 border-bronze pl-7 md:mt-16 md:pl-10">
            <blockquote className="font-display text-[clamp(1.75rem,3.3vw,3rem)] font-light italic leading-[1.18] tracking-[-0.025em] text-ink">
              “ [Depoimento real de um cliente, com autorização.] ”
            </blockquote>
            <figcaption className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-muted">
              [Nome do cliente] — CRECI [NÚMERO]
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
