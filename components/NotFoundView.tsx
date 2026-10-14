import Link from "next/link";

/** 404 এর মতো বার্তা + হোম পেজে ফেরার button (not-found page ও খালি category দুই জায়গায় ব্যবহার হয়) */
export default function NotFoundView({
  title = "পাতাটি খুঁজে পাওয়া যায়নি",
  message = "আপনি যে পাতাটি খুঁজছেন সেটি নেই, অথবা সরিয়ে ফেলা হয়েছে।",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="container-page flex flex-col items-center gap-3 py-20 text-center">
      <p className="text-6xl font-bold text-primary">৪০৪</p>
      <h1 className="text-2xl leading-8 font-bold">{title}</h1>
      <p className="max-w-md text-sm leading-5 text-base-content/70">{message}</p>
      <Link href="/" className="btn btn-primary mt-2">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
