import React from "react";
import type { Product } from "../data/products";
import type { ProductPurchaseSummary } from "../utils/productExperience";

export interface ProductPageContentProps {
  product: Product;
  summary?: ProductPurchaseSummary;
}

export function ProductPageContent({ product, summary }: ProductPageContentProps) {
  const displayPrice = summary?.unitPrice ?? product.price;

  return (
    <div className="cwr-product-page">
      <div className="cwr-product-page-image">{product.image}</div>
      <div className="cwr-product-page-info">
        <div className="cwr-product-page-kicker">{product.category}</div>
        <h1 className="cwr-product-page-title">{product.name}</h1>
        <p className="cwr-product-page-desc">{product.description}</p>
        <div className="cwr-product-page-price">
          {displayPrice.toLocaleString("ru-RU")} {product.currency}
        </div>
        <div className="cwr-product-page-rating">
          ★ {product.rating} • {product.reviewCount} отзывов
        </div>
        {summary && (
          <div className="cwr-product-page-meta">
            <span
              className="cwr-product-variant-badge"
              style={{ background: `${summary.selectedVariant.accent}14`, color: summary.selectedVariant.accent }}
            >
              {summary.selectedVariant.label}
            </span>
            <span>{summary.inventoryLabel}</span>
            <span>{summary.deliveryLabel}</span>
            <span>от {summary.monthlyInstallment.toLocaleString("ru-RU")} ₽/мес</span>
          </div>
        )}
      </div>
    </div>
  );
}
