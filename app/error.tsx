"use client";

/** কোনো page এ data আনতে সমস্যা হলে (যেমন API বন্ধ) এই page দেখাবে */
export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container-page flex flex-col items-center gap-3 py-20 text-center">
      <p className="text-5xl">⚠️</p>
      <h1 className="text-2xl leading-8 font-bold">কিছু একটা ভুল হয়েছে</h1>
      <p className="max-w-md text-sm leading-5 text-base-content/70">
        তথ্য আনতে সমস্যা হচ্ছে। ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।
      </p>
      <button type="button" onClick={reset} className="btn btn-primary mt-2">
        আবার চেষ্টা করুন
      </button>
    </div>
  );
}
