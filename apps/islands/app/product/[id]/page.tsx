import { fetchProductFromApi, ProductPageContent } from "@cwr/shared/server";
import { ProductControls } from "@cwr/shared/client";
import { notFound } from "next/navigation";

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
      delayMs: 110,
    });
    return (
      <div>
        <h1>Товар</h1>
        <ProductPageContent product={product} />
        <ProductControls product={product} />
      </div>
    );
  } catch {
    notFound();
  }
}
