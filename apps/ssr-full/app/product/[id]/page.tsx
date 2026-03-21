import { getProductById, getProducts } from "@cwr/shared";
import { notFound } from "next/navigation";
import { ProductPageClient } from "../ProductPageClient";

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
  return <ProductPageClient product={product} />;
}
