import { SectionLabel } from "@/components/ui/SectionLabel";

const statement = [
  { word: "Não" },
  { word: "vendemos" },
  { word: "metros" },
  { word: "quadrados." },
  { word: "Abrimos" },
  { word: "a" },
  { word: "porta" },
  { word: "do" },
  { word: "próximo", emphasis: true },
  { word: "capítulo", emphasis: true },
  { word: "da" },
  { word: "sua" },
  { word: "história." },
];

const beliefs = [
  {
    number: "i.",
    title: "Curadoria, não catálogo",
    text: "Cada imóvel é visitado e avaliado antes de entrar na vitrine. Você só vê o que realmente combina com o seu momento.",
  },
  {
    number: "ii.",
    title: "Visitas sob medida",
    text: "Roteiro de visitas no seu horário, com ficha técnica de cada imóvel em mãos. Sem perder um sábado inteiro.",
  },
  {
    number: "iii.",
    title: "Negociação transparente",
    text: "Documentação conferida, valores claros e acompanhamento até a entrega das chaves.",
  },
];

export function Manifesto() {
  return (
    <section
      aria-labelledby="manifesto-title"
      className="bg-ink py-[clamp(6rem,12vw,11rem)] text-sand"
    >
      <div className="site-container">
        <SectionLabel>02 — Nossa crença</SectionLabel>
        <h2
          className="max-w-7xl font-display text-[clamp(3rem,6.7vw,7rem)] font-light leading-[1.02] tracking-[-0.045em]"
          data-manifesto-copy
          id="manifesto-title"
        >
          {statement.map(({ word, emphasis }, index) => (
            <span
              key={`${word}-${index}`}
              className={emphasis ? "italic text-bronze-light" : undefined}
              data-manifesto-word
            >
              {word}{" "}
            </span>
          ))}
        </h2>

        <div className="mt-24 grid gap-14 md:mt-32 md:grid-cols-3 md:gap-8">
          {beliefs.map((belief) => (
            <article
              key={belief.number}
              className="border-t border-sand/20 pt-6 md:pr-8"
            >
              <span className="font-display text-2xl italic text-bronze-light">
                {belief.number}
              </span>
              <h3 className="mt-8 font-display text-3xl font-light leading-tight tracking-[-0.025em]">
                {belief.title}
              </h3>
              <p className="mt-5 max-w-md text-[1.0625rem] leading-7 text-stone">
                {belief.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
