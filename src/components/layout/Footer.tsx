import { ArrowUpRight } from "lucide-react";

const footerLinks = [
  { label: "Coleção", href: "#capitulo-02" },
  { label: "Três mundos", href: "#capitulo-03" },
  { label: "Princípios", href: "#capitulo-04" },
  { label: "Bairros", href: "#capitulo-05" },
  { label: "Contato", href: "#contato" },
];

export function Footer() {
  return (
    <footer className="site-footer bg-ink text-sand">
      <div className="site-container pb-8 pt-20 md:pt-28">
        <div className="grid gap-16 border-b border-sand/15 pb-16 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <a
              className="inline-flex flex-col"
              href="#capitulo-00"
            >
              <span className="font-display text-[clamp(4.5rem,11vw,10.5rem)] font-light leading-[0.72] tracking-[-0.06em]">
                Aurora
              </span>
              <span className="mt-5 text-[11px] font-bold tracking-[0.42em] text-bronze-light md:pl-2">
                RESIDÊNCIAS
              </span>
            </a>
          </div>

          <div className="md:col-span-4 md:justify-self-end">
            <p className="mb-6 text-xs font-bold tracking-[0.18em] text-stone">
              CRECI [NÚMERO] · [Cidade - UF]
            </p>
            <nav aria-label="Navegação do rodapé">
              <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm font-semibold">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      className="inline-flex items-center gap-1.5 transition-colors hover:text-bronze-light"
                      href={link.href}
                    >
                      {link.label}
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-3.5"
                        strokeWidth={1.8}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-7 text-xs font-medium text-stone md:flex-row md:items-center md:justify-between">
          <p>© 2026 Aurora Residências</p>
          <a className="transition-colors hover:text-sand" href="#privacidade">
            Política de privacidade
          </a>
        </div>
      </div>
    </footer>
  );
}
