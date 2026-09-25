import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p
      className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-bronze"
      data-reveal-label
    >
      {children}
    </p>
  );
}
