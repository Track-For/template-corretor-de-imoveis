import { SectionLabel } from "@/components/ui/SectionLabel";

const steps = [
  {
    number: "01",
    title: "Conversa inicial",
    text: "Entendemos sua rotina, família e planos para os próximos anos.",
  },
  {
    number: "02",
    title: "Curadoria personalizada",
    text: "Você recebe uma seleção enxuta de imóveis que fazem sentido para você.",
  },
  {
    number: "03",
    title: "Visitas guiadas",
    text: "Roteiro otimizado, com todas as informações técnicas em mãos.",
  },
  {
    number: "04",
    title: "Negociação e chaves",
    text: "Proposta, documentação e contrato acompanhados de perto até o fim.",
  },
];

export function Process() {
  return (
    <section
      aria-labelledby="process-title"
      className="section-space border-y border-line"
      id="processo"
    >
      <div className="site-container">
        <SectionLabel>04 — Como funciona</SectionLabel>
        <h2
          className="display-title max-w-4xl text-balance"
          data-reveal-title
          id="process-title"
        >
          Do primeiro café à entrega das chaves
        </h2>

        <ol className="mt-16 grid gap-12 md:mt-24 md:grid-cols-2 md:gap-x-8 md:gap-y-16 xl:grid-cols-4">
          {steps.map((step) => (
            <li key={step.number} className="relative pt-7">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-bronze"
                data-process-line
              />
              <span className="font-display text-[4.75rem] font-light leading-none tracking-[-0.05em] text-bronze">
                {step.number}
              </span>
              <h3 className="mt-8 font-display text-[1.8rem] font-normal leading-tight tracking-[-0.025em]">
                {step.title}
              </h3>
              <p className="mt-4 max-w-sm text-base leading-7 text-muted">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
