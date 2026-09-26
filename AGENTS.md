<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Aurora Residências — direção de design da Fase 3

## Princípio editorial

- A página é uma narrativa em oito capítulos, nunca um catálogo convencional.
- Luxo vem de fotografia, tipografia, ritmo e espaço em branco. Evite ornamentação gratuita.
- Preserve a paleta quente: areia `#F3EFE8`, tinta `#1A1814`, bronze `#8A5E26` e noite `#111014`.
- Títulos usam Fraunces 300; corpo usa Manrope. Labels de capítulo são caixa alta, pequenas e espaçadas.
- Não introduza roxo, azul saturado, gradiente “AI”, glassmorphism ou sombras genéricas.

## Movimento

- Easing espacial padrão: CustomEase `0.65, 0, 0.35, 1`, registrado como `aurora`.
- Revelações duram de `1.2s` a `1.6s`; hovers duram `0.6s`.
- Anime somente `transform`, `opacity` e `clip-path`; nunca anime largura, altura, top ou left.
- Use poucos movimentos, grandes e legíveis: zoom no scroll, parallax em três camadas e WebGL contextual.
- Proibidos: separação RGB, curvatura baseada em velocidade, skew de marquee e scramble de texto.
- Toda animação React deve viver em `useGSAP` e ser revertida no cleanup.
- SplitText deve rodar depois de `document.fonts.ready` e ser revertido ao desmontar.
- Lenis e ScrollTrigger compartilham o ticker GSAP; não crie um segundo loop de `requestAnimationFrame`.

## Acessibilidade e fallback

- `prefers-reduced-motion` desativa Lenis, autoplay, pins e WebGL, mantendo todo o conteúdo visível.
- Experiências WebGL precisam de fallback DOM/SVG completo, navegável por teclado.
- Controles interativos usam elementos semânticos, foco visível e nomes acessíveis.
- Imagens informativas exigem `alt` descritivo; imagens decorativas devem ser ocultas de leitores de tela.
- O cursor customizado tem apenas dois rótulos editoriais: `Ver` e `Explorar`.

## Performance

- Canvas usa `dpr={[1, 1.5]}` e pausa ou desmonta fora da área visível.
- Texturas devem ser WebP e ter no máximo 1600px quando forem substituídas pelos assets finais.
- Geometrias, materiais e texturas Three.js criados manualmente devem ser descartados no cleanup.
- Chame `ScrollTrigger.refresh()` após fontes e texturas estarem prontas.
- Meta: Lighthouse mobile Performance >= 80, Accessibility >= 95 e CLS < 0.05.

## Conteúdo e operação

- Não adicionar GTM, GA4 ou qualquer script de rastreamento.
- Assets ausentes usam os fallbacks documentados; nunca bloqueiam a página.
- Registre decisões não óbvias em `DECISOES.md`, falhas/fallbacks em `PENDENCIAS.md` e progresso em `CHECKLIST.md`.
- Antes de encerrar uma etapa, rode `npm run build`, `npm run lint` e `npx tsc --noEmit`.
