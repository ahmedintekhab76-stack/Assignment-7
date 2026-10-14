import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import AuthShell from "@/components/AuthShell";
import SignInForm from "@/components/SignInForm";
import { getSession } from "@/lib/session";

export const metadata: Metadata = { title: "সাইন ইন" };

export default async function SignInPage() {
  // আগে থেকেই login করা থাকলে আবার login page দেখানোর দরকার নেই
  if (await getSession()) redirect("/");

  return (
    <AuthShell title="সাইন ইন" subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।">
      {/* useSearchParams ব্যবহার করলে Suspense লাগে */}
      <Suspense>
        <SignInForm />
      </Suspense>
    </AuthShell>
  );
}
