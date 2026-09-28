import { CustomCursor } from "@/components/layout/CustomCursor";
import { DayCycle } from "@/components/layout/DayCycle";
import { Preloader } from "@/components/layout/Preloader";
import { ScrollAnimations } from "@/components/layout/ScrollAnimations";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { metadataBase } from "@/lib/siteUrl";
import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase,
  title: "Aurora Residências | Imóveis de alto padrão",
  description:
    "Curadoria de imóveis de alto padrão, visitas sob medida e acompanhamento próximo até a entrega das chaves.",
  applicationName: "Aurora Residências",
  keywords: [
    "imóveis de alto padrão",
    "imobiliária de luxo",
    "casas",
    "apartamentos",
    "coberturas",
  ],
  authors: [{ name: "Aurora Residências" }],
  creator: "Aurora Residências",
  publisher: "Aurora Residências",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Aurora Residências",
    title: "Aurora Residências | Imóveis de alto padrão",
    description:
      "Uma seleção enxuta de imóveis excepcionais para o seu próximo capítulo.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=86",
        width: 1600,
        height: 900,
        alt: "Residência contemporânea selecionada pela Aurora Residências",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aurora Residências | Imóveis de alto padrão",
    description:
      "Uma seleção enxuta de imóveis excepcionais para o seu próximo capítulo.",
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=86",
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${manrope.variable} bg-sand antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('aurora-preloader-seen')==='true')document.documentElement.dataset.preloader='seen'}catch(e){}",
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#capitulo-00">Pular para o conteúdo</a>
        <Preloader />
        <DayCycle />
        <CustomCursor />
        <SmoothScroll>
          <ScrollAnimations>{children}</ScrollAnimations>
        </SmoothScroll>
      </body>
    </html>
  );
}
