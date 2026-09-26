export type PropertyType = "Casa" | "Apartamento" | "Cobertura";

export type Property = {
  id: number;
  slug: string;
  name: string;
  type: PropertyType;
  price: string;
  location: string;
  details: string;
  image: string;
  alt: string;
};

export const featuredProperty = {
  name: "Residência Ipê",
  description:
    "Arquitetura que enquadra a luz natural, integra o jardim aos espaços sociais e transforma cada fim de tarde em parte da casa.",
  gallery: [
    {
      src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1800&q=86",
      alt: "Fachada da Residência Ipê ao entardecer",
    },
    {
      src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=86",
      alt: "Sala principal iluminada da Residência Ipê",
    },
    {
      src: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1800&q=86",
      alt: "Área social integrada da Residência Ipê",
    },
  ],
  specs: {
    area: 420,
    suites: 4,
    parking: 4,
    price: "R$ 8,9 mi",
  },
};

// TODO: substituir pelas fotos reais do cliente
export const properties: Property[] = [
  {
    id: 1,
    slug: "casa-jacaranda",
    name: "Casa Jacarandá",
    type: "Casa",
    price: "R$ [VALOR]",
    location: "[Bairro 1] · jardim com paisagismo autoral",
    details: "[000] m² · [0] suítes · [0] vagas",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&fm=webp&w=1600&q=84",
    alt: "Fachada contemporânea da Casa Jacarandá ao entardecer",
  },
  {
    id: 2,
    slug: "edificio-solar",
    name: "Edifício Solar",
    type: "Apartamento",
    price: "R$ [VALOR]",
    location: "[Bairro 2] · vista livre para a cidade",
    details: "[000] m² · [0] suítes · [0] vagas",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&fm=webp&w=1600&q=84",
    alt: "Sala ampla e iluminada do Edifício Solar",
  },
  {
    id: 3,
    slug: "cobertura-aurora",
    name: "Cobertura Aurora",
    type: "Cobertura",
    price: "R$ [VALOR]",
    location: "[Bairro 3] · terraço com piscina privativa",
    details: "[000] m² · [0] suítes · [0] vagas",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&fm=webp&w=1600&q=84",
    alt: "Terraço elegante da Cobertura Aurora com piscina",
  },
  {
    id: 4,
    slug: "casa-aroeira",
    name: "Casa Aroeira",
    type: "Casa",
    price: "R$ [VALOR]",
    location: "[Bairro 4] · integração total com o verde",
    details: "[000] m² · [0] suítes · [0] vagas",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&fm=webp&w=1600&q=84",
    alt: "Casa Aroeira de arquitetura moderna integrada ao jardim",
  },
  {
    id: 5,
    slug: "residencial-lumiere",
    name: "Residencial Lumière",
    type: "Apartamento",
    price: "R$ [VALOR]",
    location: "[Bairro 5] · interiores assinados",
    details: "[000] m² · [0] suítes · [0] vagas",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&fm=webp&w=1600&q=84",
    alt: "Living sofisticado e acolhedor do Residencial Lumière",
  },
  {
    id: 6,
    slug: "cobertura-horizonte",
    name: "Cobertura Horizonte",
    type: "Cobertura",
    price: "R$ [VALOR]",
    location: "[Bairro 6] · horizonte panorâmico",
    details: "[000] m² · [0] suítes · [0] vagas",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&fm=webp&w=1600&q=84",
    alt: "Ambiente social da Cobertura Horizonte com vista panorâmica",
  },
];
