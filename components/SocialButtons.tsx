"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

function GoogleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.27-2.09 3.57-5.17 3.57-8.81Z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.87-3c-1.07.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.1A12 12 0 0 0 12 24Z" />
      <path fill="#FBBC05" d="M5.27 14.28A7.2 7.2 0 0 1 4.9 12c0-.79.14-1.56.37-2.28v-3.1H1.27A12 12 0 0 0 0 12c0 1.94.46 3.77 1.27 5.38l4-3.1Z" />
      <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.95 1.19 15.24 0 12 0A12 12 0 0 0 1.27 6.62l4 3.1C6.22 6.86 8.87 4.75 12 4.75Z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#1d271f" aria-hidden>
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.74.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

/** "Google দিয়ে চালিয়ে যান" ও "GitHub দিয়ে চালিয়ে যান" button — Sign In আর Sign Up দুই page এই লাগে */
export default function SocialButtons({ callbackURL = "/" }: { callbackURL?: string }) {
  const [loading, setLoading] = useState<"google" | "github" | null>(null);

  async function handle(provider: "google" | "github") {
    setLoading(provider);
    try {
      const { error } = await signIn.social({ provider, callbackURL });
      if (error) {
        toast.error(error.message || `${provider === "google" ? "Google" : "GitHub"} দিয়ে লগইন করা যায়নি`);
        setLoading(null);
      }
      // সফল হলে browser নিজে provider এর page এ চলে যায়
    } catch {
      toast.error("লগইন শুরু করা যায়নি, আবার চেষ্টা করুন");
      setLoading(null);
    }
  }

  const cls =
    "btn flex-1 border-base-300 bg-transparent text-base-content hover:!bg-hover-neutral hover:!border-hover-neutral-border !px-3";

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <button type="button" onClick={() => handle("google")} disabled={loading !== null} className={cls}>
        <GoogleIcon />
        <span>Google দিয়ে চালিয়ে যান</span>
      </button>
      <button type="button" onClick={() => handle("github")} disabled={loading !== null} className={cls}>
        <GitHubIcon />
        <span>GitHub দিয়ে চালিয়ে যান</span>
      </button>
    </div>
  );
}
