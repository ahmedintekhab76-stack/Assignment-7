import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/api";
import { toBn, toBnPct, unitBn } from "@/lib/bn";
import { requireSession } from "@/lib/session";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);
  return { title: product ? product.nameBn : "পাতা পাওয়া যায়নি" };
}

export default async function ProductDetailsPage({ params }: Props) {
  const { slug } = await params;

  // Protected route: login না করা থাকলে /signin এ চলে যাবে (লগইনের পর আবার এখানেই ফিরবে)
  await requireSession(`/product/${slug}`);

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const unit = unitBn(product.unit);
  const markets = product.markets ?? [];

  // দামের সারসংক্ষেপ: সর্বনিম্ন, সর্বাধিক, গড়
  const minPrice = markets.length ? Math.min(...markets.map((m) => m.min)) : product.today;
  const maxPrice = markets.length ? Math.max(...markets.map((m) => m.max)) : product.today;
  const avgPrice = markets.length
    ? Math.round(markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / markets.length)
    : product.today;

  // গতকালের তুলনায় পরিবর্তন
  const diff = Math.abs(product.today - product.yesterday);
  const dir = product.change.dir;
  const changeColor = dir === "up" ? "text-error" : dir === "down" ? "text-success" : "text-base-content/60";
  const changeArrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "−";
  const changeWord = dir === "up" ? "বেড়েছে" : dir === "down" ? "কমেছে" : "অপরিবর্তিত";

  return (
    <div className="container-page flex flex-col gap-6 py-6">
      {/* Breadcrumb: হোম > category > পণ্য */}
      <nav aria-label="breadcrumb" className="py-2 text-sm leading-5">
        <ol className="flex flex-wrap items-center">
          <li className="px-1">
            <Link href="/" className="hover:text-primary hover:underline">
              হোম
            </Link>
          </li>
          <li className="flex items-center gap-3 px-2">
            <Chevron />
            <Link href={`/category/${product.category}`} className="hover:text-primary hover:underline">
              {product.categoryNameBn}
            </Link>
          </li>
          <li className="flex items-center gap-3 px-2">
            <Chevron />
            <span aria-current="page">{product.nameBn}</span>
          </li>
        </ol>
      </nav>

      {/* ওপরের summary card */}
      <section className="rounded-2xl border border-base-300 bg-base-100 p-[21px]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-4xl leading-10">
            {product.image}
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-[26px] leading-9 font-bold sm:text-3xl">{product.nameBn}</h1>
            <p className="text-sm leading-5 text-base-content/70">
              প্রতি {unit} · {product.categoryNameBn}
            </p>
            <p className="mt-2 text-sm leading-5">
              গতকালের তুলনায় আজ দাম <strong className="font-semibold">{changeWord}</strong>
              {dir !== "flat" && <> · {toBn(diff)} টাকা</>}
            </p>
          </div>
          <div className="flex flex-col items-center rounded-2xl bg-base-200 px-5 py-5 text-center">
            <p className="text-sm leading-5 text-base-content/70">আজকের দাম</p>
            <p className="text-3xl leading-9 font-bold">{toBn(product.today)}</p>
            <p className="text-sm leading-5 text-base-content/70">টাকা / {unit}</p>
            <p className={`mt-[3px] flex items-center gap-1 text-sm leading-5 font-semibold ${changeColor}`}>
              <span aria-hidden>{changeArrow}</span>
              {toBnPct(dir === "flat" ? 0 : product.change.pct)}%
            </p>
          </div>
        </div>
      </section>

      {/* দামের সারসংক্ষেপ + বাজারভিত্তিক table */}
      <section className="rounded-2xl border border-base-300 bg-base-100 p-[21px]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h2 className="text-lg leading-7 font-semibold">দামের সারসংক্ষেপ</h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <Stat label="সর্বনিম্ন দাম" value={minPrice} note="সবচেয়ে কম দামের বাজার" color="text-success" bold />
              <Stat label="সর্বাধিক দাম" value={maxPrice} note="সবচেয়ে বেশি দামের বাজার" color="text-error" />
              <Stat label="গড় দাম" value={avgPrice} note={`প্রতি ${unit}-এর হিসাবে`} color="text-primary" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-lg leading-7 font-semibold">বাজারভিত্তিক আজকের দাম</h2>

            {/* Desktop / tablet: table */}
            <div className="hidden overflow-hidden rounded-2xl border border-base-300 bg-base-100 md:block">
              <table className="w-full text-sm leading-5">
                <thead>
                  <tr className="border-b border-base-300 text-base-content/60">
                    <th className="px-4 py-3.5 text-left font-semibold">বাজার</th>
                    <th className="px-4 py-3.5 text-left font-semibold">বিভাগ</th>
                    <th className="px-4 py-3.5 text-right font-semibold">সর্বনিম্ন</th>
                    <th className="px-4 py-3.5 text-right font-semibold">সর্বাধিক</th>
                    <th className="px-4 py-3.5 text-right font-semibold">গড়</th>
                  </tr>
                </thead>
                <tbody>
                  {markets.map((m, i) => (
                    <tr key={`${m.market}-${i}`} className={i % 2 === 1 ? "bg-base-200" : ""}>
                      <td className="px-4 py-3 font-medium">{m.market}</td>
                      <td className="px-4 py-3 text-base-content/60">{m.division}</td>
                      <td className="px-4 py-3 text-right">{toBn(m.min)} টাকা</td>
                      <td className="px-4 py-3 text-right">{toBn(m.max)} টাকা</td>
                      <td className="px-4 py-3 text-right font-semibold">{toBn(Math.round((m.min + m.max) / 2))} টাকা</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile: প্রতিটি বাজার আলাদা ছোট card */}
            <ul className="flex flex-col gap-2 md:hidden">
              {markets.map((m, i) => (
                <li key={`${m.market}-${i}`} className={`rounded-xl border border-base-300 p-3 ${i % 2 === 1 ? "bg-base-200" : "bg-base-100"}`}>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-semibold">{m.market}</span>
                    <span className="text-xs text-base-content/60">{m.division}</span>
                  </div>
                  <dl className="mt-2 grid grid-cols-3 gap-2 text-center text-xs">
                    <div>
                      <dt className="text-base-content/60">সর্বনিম্ন</dt>
                      <dd className="text-sm">{toBn(m.min)} টাকা</dd>
                    </div>
                    <div>
                      <dt className="text-base-content/60">সর্বাধিক</dt>
                      <dd className="text-sm">{toBn(m.max)} টাকা</dd>
                    </div>
                    <div>
                      <dt className="text-base-content/60">গড়</dt>
                      <dd className="text-sm font-semibold">{toBn(Math.round((m.min + m.max) / 2))} টাকা</dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  note,
  color,
  bold,
}: {
  label: string;
  value: number;
  note: string;
  color: string;
  bold?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-base-300 bg-base-100 px-[25px] py-[17px]">
      <p className="text-xs leading-[18px] text-base-content/60">{label}</p>
      <p className={`text-2xl leading-8 ${bold ? "font-bold" : "font-bold"} ${color}`}>{toBn(value)} টাকা</p>
      <p className="text-xs leading-[18px] text-base-content/60">{note}</p>
    </div>
  );
}

function Chevron() {
  return (
    <svg width="6" height="8" viewBox="0 0 6 8" fill="none" aria-hidden>
      <path d="M1 1l3.5 3L1 7" stroke="#1d271f" strokeOpacity="0.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
