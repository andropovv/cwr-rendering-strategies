"use client";

import { ProductControls, ProductPageContent } from "@cwr/shared";
import type { Product } from "@cwr/shared";

export function ProductPageClient({ product }: { product: Product }) {
  return (
    <div>
      <h1>Товар</h1>
      <ProductPageContent product={product} />
      <ProductControls product={product} />
    </div>
  );
}
