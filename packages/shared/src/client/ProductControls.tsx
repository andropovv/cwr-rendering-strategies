"use client";

import { useState, useTransition } from "react";
import type { Product } from "../data/products";
import {
  buildProductExperienceData,
  calculateProductPurchaseSummary,
  getInitialProductPurchaseState,
  type ProductPurchaseState,
} from "../utils/productExperience";
import { ProductPurchasePanel } from "./ProductPurchasePanel";

export interface ProductControlsProps {
  product: Product;
}

export function ProductControls({ product }: ProductControlsProps) {
  const experience = buildProductExperienceData(product);
  const [state, setState] = useState<ProductPurchaseState>(() =>
    getInitialProductPurchaseState(experience),
  );
  const [isPending, startTransition] = useTransition();
  const summary = calculateProductPurchaseSummary(product, experience, state);

  return (
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
  );
}

