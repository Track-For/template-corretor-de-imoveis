# Decisões — Fase 3

## 2026-09-26

- **Mudanças locais preexistentes foram preservadas.** A branch foi criada com alterações não commitadas em `globals.css`, `FeaturedProperty.tsx`, `Manifesto.tsx` e `properties.ts`; elas pertencem ao usuário e serão incorporadas ou mantidas fora da nova composição.
- **Componentes da fase anterior sairão da composição, mas não serão apagados sem necessidade.** Isso mantém o trabalho anterior recuperável e reduz o risco de perda de alterações locais.
- **A documentação local do Next.js será substituída pela API instalada.** O diretório exigido por `AGENTS.md`, `node_modules/next/dist/docs/`, não existe no pacote Next.js 15.5.26 instalado. A implementação usará os tipos e as APIs já exercitadas pelo projeto.
- **Playwright não será instalado apenas para screenshots.** O pacote não está disponível no projeto; conforme o briefing, as capturas serão puladas sem bloquear as etapas.
- **Fotos remotas atuais serão mantidas como fallback editorial.** Não há fotos nem vídeos finais em `public/`; todos os caminhos a substituir serão listados no relatório final.
