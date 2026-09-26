# Pendências — Fase 3

## Assets finais

- Hero: adicionar `public/video/hero.mp4`, `public/video/hero.webm` e `public/images/hero-poster.webp`. Enquanto ausentes, o fallback Ken Burns é usado.
- Princípios: adicionar `public/video/principio-01.mp4` até `public/video/principio-06.mp4`. Enquanto ausentes, os cards usam foto com zoom lento.
- Substituir as fotos remotas do Unsplash por fotos autorizadas do cliente em `src/data/properties.ts`, `HeroClient.tsx`, `Manifesto.tsx`, `WorldsSelector.tsx`, `PrinciplesClient.tsx` e `BrokerQuote.tsx`.

## Conteúdo final

- Preencher preços, metragens, suítes, vagas e bairros em `src/data/properties.ts`.
- Preencher bairros e contagens finais em `src/data/neighborhoods.ts`.
- Preencher nome, CRECI, depoimento e retrato em `src/components/sections/BrokerQuote.tsx`.
- Preencher telefone, cidade, UF e faixa de preço no JSON-LD de `src/app/page.tsx`.
- Preencher WhatsApp em `src/components/sections/Contact.tsx` e CRECI/cidade em `Header.tsx` e `Footer.tsx`.

Nenhum efeito atingiu o limite de três tentativas de correção; não há fallback motivado por falha técnica.

## Performance móvel

- Lighthouse local final: Performance **64**, Accessibility **97**, CLS **0,008**, LCP **4,66s** e TBT **0,62s**.
- A meta de Performance ≥ 80 ainda não foi atingida. Foram feitas três rodadas: isolamento/lazy mount dos canvases WebGL (peso caiu de 1,5 MB para 695 KB), redução do preloader e adiamento das animações abaixo da dobra.
- Próximo ganho provável: substituir as fotos remotas por WebP/AVIF locais dimensionados, definir o codec/peso dos vídeos finais e avaliar uma política de carregamento do GSAP/SplitText após o primeiro paint.
- O Lighthouse gera o relatório, mas encerra com `EPERM` ao tentar limpar sua pasta temporária do Chrome no Windows. O arquivo `docs/lighthouse-mobile.json` é válido.
