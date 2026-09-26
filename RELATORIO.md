# Relatório final — Aurora Residências, Fase 3

## Etapas

| Etapa | Status | Como testar |
|---|---|---|
| 1. Hero com vídeo | ⚠️ com fallback de asset | Limpe o `sessionStorage`, recarregue e confirme o reveal por linhas. Os vídeos ausentes ativam Ken Burns; quando adicionados, o IntersectionObserver pausa fora da viewport. |
| 2. Zoom no scroll | ✅ completo | Percorra as transições após os capítulos 00, 02 e 04; quadro, imagem e títulos devem responder continuamente ao scroll. |
| 3. Parallax em camadas | ✅ completo | Observe no capítulo 01 três velocidades/direções independentes. |
| 4. Galeria 3D | ✅ completo | Em desktop/WebGL, atravesse os seis imóveis e abra uma rota de detalhe. Em mobile/reduced-motion, use o carrossel scroll-snap. |
| 5. Três mundos | ✅ completo | Troque as três tabs por hover, toque e setas; confirme displacement ou wipe de fallback. |
| 6. Princípios | ⚠️ com fallback de asset | Passe mouse/foco nos seis cards; as fotos recuperam cor e movimento. MP4s serão usados automaticamente quando fornecidos. |
| 7. Mapa 3D | ✅ completo | Selecione os quatro bairros e confirme voo de câmera, pino ativo e card. Teste também o SVG em reduced-motion. |
| 8. Palavra do corretor | ✅ completo | Role pelo capítulo 06 e confirme o acendimento palavra a palavra. |
| 9. Polimento e consistência | ⚠️ Performance abaixo da meta | Navegação, consistência e acessibilidade estão implementadas. Lighthouse móvel final: Performance 64, Accessibility 97 e CLS 0,008. |

## Pendências

Os itens pendentes são os assets/conteúdos finais e a meta de Performance móvel. Não houve efeito abandonado por falha técnica. Consulte `PENDENCIAS.md` para os caminhos exatos e as três otimizações já tentadas.

## Decisões tomadas

- Mantivemos as alterações locais preexistentes e os componentes legados fora da composição final.
- Isolamos os três canvases WebGL e fornecemos fallbacks DOM/SVG completos.
- Declaramos `maath` diretamente para o damping da câmera.
- Detectamos assets locais no servidor para não produzir 404 no console.
- Removemos RGB, curvatura por velocidade e skew também do código legado.
- Não instalamos Playwright apenas para screenshots; o pacote não estava disponível.

## Resultado técnico final

| Comando | Resultado |
|---|---|
| `npm run build` | ✅ passou — 13 páginas estáticas, incluindo 6 rotas de imóveis |
| `npm run lint` | ✅ passou — zero erros |
| `npx tsc --noEmit` | ✅ passou — zero erros |

Playwright não estava instalado, portanto `docs/screenshots/` não foi gerado. As metas Lighthouse devem ser reconfirmadas no ambiente de deploy com os assets finais, pois peso e codec dos vídeos reais influenciam Performance e LCP.

### Lighthouse móvel local

| Métrica | Resultado | Meta |
|---|---:|---:|
| Performance | 64 | ≥ 80 — pendente |
| Accessibility | 97 | ≥ 95 — passou |
| CLS | 0,008 | < 0,05 — passou |
| LCP | 4,66s | diagnóstico adicional |
| TBT | 0,62s | diagnóstico adicional |

Relatório bruto: `docs/lighthouse-mobile.json`. O CLI gerou o arquivo, mas retornou `EPERM` ao limpar a pasta temporária do Chrome no Windows.

## Assets e textos a substituir

- `public/video/hero.mp4`
- `public/video/hero.webm`
- `public/images/hero-poster.webp`
- `public/video/principio-01.mp4` a `public/video/principio-06.mp4`
- `src/data/properties.ts` — fotos, preços, bairros, metragens, suítes e vagas
- `src/data/neighborhoods.ts` — nomes e contagens
- `src/components/sections/BrokerQuote.tsx` — depoimento, nome, CRECI e retrato
- `src/components/sections/Contact.tsx` — número de WhatsApp
- `src/components/layout/Header.tsx` e `src/components/layout/Footer.tsx` — CRECI, cidade e UF
- `src/app/page.tsx` — telefone, cidade, UF e faixa de preço do JSON-LD
