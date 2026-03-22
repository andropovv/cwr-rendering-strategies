"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { ClientProductCard, type Product } from "@cwr/shared/client";

type SortMode = "popular" | "price-asc" | "price-desc";

export function ProductListClient({
  products,
  total,
}: {
  products: Product[];
  total: number;
}) {
  const [query, setQuery] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("popular");
  const [isPending, startTransition] = useTransition();

  const visibleProducts = useMemo(() => {
    const lowered = query.trim().toLowerCase();
    const filtered = lowered
      ? products.filter((product) =>
          `${product.name} ${product.category}`.toLowerCase().includes(lowered),
        )
      : products;

    const sorted = [...filtered];
    if (sortMode === "price-asc") {
      sorted.sort((left, right) => left.price - right.price);
    } else if (sortMode === "price-desc") {
      sorted.sort((left, right) => right.price - left.price);
    } else {
      sorted.sort((left, right) => right.reviewCount - left.reviewCount);
    }
    return sorted.slice(0, 60);
  }, [products, query, sortMode]);

  return (
    <div>
      <h1>Товары</h1>
      <p style={{ color: "#64748b" }}>
        Загружено {products.length} карточек из каталога на {total.toLocaleString("ru-RU")} товаров.
      </p>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: "1rem",
        }}
      >
        <input
          value={query}
          onChange={(event) =>
            startTransition(() => {
              setQuery(event.target.value);
            })
          }
          placeholder="Поиск по товарам"
          style={{
            minWidth: "280px",
            padding: "0.75rem 1rem",
            borderRadius: "10px",
            border: "1px solid #cbd5e1",
          }}
        />
        <select
          value={sortMode}
          onChange={(event) =>
            startTransition(() => {
              setSortMode(event.target.value as SortMode);
            })
          }
          style={{
            padding: "0.75rem 1rem",
            borderRadius: "10px",
            border: "1px solid #cbd5e1",
          }}
        >
          <option value="popular">Сначала популярные</option>
          <option value="price-asc">Цена по возрастанию</option>
          <option value="price-desc">Цена по убыванию</option>
        </select>
        {isPending && <span style={{ color: "#94a3b8" }}>Обработка…</span>}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1rem",
        }}
      >
        {visibleProducts.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <ClientProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}
