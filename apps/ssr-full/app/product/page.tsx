import { fetchProductsFromApi } from "@cwr/shared/server";
import { ProductListClient } from "./ProductListClient";

export const dynamic = "force-dynamic";

export default async function ProductListPage() {
  const { items, total } = await fetchProductsFromApi({
    baseUrl: process.env.MOCK_API_BASE_URL,
    count: 1200,
    limit: 120,
    delayMs: 140,
  });

  return <ProductListClient products={items} total={total} />;
}
