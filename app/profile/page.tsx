import type { Metadata } from "next";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import SignOutButton from "@/components/SignOutButton";
import { requireSession } from "@/lib/session";

export const metadata: Metadata = { title: "আমার প্রোফাইল" };

export default async function ProfilePage() {
  // Protected route: login ছাড়া এই page দেখা যাবে না
  const session = await requireSession("/profile");
  const { user } = session;

  return (
    <div className="mx-auto flex w-full max-w-[768px] flex-col gap-6 px-4 pt-6 pb-12">
      <div>
        <h1 className="text-2xl leading-8 font-bold">আমার প্রোফাইল</h1>
        <p className="text-sm leading-5 text-base-content/70">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      {/* ছবি, নাম, ইমেইল ও সাইন আউট */}
      <div className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-100 p-[25px] sm:flex-row sm:items-center">
        <Avatar name={user.name} image={user.image} size={80} radius={16} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-xl leading-7 font-semibold">{user.name}</p>
          <p className="truncate text-base leading-6 text-base-content/70">{user.email}</p>
        </div>
        <SignOutButton />
      </div>

      {/* তথ্য card: নাম দেখায়, আপডেট চাপলে আলাদা route এ যায় */}
      <div className="flex flex-col gap-3 rounded-2xl border border-base-300 bg-base-100 p-[21px]">
        <h2 className="text-lg leading-7 font-semibold">তথ্য</h2>
        <div className="flex flex-col gap-4 p-6">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm leading-[21px] font-medium">
              নাম
            </label>
            <input id="name" className="input" value={user.name} readOnly />
          </div>
          <Link href="/profile/update" className="btn btn-primary w-full">
            আপডেট
          </Link>
        </div>
      </div>
    </div>
  );
}
