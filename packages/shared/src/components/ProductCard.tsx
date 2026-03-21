import React from "react";
import type { Product } from "../data/products";

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="cwr-product-card">
      <div className="cwr-product-card-image">{product.image}</div>
      <h3 className="cwr-product-card-name">{product.name}</h3>
      <p className="cwr-product-card-desc">{product.description}</p>
      <div className="cwr-product-card-price">
        {product.price.toLocaleString("ru-RU")} {product.currency}
      </div>
      <div className="cwr-product-card-rating">
        ★ {product.rating} ({product.reviewCount} отзывов)
      </div>
    </div>
  );
}
