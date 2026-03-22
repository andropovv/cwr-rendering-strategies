import { fetchProductFromApi } from "@cwr/shared/server";
import { notFound } from "next/navigation";
import { ProductPageClient } from "../ProductPageClient";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  try {
    const product = await fetchProductFromApi(id, {
      baseUrl: process.env.MOCK_API_BASE_URL,
      count: 1200,
      delayMs: 120,
    });
    return <ProductPageClient product={product} />;
  } catch {
    notFound();
  }
}
