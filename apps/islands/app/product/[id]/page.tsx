import { ProductControls } from "@cwr/shared/client";
import {
  buildProductExperienceData,
  calculateProductPurchaseSummary,
  fetchProductFromApi,
  getInitialProductPurchaseState,
  ProductExperienceDetails,
  ProductPageContent,
} from "@cwr/shared/server";
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
    const experience = buildProductExperienceData(product);
    const summary = calculateProductPurchaseSummary(
      product,
      experience,
      getInitialProductPurchaseState(experience),
    );
    return (
      <div>
        <h1>Товар</h1>
        <ProductPageContent product={product} summary={summary} />
        <ProductControls product={product} />
        <ProductExperienceDetails product={product} experience={experience} />
      </div>
    );
  } catch {
    notFound();
  }
}
