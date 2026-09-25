export type PropertyType = "Casa" | "Apartamento" | "Cobertura";

export type Property = {
  id: number;
  name: string;
  type: PropertyType;
  price: string;
  location: string;
  details: string;
  image: string;
  alt: string;
};

// TODO: substituir pelas fotos reais do cliente
export const properties: Property[] = [
  {
    id: 1,
    name: "Casa Jacarandá",
    type: "Casa",
    price: "R$ [VALOR]",
    location: "[Bairro 1] · jardim com paisagismo autoral",
    details: "[000] m² · [0] suítes · [0] vagas",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=84",
    alt: "Fachada contemporânea da Casa Jacarandá ao entardecer",
  },
  {
    id: 2,
    name: "Edifício Solar",
    type: "Apartamento",
    price: "R$ [VALOR]",
    location: "[Bairro 2] · vista livre para a cidade",
    details: "[000] m² · [0] suítes · [0] vagas",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=84",
    alt: "Sala ampla e iluminada do Edifício Solar",
  },
  {
    id: 3,
    name: "Cobertura Aurora",
    type: "Cobertura",
    price: "R$ [VALOR]",
    location: "[Bairro 3] · terraço com piscina privativa",
    details: "[000] m² · [0] suítes · [0] vagas",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=84",
    alt: "Terraço elegante da Cobertura Aurora com piscina",
  },
  {
    id: 4,
    name: "Casa Aroeira",
    type: "Casa",
    price: "R$ [VALOR]",
    location: "[Bairro 4] · integração total com o verde",
    details: "[000] m² · [0] suítes · [0] vagas",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=84",
    alt: "Casa Aroeira de arquitetura moderna integrada ao jardim",
  },
  {
    id: 5,
    name: "Residencial Lumière",
    type: "Apartamento",
    price: "R$ [VALOR]",
    location: "[Bairro 5] · interiores assinados",
    details: "[000] m² · [0] suítes · [0] vagas",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=84",
    alt: "Living sofisticado e acolhedor do Residencial Lumière",
  },
  {
    id: 6,
    name: "Cobertura Horizonte",
    type: "Cobertura",
    price: "R$ [VALOR]",
    location: "[Bairro 6] · horizonte panorâmico",
    details: "[000] m² · [0] suítes · [0] vagas",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=84",
    alt: "Ambiente social da Cobertura Horizonte com vista panorâmica",
  },
];
