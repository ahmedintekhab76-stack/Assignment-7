import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

/**
 * এখন কে login করা আছে (না থাকলে null) — server এ চলে।
 * Database এ সমস্যা হলেও page ভেঙে পড়বে না, শুধু "login নেই" ধরে নেবে।
 */
export async function getSession() {
  try {
    return await auth.api.getSession({ headers: await headers() });
  } catch (error) {
    console.error("[auth] session পড়া যায়নি:", error);
    return null;
  }
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
