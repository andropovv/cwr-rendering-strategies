"use client";

import { useState } from "react";

export function AddToCartIsland({
  productId,
  productName,
}: {
  productId: string;
  productName: string;
}) {
  const [added, setAdded] = useState(false);
  return (
    <div style={{ marginTop: "1rem" }}>
      <button
        type="button"
        onClick={() => setAdded(true)}
        disabled={added}
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
    </div>
  );
}
