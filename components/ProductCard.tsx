import Link from "next/link";
import PriceChange from "./PriceChange";
import { toBn, unitBn } from "@/lib/bn";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="block rounded-2xl border border-base-300 bg-base-100 p-4 transition hover:border-primary hover:shadow-[0_4px_6px_-1px_rgb(0_0_0/0.1),0_2px_4px_-2px_rgb(0_0_0/0.1)]"
    >
      <div className="flex gap-3">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-base-200 text-2xl">
          {product.image}
        </div>
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold leading-6">{product.nameBn}</h3>
          <p className="text-xs leading-4 text-base-content/60">প্রতি {unitBn(product.unit)}</p>
        </div>
      </div>
      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs leading-4 text-base-content/70">আজকের দাম</p>
          <p className="text-xl font-bold leading-7">{toBn(product.today)} টাকা</p>
        </div>
        <PriceChange change={product.change} />
      </div>
    </Link>
  );
}
