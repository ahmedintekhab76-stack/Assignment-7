"use client";

import { useMemo, useState } from "react";
import ProductGrid from "./ProductGrid";
import { bnToNumber, toBn } from "@/lib/bn";
import type { Product } from "@/lib/types";

type SortKey = "default" | "asc" | "desc";

/** Category page এর sort dropdown + product list (client component, কারণ user click করে sort বদলায়) */
export default function CategoryProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortKey>("default");

  const sorted = useMemo(() => {
    const list = [...products];
    // number হিসেবে sort করছি (string হিসেবে নয়), তাই "৯" এর পরে "১০০" ঠিকমতো আসে
    if (sort === "asc") list.sort((a, b) => bnToNumber(a.today) - bnToNumber(b.today));
    if (sort === "desc") list.sort((a, b) => bnToNumber(b.today) - bnToNumber(a.today));
    return list;
  }, [products, sort]);

  return (
    <div className="flex flex-col gap-4">
      {/* Sort control */}
      <div className="flex items-center justify-end gap-3 rounded-2xl border border-base-300 bg-base-100 p-[17px]">
        <label htmlFor="sort" className="text-sm leading-5 text-base-content/70">
          সাজান
        </label>
        <div className="relative">
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="h-8 cursor-pointer appearance-none rounded-lg border border-base-content/20 bg-base-100 pr-8 pl-[13px] text-xs outline-none focus:border-base-content"
          >
            <option value="default">ডিফল্ট</option>
            <option value="asc">দাম: কম থেকে বেশি</option>
            <option value="desc">দাম: বেশি থেকে কম</option>
          </select>
          {/* chevron (নিচের তীর) icon */}
          <svg
            className="pointer-events-none absolute top-1/2 right-[11px] -translate-y-1/2"
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            aria-hidden
          >
            <path d="M2 3.5 5 6.5 8 3.5" stroke="#1d271f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <p className="text-sm leading-5">মোট {toBn(sorted.length)}টি পণ্য দেখানো হচ্ছে</p>
      <ProductGrid products={sorted} />
    </div>
  );
}
