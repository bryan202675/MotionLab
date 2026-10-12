import type { Metadata } from "next";
import { Suspense } from "react";
import { ComponentCatalog } from "@/components/component-catalog";
import { componentRegistry } from "@/lib/component-registry";

export const metadata: Metadata = {
  title: "Component Index",
  description: `Browse ${componentRegistry.length} original, interactive React motion components.`,
};

export default function ComponentsPage() {
  return (
    <Suspense
      fallback={
        <div className="page-wrap page-skeleton" aria-label="Loading component index">
          <div />
          <div />
          <div />
        </div>
      }
    >
      <ComponentCatalog />
    </Suspense>
  );
}
