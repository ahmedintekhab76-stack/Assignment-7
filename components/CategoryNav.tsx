"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Category } from "@/lib/types";

/** Navbar এর category link গুলো। যে category তে আছি সেটা সবুজ (active) হয়ে থাকে। */
export default function CategoryNav({ categories }: { categories: Category[] }) {
  const pathname = usePathname();

  return (
    <nav aria-label="পণ্যের ধরন" className="border-t border-base-200 bg-base-100">
      <div className="container-page">
        <ul className="no-scrollbar flex items-center gap-1 overflow-x-auto py-2">
          {categories.map((c) => {
            const active = pathname === `/category/${c.slug}`;
            return (
              <li key={c.id} className="shrink-0">
                <Link
                  href={`/category/${c.slug}`}
                  aria-current={active ? "page" : undefined}
                  className={`flex h-8 items-center gap-1.5 rounded-lg border px-[13px] text-xs font-semibold transition-colors ${
                    active
                      ? "border-primary-strong bg-primary text-primary-content shadow-[0_3px_2px_-2px_rgb(5_137_62/0.3)]"
                      : "border-transparent text-base-content hover:border-hover-neutral-border hover:bg-hover-neutral"
                  }`}
                >
                  <span aria-hidden>{c.icon}</span>
                  <span>{c.nameBn}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
