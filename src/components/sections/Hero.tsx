import { Button } from "@/components/ui/Button";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

const selects = [
  {
    id: "tipo",
    label: "Tipo",
    options: ["Todos os tipos", "Apartamento", "Casa", "Cobertura"],
  },
  {
    id: "bairro",
    label: "Bairro",
    options: ["Todos os bairros", "[Bairro 1]", "[Bairro 2]", "[Bairro 3]"],
  },
  {
    id: "valor",
    label: "Faixa de valor",
    options: ["Qualquer valor", "Até R$ [VALOR]", "R$ [VALOR] a R$ [VALOR]", "Acima de R$ [VALOR]"],
  },
];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="overflow-hidden pb-20 pt-[calc(var(--header-height)+3.5rem)] md:pb-32 md:pt-[calc(var(--header-height)+4rem)]"
      id="topo"
    >
      <div className="site-container">
        <div className="grid items-end gap-10 md:grid-cols-12 md:gap-y-14">
          <h1
            className="font-display text-[clamp(3.5rem,8.7vw,8.5rem)] font-light leading-[0.92] tracking-[-0.055em] text-ink md:col-span-9"
            data-hero-title
            id="hero-title"
          >
            Viva onde a luz
            <br />
            chega{" "}
            <em className="inline-block pb-2 font-light leading-[1.1] text-bronze">
              primeiro.
            </em>
          </h1>

          <div
            className="flex flex-col gap-7 md:col-span-3 md:pb-3"
            data-hero-copy
          >
            <p className="text-[1.0625rem] leading-7 text-muted">
              Uma curadoria de imóveis de alto padrão escolhidos um a um — para
              quem não quer ver cinquenta anúncios, e sim os cinco certos.
            </p>
            <a
              className="group flex size-[7.5rem] items-center justify-center gap-2 rounded-full border border-ink/30 text-center text-xs font-bold uppercase leading-5 tracking-[0.14em] transition-colors duration-300 hover:border-bronze hover:bg-bronze hover:text-white"
              href="#imoveis"
            >
              <span className="max-w-16">Role para descobrir</span>
              <ArrowDown
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-y-1"
                strokeWidth={1.8}
              />
            </a>
          </div>

          <div className="relative mt-3 md:col-span-12 md:mt-0 md:pb-10">
            <div
              className="parallax-frame relative h-[440px] overflow-hidden rounded-[30px] bg-line md:h-[640px]"
              data-hero-image
            >
              <div className="parallax-layer" data-parallax-layer>
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=88"
                  alt="Sala de estar contemporânea com pé-direito duplo e luz natural"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent" />
            </div>

            <form
              aria-label="Busca de imóveis"
              className="relative z-10 mx-3 -mt-10 grid gap-2 rounded-[26px] border border-white/60 bg-sand/95 p-3 shadow-[0_24px_70px_rgba(65,47,24,0.14)] backdrop-blur-xl md:absolute md:inset-x-8 md:bottom-0 md:mx-0 md:mt-0 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end md:p-4"
              data-hero-search
            >
              {selects.map((select) => (
                <label
                  key={select.id}
                  className="block rounded-[18px] px-4 py-3 transition-colors hover:bg-white/55"
                  htmlFor={select.id}
                >
                  <span className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                    {select.label}
                  </span>
                  <select
                    data-cursor="hide"
                    className="w-full appearance-none border-0 bg-transparent pr-6 text-sm font-semibold text-ink outline-none"
                    defaultValue={select.options[0]}
                    id={select.id}
                    name={select.id}
                  >
                    {select.options.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>
              ))}
              <Button
                href="#imoveis"
                variant="bronze"
                className="min-h-14 px-6 md:min-h-[62px]"
              >
                Buscar imóveis
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
