"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";
import { banglaAuthError, safeRedirect } from "@/lib/auth-messages";
import { Divider, Field } from "./AuthShell";
import SocialButtons from "./SocialButtons";

export default function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = safeRedirect(params.get("redirect"));
  const [loading, setLoading] = useState(false);

  // Protected page এ login ছাড়া ঢুকতে গেলে এখানে পাঠানো হয় — তখন একটা toast দেখাই
  useEffect(() => {
    if (params.get("reason") === "protected") {
      toast.error("এই পাতাটি দেখতে আগে সাইন ইন করুন", { id: "protected-route" });
    }
  }, [params]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");

    if (!email || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড দুটোই দিন");
      return;
    }

    setLoading(true);
    const { error } = await signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(banglaAuthError(error));
      return;
    }
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(redirectTo);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      <Field label="ইমেইল" id="email" type="email" placeholder="you@example.com" autoComplete="email" required />
      <Field
        label="পাসওয়ার্ড"
        id="password"
        type="password"
        placeholder="আপনার পাসওয়ার্ড"
        autoComplete="current-password"
        required
      />
      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
      </button>
      <Divider />
      <SocialButtons callbackURL={redirectTo} />
      <p className="text-center text-sm leading-[21px]">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="text-primary hover:text-link-hover hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </form>
  );
}
