import Link from "next/link";
import CategoryNav from "./CategoryNav";
import UserMenu from "./UserMenu";
import { getCategories } from "@/lib/api";
import { getSession } from "@/lib/session";
import { banglaDate } from "@/lib/bn";
import type { Category } from "@/lib/types";

/** পুরো site এর ওপরের অংশ: logo + তারিখ, ডানে login/profile, নিচে category link */
export default async function Header() {
  const [session, categories] = await Promise.all([
    getSession().catch(() => null),
    getCategories().catch(() => [] as Category[]),
  ]);

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1164px] items-center gap-3 px-4 py-3">
        {/* Logo + বাংলা তারিখ */}
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-lg text-primary-content">
            🛒
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="text-xl leading-7 font-bold tracking-[-0.5px]">বাজার দর</span>
            <span className="truncate text-xs leading-4 text-base-content/60">{banglaDate()}</span>
          </span>
        </Link>

        <div className="flex-1" />

        {/* ডান পাশ: login থাকলে profile menu, না থাকলে দুটো button */}
        {session ? (
          <UserMenu name={session.user.name} email={session.user.email} image={session.user.image} />
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/signin" className="btn btn-ghost !px-3 sm:!px-[17px]">
              সাইন ইন
            </Link>
            <Link href="/signup" className="btn btn-primary !px-3 sm:!px-[17px]">
              সাইন আপ
            </Link>
          </div>
        )}
      </div>
      <CategoryNav categories={categories} />
    </header>
  );
}
