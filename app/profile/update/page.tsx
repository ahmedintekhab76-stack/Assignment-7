import type { Metadata } from "next";
import Link from "next/link";
import UpdateProfileForm from "@/components/UpdateProfileForm";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = { title: "তথ্য আপডেট" };

export default async function UpdateProfilePage() {
  const session = await requireSession("/profile/update");

  return (
    <div className="mx-auto flex w-full max-w-[448px] flex-col gap-6 px-4 pt-10 pb-12">
      <div className="flex flex-col gap-1 text-center">
        <h1 className="text-2xl leading-8 font-bold">তথ্য আপডেট করুন</h1>
        <p className="text-sm leading-5 text-base-content/70">আপনার নাম বদলে নতুন নাম সংরক্ষণ করুন।</p>
      </div>
      <div className="rounded-2xl border border-base-300 bg-base-100 p-6">
        <UpdateProfileForm currentName={session.user.name} />
      </div>
      <p className="text-center text-sm leading-5 text-base-content/70">
        <Link href="/profile" className="underline underline-offset-2 hover:text-primary">
          ← প্রোফাইলে ফিরে যান
        </Link>
      </p>
    </div>
  );
}
