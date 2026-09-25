"use client";

import type { Property } from "@/data/properties";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function PropertyCard({ property }: { property: Property }) {
  const [favorite, setFavorite] = useState(false);

  return (
    <article className="group min-w-0" data-property-card>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[26px] bg-line">
        <Image
          src={property.image}
          alt={property.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <button
          aria-label={
            favorite
              ? `Remover ${property.name} dos favoritos`
              : `Adicionar ${property.name} aos favoritos`
          }
          aria-pressed={favorite}
          className="absolute right-4 top-4 grid size-11 place-items-center rounded-full border border-white/45 bg-sand/90 text-ink backdrop-blur-md transition-transform duration-300 hover:scale-105 active:scale-95"
          onClick={() => setFavorite((value) => !value)}
          type="button"
        >
          <Heart
            aria-hidden="true"
            className="size-[18px]"
            fill={favorite ? "currentColor" : "none"}
            strokeWidth={1.8}
          />
        </button>
      </div>

      <div className="pt-5">
        <div className="mb-3 flex items-center justify-between gap-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-bronze">
            {property.type}
          </span>
          <span className="text-sm font-semibold text-ink">{property.price}</span>
        </div>
        <h3 className="font-display text-[clamp(1.75rem,2.6vw,2.35rem)] leading-[1.02] tracking-[-0.03em] text-ink">
          {property.name}
        </h3>
        <p className="mt-3 text-sm leading-6 text-muted">{property.location}</p>
        <p className="mt-5 border-t border-line pt-4 text-xs font-semibold tracking-[0.02em] text-muted">
          {property.details}
        </p>
      </div>
    </article>
  );
}
