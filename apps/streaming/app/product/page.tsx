import Link from "next/link";
import { getProducts } from "@cwr/shared";
import { ProductCard } from "@cwr/shared";

export default function ProductListPage() {
  const products = getProducts();
  return (
    <div>
      <h1>Товары</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1rem" }}>
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}
