"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut } from "@/lib/auth-client";
import Avatar from "./Avatar";

type Props = { name: string; email: string; image?: string | null };

/** Login করা থাকলে navbar এর ডান পাশে যে avatar + dropdown menu দেখায় */
export default function UserMenu({ name, email, image }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // বাইরে click করলে বা Esc চাপলে menu বন্ধ হবে
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  async function handleSignOut() {
    setOpen(false);
    const { error } = await signOut();
    if (error) {
      toast.error(error.message || "সাইন আউট করা যায়নি");
      return;
    }
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  const itemClass =
    "flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-left text-sm leading-[21px] transition-colors hover:bg-base-content/10";

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="btn btn-ghost !px-[9px] sm:!px-[17px]"
      >
        <Avatar name={name} image={image} />
        <span className="hidden max-w-[140px] truncate text-sm font-medium sm:inline">{name.split(" ")[0]}</span>
        <span className="text-xs opacity-60" aria-hidden>
          ▾
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute top-full right-0 z-50 mt-2 w-64 rounded-2xl border border-base-300 bg-base-100 p-[9px] shadow-[0_10px_15px_-3px_rgb(0_0_0/0.1),0_4px_6px_-4px_rgb(0_0_0/0.1)]"
        >
          <div className="px-3 py-2">
            <p className="truncate text-sm font-semibold leading-[21px]">{name}</p>
            <p className="truncate text-xs leading-4 opacity-70">{email}</p>
          </div>
          <Link href="/profile" role="menuitem" onClick={() => setOpen(false)} className={itemClass}>
            <span aria-hidden>👤</span> আমার প্রোফাইল
          </Link>
          <Link href="/#all-products" role="menuitem" onClick={() => setOpen(false)} className={itemClass}>
            <span aria-hidden>⚖️</span> বাজার তুলনা
          </Link>
          <button type="button" role="menuitem" onClick={handleSignOut} className={`${itemClass} text-error`}>
            <span aria-hidden>↩</span> সাইন আউট
          </button>
        </div>
      )}
    </div>
  );
}
