"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateUser } from "@/lib/auth-client";
import { Field } from "./AuthShell";

export default function UpdateProfileForm({ currentName }: { currentName: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = String(new FormData(e.currentTarget).get("name") || "").trim();

    if (!name) {
      toast.error("নাম ফাঁকা রাখা যাবে না");
      return;
    }

    setLoading(true);
    // Better Auth এর updateUser: নামটা database এ বদলে দেয়
    const { error } = await updateUser({ name });
    setLoading(false);

    if (error) {
      toast.error(error.message || "তথ্য আপডেট করা যায়নি");
      return;
    }
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4" noValidate>
      <Field label="নাম" id="name" type="text" defaultValue={currentName} placeholder="আপনার নাম" autoComplete="name" />
      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
      </button>
    </form>
  );
}
