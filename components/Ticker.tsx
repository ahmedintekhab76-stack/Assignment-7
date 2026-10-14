import { getProducts } from "@/lib/api";
import { toBn, unitBn } from "@/lib/bn";
import { changeParts } from "./PriceChange";
import type { Product } from "@/lib/types";

function TickerItem({ p }: { p: Product }) {
  const c = changeParts(p.change);
  return (
    <div className="flex shrink-0 items-center gap-1.5 border-r border-base-200 py-2 pr-[17px] pl-4 text-sm leading-5 whitespace-nowrap">
      <span>{p.image}</span>
      <span className="font-medium">{p.nameBn}</span>
      <span className="text-base-content/70">
        {toBn(p.today)} টাকা/{unitBn(p.unit)}
      </span>
      <span className={`font-semibold ${c.color}`}>
        {c.arrow} {c.text}%
      </span>
    </div>
  );
}

/** Navbar এর নিচের চলমান দামের strip (marquee) — অসীম ভাবে ঘোরে */
export default async function Ticker() {
  let products: Product[] = [];
  try {
    products = await getProducts();
  } catch {
    return null; // API না এলে strip টা দেখাবে না, বাকি site ঠিকই চলবে
  }
  if (products.length === 0) return null;

  return (
    <div className="ticker-wrap overflow-hidden border-b border-base-300 bg-base-100" aria-label="আজকের দামের তালিকা">
      {/* একই list দুইবার বসানো হয়েছে, যাতে ঘোরা কখনো থামে না */}
      <div className="ticker-track flex w-max">
        {[0, 1].map((n) => (
          <div key={n} className="flex" aria-hidden={n === 1}>
            {products.map((p) => (
              <TickerItem key={`${n}-${p.id}`} p={p} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
