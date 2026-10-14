import ProductCard from "./ProductCard";
import type { Product } from "@/lib/types";

/** মোবাইলে ১ কলাম, ট্যাবলেটে ২, ডেস্কটপে ৩ কলাম */
export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
