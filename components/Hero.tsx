import { banglaDate } from "@/lib/bn";

export default function Hero() {
  return (
    <section className="overflow-hidden rounded-3xl border border-base-300 bg-base-100">
      <div className="flex flex-col gap-6 px-4 py-10 md:h-[281px] md:flex-row md:items-start md:justify-between md:py-0 md:pt-2.5">
        <div className="flex max-w-[576px] flex-col items-start gap-2">
          {/* ছোট eyebrow লেখা: আজকের তারিখ */}
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium leading-5 text-primary">
            {banglaDate()}
          </span>
          {/* মূল heading */}
          <h1 className="text-[28px] font-bold leading-[1.25] sm:text-4xl sm:leading-[45px]">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <div className="h-1" />
          {/* subtitle */}
          <p className="text-base leading-6 text-base-content/70">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
            দামের পরিবর্তন এক জায়গায়।
          </p>
          <div className="h-3" />
          {/* CTA button: একই page এর #all-products section এ scroll করে (route বদলায় না) */}
          <a href="#all-products" className="btn btn-primary">
            সব পণ্য দেখুন
          </a>
        </div>
        {/* ডান পাশের banner ছবি */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/bazar-hero.png"
          alt="সবজি ও ফলের ঝুড়ি"
          width={315}
          height={263}
          className="mx-auto h-auto w-[220px] shrink-0 md:mx-0 md:w-[315px]"
        />
      </div>
    </section>
  );
}
