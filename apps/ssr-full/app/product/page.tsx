import Link from "next/link";
import { getProducts } from "@cwr/shared";
import { ProductListClient } from "./ProductListClient";

export default async function ProductListPage() {
  const products = getProducts();
  return <ProductListClient products={products} />;
}
