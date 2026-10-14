import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

/** এখন কে login করা আছে (না থাকলে null) — server এ চলে */
export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

/**
 * Protected route: login না থাকলে /signin এ পাঠিয়ে দেয়।
 * Login করার পর user আবার এই page এই ফিরে আসবে।
 */
export async function requireSession(returnTo: string) {
  const session = await getSession();
  if (!session) {
    redirect(`/signin?redirect=${encodeURIComponent(returnTo)}&reason=protected`);
  }
  return session;
}
