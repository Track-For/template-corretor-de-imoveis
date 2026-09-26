import { properties } from "@/data/properties";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }));
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = properties.find((item) => item.slug === slug);
  if (!property) notFound();

  return (
    <main className="property-detail">
      <Link className="property-detail-back" href="/#capitulo-02">
        ← Voltar à coleção
      </Link>
      <div className="property-detail-media">
        <Image
          src={property.image}
          alt={property.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="site-container property-detail-copy">
        <p className="chapter-kicker">{property.type}</p>
        <h1>{property.name}</h1>
        <p>{property.location}</p>
        <div>
          <span>{property.details}</span>
          <strong>{property.price}</strong>
        </div>
        <Link className="property-detail-cta" href="/#contato">
          Agendar visita
        </Link>
      </div>
    </main>
  );
}
