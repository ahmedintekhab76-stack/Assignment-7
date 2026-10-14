import ProductGrid from "./ProductGrid";
import type { Product } from "@/lib/types";

/** "আজ দাম বেড়েছে" / "আজ দাম কমেছে" section (ওপরের ৬টি পণ্য) */
export default function MoversSection({
  direction,
  products,
}: {
  direction: "up" | "down";
  products: Product[];
}) {
  const isUp = direction === "up";
  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className={`text-base leading-6 ${isUp ? "text-error" : "text-success"}`} aria-hidden>
          {isUp ? "▲" : "▼"}
        </span>
        <h2 className="text-xl font-bold leading-7">{isUp ? "আজ দাম বেড়েছে" : "আজ দাম কমেছে"}</h2>
      </div>
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <p className="rounded-2xl border border-base-300 bg-base-100 p-4 text-sm text-base-content/70">
          আজ কোনো পণ্যের দাম {isUp ? "বাড়েনি" : "কমেনি"}।
        </p>
      )}
    </section>
  );
}
