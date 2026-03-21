"use client";

import { useState, useTransition } from "react";
import type { Product } from "../data/products";

export interface ProductControlsProps {
  product: Product;
}

export function ProductControls({ product }: ProductControlsProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleChangeQty = (delta: number) => {
    startTransition(() => {
      setQuantity((prev) => {
        const next = prev + delta;
        return next < 1 ? 1 : next > 10 ? 10 : next;
      });
    });
  };

  const handleAddToCart = () => {
    if (added) return;
    startTransition(() => {
      const end = performance.now() + 10;
      while (performance.now() < end) {
        // имитация ~10ms работы на клиенте
      }
      setAdded(true);
    });
  };

  const totalPrice = product.price * quantity;

  return (
    <div
      style={{
        marginTop: "1.5rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          border: "1px solid #e2e8f0",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <button
          type="button"
          onClick={() => handleChangeQty(-1)}
          style={{
            padding: "0.5rem 0.9rem",
            border: "none",
            background: "white",
            cursor: "pointer",
          }}
        >
          −
        </button>
        <span
          style={{
            minWidth: "2.5rem",
            textAlign: "center",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => handleChangeQty(1)}
          style={{
            padding: "0.5rem 0.9rem",
            border: "none",
            background: "white",
            cursor: "pointer",
          }}
        >
          +
        </button>
      </div>
      <button
        type="button"
        disabled={added}
        onClick={handleAddToCart}
        style={{
          padding: "0.75rem 1.5rem",
          background: added ? "#94a3b8" : "#22c55e",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: added ? "default" : "pointer",
          fontSize: "1rem",
        }}
      >
        {added ? "В корзине" : "Добавить в корзину"}
      </button>
      <div style={{ fontSize: "0.9375rem", color: "#0f172a" }}>
        Итого:{" "}
        <strong>
          {totalPrice.toLocaleString("ru-RU")} {product.currency}
        </strong>
      </div>
      {isPending && (
        <span style={{ fontSize: "0.8125rem", color: "#94a3b8" }}>
          Обработка…
        </span>
      )}
    </div>
  );
}

