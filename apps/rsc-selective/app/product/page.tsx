import Link from "next/link";
import { fetchProductsFromApi, ProductCard } from "@cwr/shared/server";

export const dynamic = "force-dynamic";

export default async function ProductListPage() {
  const { items } = await fetchProductsFromApi({
    baseUrl: process.env.MOCK_API_BASE_URL,
    count: 1200,
    limit: 60,
    delayMs: 100,
  });
  return (
    <div>
      <h1>Товары</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
        {items.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}
