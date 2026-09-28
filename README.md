# Aurora Residências

Landing page imobiliária de alto padrão construída com Next.js 15, TypeScript, Tailwind CSS v4, GSAP e Lenis. O projeto reúne vitrine filtrável, imóvel em destaque com galeria, formulário validado e SEO completo.

## Como rodar

Requisitos: Node.js 20 ou superior e npm.

```bash
npm install
copy .env.example .env.local
npm run dev
```

Acesse `http://localhost:3000`.

Antes de publicar, valide o projeto:

```bash
npm run lint
npm run typecheck
npm run build
```

## Variáveis de ambiente

Copie `.env.example` para `.env.local` e ajuste:

- `RESEND_API_KEY`: chave da conta Resend. Sem ela, o formulário registra os dados no terminal e responde com sucesso para facilitar desenvolvimento e demonstração.
- `CONTACT_EMAIL`: endereço que recebe os contatos enviados pelo formulário.
- `NEXT_PUBLIC_SITE_URL`: URL absoluta do domínio final, incluindo `https://`, usada em metadata, sitemap, robots e JSON-LD. Se estiver ausente, vazia ou inválida, o projeto usa `https://aurora-residencias.vercel.app` como fallback.

## Estrutura

```text
src/
  app/                  layout, página, ações, SEO e estilos globais
  components/
    layout/             header, footer, Lenis e animações globais
    sections/           todas as seções da landing page
    ui/                 botões, filtros, cards e labels reutilizáveis
  data/                 catálogo tipado de imóveis
  lib/                  registro do GSAP e schema do formulário
public/
  images/               pasta reservada para fotos finais do cliente
```

## Onde trocar o conteúdo

- Textos institucionais: arquivos em `src/components/sections/`.
- Dados e fotos dos seis imóveis: `src/data/properties.ts`.
- Imagens do hero, imóvel da semana e corretor: componentes correspondentes em `src/components/sections/`.
- Telefone, cidade, CRECI e demais placeholders: procure por `[` no diretório `src`.
- E-mail de destino do formulário: `CONTACT_EMAIL` no `.env.local`.

## Cores e tipografia

Os tokens do projeto ficam no bloco `@theme` de `src/app/globals.css`. As cores principais são `sand`, `ink`, `muted`, `line`, `bronze`, `bronze-light` e `stone`.

As fontes Fraunces e Manrope são carregadas com `next/font/google` em `src/app/layout.tsx`, sem requisições externas no navegador.

## Fotos

As imagens atuais são placeholders remotos do Unsplash e passam pelo `next/image`. Para publicar, substitua as URLs por fotos autorizadas do cliente. Caso use outro domínio remoto, inclua-o em `images.remotePatterns` no `next.config.ts`.

## Formulário

O formulário usa React Hook Form e Zod no cliente e valida os dados novamente na Server Action `src/app/actions/contact.ts`. Com `RESEND_API_KEY` configurada, o envio é feito pelo Resend. Sem a chave, os dados são apenas registrados no servidor.

## Deploy na Vercel

1. Envie o repositório para seu provedor Git.
2. Importe o repositório na Vercel.
3. Cadastre `RESEND_API_KEY`, `CONTACT_EMAIL` e `NEXT_PUBLIC_SITE_URL` em **Project Settings > Environment Variables**. Use uma URL completa, por exemplo `https://www.seudominio.com.br`, sem aspas.
4. Faça o deploy. O projeto não exige configuração adicional de build.

Não há Google Analytics, Google Tag Manager ou qualquer script de rastreamento neste projeto.
