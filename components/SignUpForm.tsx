"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signUp } from "@/lib/auth-client";
import { banglaAuthError } from "@/lib/auth-messages";
import { Divider, Field } from "./AuthShell";
import SocialButtons from "./SocialButtons";

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    const confirm = String(form.get("confirm") || "");

    // ছোট ছোট validation (ভুল হলে toast)
    if (!name || !email || !password || !confirm) {
      toast.error("সবগুলো ঘর পূরণ করুন");
      return;
    }
    if (password.length < 6) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে");
      return;
    }
    if (password !== confirm) {
      toast.error("দুটো পাসওয়ার্ড মিলছে না");
      return;
    }

    setLoading(true);
    const { error } = await signUp.email({ name, email, password });
    setLoading(false);

    if (error) {
      toast.error(banglaAuthError(error));
      return;
    }
    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এবার সাইন ইন করুন");
    router.push("/signin"); // নিয়ম অনুযায়ী: register শেষে login page এ যাবে
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      <Field label="নাম" id="name" type="text" placeholder="আপনার নাম" autoComplete="name" required />
      <Field label="ইমেইল" id="email" type="email" placeholder="you@example.com" autoComplete="email" required />
      <Field
        label="পাসওয়ার্ড"
        id="password"
        type="password"
        placeholder="কমপক্ষে ৬ অক্ষর"
        autoComplete="new-password"
        required
      />
      <Field
        label="পাসওয়ার্ড নিশ্চিত করুন"
        id="confirm"
        type="password"
        placeholder="পাসওয়ার্ড আবার লিখুন"
        autoComplete="new-password"
        required
      />
      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? "অ্যাকাউন্ট তৈরি হচ্ছে..." : "অ্যাকাউন্ট তৈরি করুন"}
      </button>
      <Divider />
      <SocialButtons callbackURL="/" />
      <p className="text-center text-sm leading-[21px]">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="text-primary hover:text-link-hover hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </form>
  );
}
