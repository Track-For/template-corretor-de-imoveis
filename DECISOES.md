# Decisões — Fase 3

## 2026-09-26

- **Mudanças locais preexistentes foram preservadas.** A branch foi criada com alterações não commitadas em `globals.css`, `FeaturedProperty.tsx`, `Manifesto.tsx` e `properties.ts`; elas pertencem ao usuário e serão incorporadas ou mantidas fora da nova composição.
- **Componentes da fase anterior sairão da composição, mas não serão apagados sem necessidade.** Isso mantém o trabalho anterior recuperável e reduz o risco de perda de alterações locais.
- **A documentação local do Next.js será substituída pela API instalada.** O diretório exigido por `AGENTS.md`, `node_modules/next/dist/docs/`, não existe no pacote Next.js 15.5.26 instalado. A implementação usará os tipos e as APIs já exercitadas pelo projeto.
- **Playwright não será instalado apenas para screenshots.** O pacote não está disponível no projeto; conforme o briefing, as capturas serão puladas sem bloquear as etapas.
- **Fotos remotas atuais serão mantidas como fallback editorial.** Não há fotos nem vídeos finais em `public/`; todos os caminhos a substituir serão listados no relatório final.
- **Assets de vídeo são detectados no servidor.** O hero e os cards de princípios só renderizam `<video>` quando o arquivo existe, evitando 404 e erros de console durante a fase de fallback.
- **Cada experiência WebGL possui seu próprio Canvas dinâmico.** A galeria, o displacement e o mapa são isolados, usam `dpr` limitado e têm fallback sem WebGL/reduced-motion.
- **`maath` virou dependência direta.** A câmera da galeria usa `maath/easing` para damping e não depende mais de uma instalação transitiva do drei.
- **A rota antiga foi preservada fora da composição.** Componentes como `FeaturedProperty`, `Showcase`, `Process` e `NeighborhoodStrip` continuam no repositório para referência, mas não fazem parte da página final.
- **Efeitos proibidos foram removidos também do código legado.** `DistortedImage` agora é uma imagem simples; separação RGB, curvatura por velocidade e skew do marquee não permanecem ativos no código.
- **Canvases são montados apenas perto da viewport.** A mudança reduziu a auditoria móvel de 1,5 MB/Performance 40 para 695 KB/Performance 64, sem empobrecer a experiência quando o capítulo entra em cena.
- **A meta de Performance foi reportada sem maquiar a medição.** Após três rodadas de otimização, Accessibility e CLS passaram, mas Performance permaneceu em 64. O valor e os próximos passos estão em `PENDENCIAS.md`.
