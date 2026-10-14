import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryProducts from "@/components/CategoryProducts";
import NotFoundView from "@/components/NotFoundView";
import { getCategory, getProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug).catch(() => null);
  return { title: category ? category.nameBn : "পাতা পাওয়া যায়নি" };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  // ভুল slug হলে 404 page
  const category = await getCategory(slug);
  if (!category) notFound();

  const products = await getProducts(category.slug);

  return (
    <div className="container-page flex flex-col gap-6 py-6">
      {/* Title + icon */}
      <div className="rounded-2xl border border-base-300 bg-base-100 p-[21px]">
        <div className="flex items-center gap-3">
          <span className="text-4xl leading-10">{category.icon}</span>
          <div>
            <h1 className="text-2xl leading-8 font-bold">{category.nameBn}</h1>
            <p className="text-sm leading-5 text-base-content/70">
              {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>
      </div>

      {products.length > 0 ? (
        <CategoryProducts products={products} />
      ) : (
        // Empty state: category তে কোনো পণ্য নেই
        <NotFoundView title="এই ধরনে কোনো পণ্য নেই" message="এই category তে এখন কোনো পণ্য পাওয়া যায়নি।" />
      )}
    </div>
  );
}
