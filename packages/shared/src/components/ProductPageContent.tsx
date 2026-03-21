import React from "react";
import type { Product } from "../data/products";

export interface ProductPageContentProps {
  product: Product;
}

export function ProductPageContent({ product }: ProductPageContentProps) {
  return (
    <div className="cwr-product-page">
      <div className="cwr-product-page-image">{product.image}</div>
      <div className="cwr-product-page-info">
        <h1 className="cwr-product-page-title">{product.name}</h1>
        <p className="cwr-product-page-desc">{product.description}</p>
        <div className="cwr-product-page-price">
          {product.price.toLocaleString("ru-RU")} {product.currency}
        </div>
        <div className="cwr-product-page-rating">
          ★ {product.rating} • {product.reviewCount} отзывов
        </div>
      </div>
    </div>
  );
}
