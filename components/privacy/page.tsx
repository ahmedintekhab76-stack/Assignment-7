import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "প্রাইভেসি পলিসি" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto flex w-full max-w-[768px] flex-col gap-6 px-4 pt-6 pb-12">
      <div>
        <h1 className="text-2xl leading-8 font-bold">প্রাইভেসি পলিসি</h1>
        <p className="text-sm leading-5 text-base-content/70">
          বাজার দর (BazarDor) একটি শেখার প্রজেক্ট। আপনার তথ্য কীভাবে ব্যবহার হয় তা নিচে দেওয়া হলো।
        </p>
      </div>

      <section className="flex flex-col gap-2 rounded-2xl border border-base-300 bg-base-100 p-6">
        <h2 className="text-lg leading-7 font-semibold">আমরা কোন তথ্য নিই</h2>
        <p className="text-base leading-6">
          সাইন আপ বা সাইন ইন করার সময় আপনার নাম, ইমেইল ঠিকানা এবং (Google/GitHub দিয়ে লগইন করলে) প্রোফাইল ছবি
          নেওয়া হয়। ইমেইল দিয়ে সাইন আপ করলে পাসওয়ার্ড এনক্রিপ্ট (hash) করে রাখা হয়।
        </p>
      </section>

      <section className="flex flex-col gap-2 rounded-2xl border border-base-300 bg-base-100 p-6">
        <h2 className="text-lg leading-7 font-semibold">তথ্য কীভাবে ব্যবহার হয়</h2>
        <p className="text-base leading-6">
          এই তথ্য শুধু আপনাকে লগইন করানো, আপনার প্রোফাইল দেখানো এবং সুরক্ষিত পাতা (যেমন পণ্যের বিস্তারিত) খুলে
          দেওয়ার জন্য ব্যবহার হয়। আমরা আপনার তথ্য বিক্রি করি না বা কোনো তৃতীয় পক্ষকে বিজ্ঞাপনের জন্য দিই না।
        </p>
      </section>

      <section className="flex flex-col gap-2 rounded-2xl border border-base-300 bg-base-100 p-6">
        <h2 className="text-lg leading-7 font-semibold">তথ্য কোথায় রাখা হয়</h2>
        <p className="text-base leading-6">
          অ্যাকাউন্টের তথ্য একটি MongoDB ডাটাবেসে সংরক্ষিত থাকে। পণ্যের দামের তথ্য একটি পাবলিক প্র্যাকটিস API থেকে
          আনা হয় এবং এটি আসল বাজারের তথ্য নয়।
        </p>
      </section>

      <section className="flex flex-col gap-2 rounded-2xl border border-base-300 bg-base-100 p-6">
        <h2 className="text-lg leading-7 font-semibold">যোগাযোগ</h2>
        <p className="text-base leading-6">
          আপনার তথ্য মুছে ফেলতে বা কোনো প্রশ্ন থাকলে ইমেইল করুন: ahmedintekhab76@gmail.com
        </p>
      </section>

      <Link href="/" className="text-primary hover:text-link-hover hover:underline">
        ← হোমে ফিরে যান
      </Link>
    </div>
  );
}
