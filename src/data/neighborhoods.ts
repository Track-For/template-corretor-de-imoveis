export type Neighborhood = {
  id: string;
  name: string;
  x: number;
  z: number;
  count: number;
};

export const neighborhoods: Neighborhood[] = [
  { id: "bairro-1", name: "[Bairro 1]", x: -9, z: -5, count: 2 },
  { id: "bairro-2", name: "[Bairro 2]", x: 7, z: -7, count: 1 },
  { id: "bairro-3", name: "[Bairro 3]", x: -4, z: 7, count: 2 },
  { id: "bairro-4", name: "[Bairro 4]", x: 10, z: 5, count: 1 },
];
