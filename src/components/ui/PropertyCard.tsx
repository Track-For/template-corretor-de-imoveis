"use client";

import { DistortedImage } from "@/components/webgl/DistortedImage";
import type { Property } from "@/data/properties";
import { Heart } from "lucide-react";
import { useState } from "react";

export function PropertyCard({
  property,
  variant = "default",
}: {
  property: Property;
  variant?: "default" | "showcase";
}) {
  const [favorite, setFavorite] = useState(false);
  const showcase = variant === "showcase";

  const details = (
    <div className={showcase ? "property-card-info" : "pt-5"}>
      <div className="mb-3 flex items-center justify-between gap-4">
        <span
          className={`text-[11px] font-bold uppercase tracking-[0.18em] ${
            showcase ? "text-bronze-light" : "text-bronze"
          }`}
        >
          {property.type}
        </span>
        <span className={`text-sm font-semibold ${showcase ? "text-sand" : "text-ink"}`}>
          {property.price}
        </span>
      </div>
      <h3
        className={`font-display leading-[1.02] tracking-[-0.03em] ${
          showcase
            ? "text-[clamp(2.25rem,4vw,4.8rem)] text-sand"
            : "text-[clamp(1.75rem,2.6vw,2.35rem)] text-ink"
        }`}
      >
        {property.name}
      </h3>
      <p className={`mt-3 text-sm leading-6 ${showcase ? "text-sand/78" : "text-muted"}`}>
        {property.location}
      </p>
      <p
        className={`mt-5 border-t pt-4 text-xs font-semibold tracking-[0.02em] ${
          showcase ? "border-sand/22 text-sand/72" : "border-line text-muted"
        }`}
      >
        {property.details}
      </p>
    </div>
  );

  return (
    <article
      className={`group relative min-w-0 ${
        showcase ? "h-full overflow-hidden rounded-[30px] bg-ink" : ""
      }`}
      data-cursor="view"
      data-property-card
    >
      <div
        className={
          showcase
            ? "property-card-media--immersive"
            : "relative aspect-[4/3] overflow-hidden rounded-[26px] bg-line"
        }
        data-card-parallax={showcase ? "" : undefined}
      >
        <DistortedImage
          src={property.image}
          alt={property.alt}
          sizes={
            showcase
              ? "(min-width: 1024px) 48vw, 90vw"
              : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          }
          className="transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {showcase ? (
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-transparent" />
        ) : null}
      </div>

      <button
        aria-label={
          favorite
            ? `Remover ${property.name} dos favoritos`
            : `Adicionar ${property.name} aos favoritos`
        }
        aria-pressed={favorite}
        className="absolute right-4 top-4 z-20 grid size-11 place-items-center rounded-full border border-white/45 bg-sand/90 text-ink backdrop-blur-md transition-transform duration-300 hover:scale-105 active:scale-95"
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

      {details}
    </article>
  );
}
