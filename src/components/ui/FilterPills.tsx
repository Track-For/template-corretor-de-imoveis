import type { PropertyType } from "@/data/properties";

export type PropertyFilter = "Todos" | `${PropertyType}s`;

type FilterPillsProps = {
  active: PropertyFilter;
  onChange: (filter: PropertyFilter) => void;
};

const filters: PropertyFilter[] = [
  "Todos",
  "Apartamentos",
  "Casas",
  "Coberturas",
];

export function FilterPills({ active, onChange }: FilterPillsProps) {
  return (
    <div
      aria-label="Filtrar imóveis por tipo"
      className="hide-scrollbar flex w-full min-w-0 max-w-full gap-2 overflow-x-auto pb-2"
      role="group"
    >
      {filters.map((filter) => (
        <button
          key={filter}
          aria-pressed={filter === active}
          className={`min-h-11 shrink-0 rounded-full border px-5 text-sm font-semibold transition-colors duration-300 active:scale-[0.98] ${
            filter === active
              ? "border-ink bg-ink text-sand"
              : "border-line bg-transparent text-muted hover:border-ink hover:text-ink"
          }`}
          onClick={() => onChange(filter)}
          type="button"
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
