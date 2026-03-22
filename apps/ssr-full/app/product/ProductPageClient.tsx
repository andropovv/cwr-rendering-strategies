"use client";

import {
  ClientProductPageContent,
  ProductControls,
  type Product,
} from "@cwr/shared/client";

export function ProductPageClient({ product }: { product: Product }) {
  return (
    <div>
      <h1>Товар</h1>
      <ClientProductPageContent product={product} />
      <ProductControls product={product} />
    </div>
  );
}
