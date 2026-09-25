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
        <span
          key={neighborhood}
          className="flex shrink-0 items-center font-display text-[clamp(2rem,4vw,4rem)] font-light italic leading-none tracking-[-0.03em] text-muted"
        >
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
  return (
    <section aria-label="Bairros selecionados" className="site-container">
      <div className="marquee-shell overflow-hidden border-y border-line py-8 md:py-10">
        <div className="marquee-track">
          <MarqueeGroup />
          <MarqueeGroup hidden />
        </div>
      </div>
    </section>
  );
}
