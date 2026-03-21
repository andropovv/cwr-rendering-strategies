import { getProductById, getProducts } from "@cwr/shared";
import { ProductControls, ProductPageContent } from "@cwr/shared";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return getProducts().map((p) => ({ id: p.id }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();
  return (
    <div>
      <h1>Товар</h1>
      <ProductPageContent product={product} />
      <ProductControls product={product} />
    </div>
  );
}
