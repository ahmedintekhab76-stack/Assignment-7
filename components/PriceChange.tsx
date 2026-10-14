import { toBnPct } from "@/lib/bn";
import type { Product } from "@/lib/types";

/** দামের পরিবর্তন: বাড়লে লাল ▲, কমলে সবুজ ▼, একই থাকলে ধূসর −০.০% (Figma অনুযায়ী) */
export function changeParts(change: Product["change"]) {
  if (change.dir === "up") return { arrow: "▲", text: toBnPct(change.pct), color: "text-error" };
  if (change.dir === "down") return { arrow: "▼", text: toBnPct(change.pct), color: "text-success" };
  return { arrow: "−", text: toBnPct(0), color: "text-base-content/60" };
}

/** Product card এর ডান পাশের ছোট গোলাকার badge */
export default function PriceChange({ change }: { change: Product["change"] }) {
  const c = changeParts(change);
  return (
    <span
      className={`inline-flex h-6 items-center gap-1 rounded-full bg-base-200 px-2 text-xs font-semibold ${c.color}`}
    >
      <span aria-hidden>{c.arrow}</span>
      <span>{c.text}%</span>
    </span>
  );
}
