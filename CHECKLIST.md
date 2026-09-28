# Checklist — Fase 3 “Sobha Privy”

| Etapa | Status | Como testar |
|---|---|---|
| 1. Hero com vídeo | ⚠️ Fallback ativo | Abra `/`, limpe `sessionStorage` e recarregue. O título deve entrar linha a linha após o preloader. Como os vídeos não existem, a foto deve executar Ken Burns; ao adicionar os arquivos, role para fora do hero e confirme que o vídeo pausa. |
| 2. Zoom no scroll | ✅ Completo | Role pelas transições 00→01, 02→03 e 04→05. O quadro central deve expandir via `clip-path`, enquanto os dois títulos saem pelas laterais. |
| 3. Parallax em camadas | ✅ Completo | No capítulo 01, observe a imagem mover −10→10%, o título subir e o “01” em outline mover no sentido oposto. |
| 4. Galeria 3D | ✅ Completo | Em desktop com WebGL, role pelos 400vh do capítulo 02; a câmera deve atravessar seis planos alternados. Passe o mouse para o zoom de textura e clique para abrir `/imoveis/[slug]`. Em mobile/reduced-motion, confirme o scroll-snap. |
| 5. Três mundos | ✅ Completo | Passe o mouse ou foque Casas/Apartamentos/Coberturas. A mídia deve dissolver organicamente. Use setas do teclado entre as tabs; em reduced-motion, confirme o wipe vertical. |
| 6. Princípios | ⚠️ Fallback ativo | Role até o capítulo 04 e passe o mouse/foco nos seis cards. Sem os MP4 finais, as imagens devem ganhar cor e zoom lento. |
| 7. Mapa 3D | ✅ Completo | No capítulo 05, selecione cada bairro. A câmera deve voar por 1,6s até o pino, que cresce e pulsa. Em reduced-motion/sem WebGL, confirme o SVG e o card atualizado. |
| 8. Palavra do corretor | ✅ Completo | Role lentamente pelo capítulo 06. As palavras devem passar de 0,15 para 1 de opacidade. Em reduced-motion, a frase deve permanecer integralmente visível. |
| 9. Polimento | ⚠️ Performance a otimizar | Teste menu lateral, odômetro, linha de progresso, foco visível, skip link, menu mobile, formulário e footer sticky. Lighthouse móvel mediu Performance 64, Accessibility 97 e CLS 0,008; as duas últimas metas passaram, Performance ainda não. |
| 10. Deploy Vercel | ✅ Completo | O build deve concluir mesmo se `NEXT_PUBLIC_SITE_URL` estiver vazia ou inválida; metadata, JSON-LD, sitemap e robots usam o fallback validado. |

## Validação técnica

```bash
npm run build
npm run lint
npx tsc --noEmit
```

## Viewports de referência

- Desktop: 1440×900.
- Mobile: 390×844.
- Scroll: início, meio e fim das três transições de zoom e da galeria 3D.

Playwright não está instalado neste repositório; as capturas automatizadas foram puladas conforme o briefing.

O relatório bruto da última coleta está em `docs/lighthouse-mobile.json`. O CLI devolve `EPERM` ao limpar a pasta temporária do Chrome no Windows, mas grava o JSON completo antes desse erro.
