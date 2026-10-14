import Hero from "@/components/Hero";
import MoversSection from "@/components/MoversSection";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";

export default async function HomePage() {
  const products = await getProducts();

  // Section A: যাদের দাম সবচেয়ে বেশি বেড়েছে (ওপরের ৬টি)
  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  // Section B: যাদের দাম সবচেয়ে বেশি কমেছে (ওপরের ৬টি)
  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  return (
    <div className="container-page flex flex-col gap-6 py-6">
      <Hero />
      <MoversSection direction="up" products={risers} />
      <MoversSection direction="down" products={fallers} />

      {/* Section C: সব পণ্য (Hero এর button এখানে scroll করে আনে) */}
      <section id="all-products" className="flex flex-col gap-3">
        <h2 className="text-xl font-bold leading-7">সব পণ্য</h2>
        <p className="text-sm leading-5">মোট {toBn(products.length)}টি পণ্য দেখানো হচ্ছে</p>
        <ProductGrid products={products} />
      </section>
    </div>
  );
}
