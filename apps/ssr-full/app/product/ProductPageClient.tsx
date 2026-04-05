"use client";

import {
    ClientProductPageContent,
  ProductExperienceDetails,
  ProductPurchasePanel,
    type Product,
  buildProductExperienceData,
  calculateProductPurchaseSummary,
  getInitialProductPurchaseState,
  type ProductPurchaseState,
} from "@cwr/shared/client";
import { useState, useTransition } from "react";

export function ProductPageClient({ product }: { product: Product }) {
  const experience = buildProductExperienceData(product);
  const [state, setState] = useState<ProductPurchaseState>(() =>
    getInitialProductPurchaseState(experience),
  );
  const [isPending, startTransition] = useTransition();
  const summary = calculateProductPurchaseSummary(product, experience, state);

  return (
    <div>
      <h1>Товар</h1>
      <ClientProductPageContent product={product} summary={summary} />
      <ProductPurchasePanel
        product={product}
        experience={experience}
        state={state}
        summary={summary}
        isPending={isPending}
        onVariantChange={(variantId) =>
          startTransition(() => {
            setState((prev) => ({ ...prev, variantId }));
          })
        }
        onDeliveryChange={(deliveryId) =>
          startTransition(() => {
            setState((prev) => ({ ...prev, deliveryId }));
          })
        }
        onQuantityChange={(quantity) =>
          startTransition(() => {
            setState((prev) => ({ ...prev, quantity }));
          })
        }
        onAddToCart={() =>
          startTransition(() => {
            setState((prev) => ({ ...prev, added: true }));
          })
        }
      />
      <ProductExperienceDetails product={product} experience={experience} />
    </div>
  );
}
