"use client";

import { Button } from "@/components/ui/Button";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const links = [
  { label: "Imóveis", href: "#imoveis" },
  { label: "Em destaque", href: "#destaque" },
  { label: "Como funciona", href: "#processo" },
  { label: "Sobre", href: "#corretor" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!headerRef.current) return;

      ScrollTrigger.create({
        trigger: document.documentElement,
        start: "top -24",
        end: "max",
        onUpdate: () => {
          headerRef.current?.classList.toggle("is-scrolled", window.scrollY > 24);
        },
      });
    },
    { scope: headerRef },
  );

  useGSAP(
    () => {
      if (!menuOpen || !menuRef.current) return;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) return;

      const timeline = gsap.timeline({ defaults: { ease: "expo.out" } });
      timeline
        .from(menuRef.current, {
          clipPath: "inset(0 0 100% 0)",
          duration: 0.72,
        })
        .from(
          menuRef.current.querySelectorAll("[data-menu-item]"),
          { y: 32, autoAlpha: 0, duration: 0.62, stagger: 0.08 },
          "-=0.38",
        );
    },
    { scope: menuRef, dependencies: [menuOpen] },
  );

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      className="site-header fixed inset-x-0 top-0 z-40 h-[var(--header-height)]"
    >
      <div className="site-container flex h-full items-center justify-between gap-8">
        <a
          aria-label="Aurora Residências, voltar ao início"
          className="relative z-50 flex shrink-0 flex-col leading-none"
          href="#topo"
          onClick={() => setMenuOpen(false)}
        >
          <span className="font-display text-[30px] font-normal tracking-[-0.04em]">
            Aurora
          </span>
          <span className="mt-1 text-[10px] font-bold tracking-[0.28em]">
            RESIDÊNCIAS
          </span>
        </a>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  className="nav-link text-sm font-semibold text-ink"
                  href={link.href}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button href="#contato" className="min-h-11 px-5 py-2">
            Agendar visita
          </Button>
        </div>

        <button
          aria-controls="menu-mobile"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          className="relative z-50 grid size-11 place-items-center rounded-full border border-ink/25 bg-sand text-ink lg:hidden"
          onClick={() => setMenuOpen((value) => !value)}
          type="button"
        >
          {menuOpen ? (
            <X aria-hidden="true" className="size-5" strokeWidth={1.8} />
          ) : (
            <Menu aria-hidden="true" className="size-5" strokeWidth={1.8} />
          )}
        </button>
      </div>

      {menuOpen ? (
        <div
          ref={menuRef}
          className="fixed inset-0 z-40 flex min-h-[100dvh] flex-col justify-between bg-bronze px-6 pb-8 pt-28 text-white lg:hidden"
          id="menu-mobile"
        >
          <nav aria-label="Navegação mobile">
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href} className="overflow-hidden" data-menu-item>
                  <a
                    className="block py-2 font-display text-[clamp(3rem,13vw,5.5rem)] font-light leading-[0.96] tracking-[-0.04em]"
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div data-menu-item>
            <Button
              href="#contato"
              variant="light"
              className="w-full"
            >
              Agendar visita
            </Button>
            <p className="mt-6 text-xs font-semibold tracking-[0.16em] text-white/75">
              CRECI [NÚMERO] · [Cidade - UF]
            </p>
          </div>
        </div>
      ) : null}
    </header>
  );
}
