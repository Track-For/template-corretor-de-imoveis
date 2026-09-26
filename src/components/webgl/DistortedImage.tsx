"use client";

import Image from "next/image";

type DistortedImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
};

/**
 * Compatibilidade para cards legados. A antiga separação RGB/curvatura por
 * velocidade foi removida na Fase 3; a imagem agora usa apenas zoom por transform.
 */
export function DistortedImage({
  src,
  alt,
  sizes,
  className = "",
  priority = false,
}: DistortedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      className={`object-cover ${className}`}
    />
  );
}
