"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();

  async function handle() {
    const { error } = await signOut();
    if (error) {
      toast.error(error.message || "সাইন আউট করা যায়নি");
      return;
    }
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <button type="button" onClick={handle} className="btn btn-outline-error">
      <span aria-hidden>↩</span> সাইন আউট
    </button>
  );
}
