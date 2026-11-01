import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { memoryAdapter } from "better-auth/adapters/memory";
import { nextCookies } from "better-auth/next-js";
import { getMongoClient } from "./mongodb";

const client = getMongoClient();

// MONGODB_URI দেওয়া থাকলে MongoDB তে user save হবে।
// না থাকলে শুধু practice এর জন্য memory তে save হবে (server restart দিলে মুছে যাবে)।
// (memory data কে global এ রাখা হয়েছে, যাতে বিভিন্ন page থেকেও একই data পাওয়া যায়)
const globalForAuth = globalThis as unknown as { _memoryDb?: Record<string, unknown[]> };
globalForAuth._memoryDb ??= { user: [], session: [], account: [], verification: [] };

const database = client
  ? mongodbAdapter(client.db(process.env.MONGODB_DB?.trim() || "bazardor"), {
      client,
      transaction: false, // সব MongoDB setup এ যেন কাজ করে
    })
  : memoryAdapter(globalForAuth._memoryDb);

if (!client && process.env.NODE_ENV === "production") {
  console.warn("[auth] MONGODB_URI দেওয়া নেই! Deploy এ user data save হবে না — environment variable বসাও।");
}

// Site এর নিজের address: আগে BETTER_AUTH_URL, না থাকলে Netlify/Vercel নিজে যা দেয় সেটা
const siteUrl = (
  process.env.BETTER_AUTH_URL ||
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.URL || // Netlify এর মূল site address
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined)
)
  ?.trim()
  .replace(/\/+$/, "");

// Google/GitHub এর key থাকলেই শুধু ওই provider চালু হবে
const socialProviders: Record<string, { clientId: string; clientSecret: string }> = {};
const googleId = process.env.GOOGLE_CLIENT_ID?.trim();
const googleSecret = process.env.GOOGLE_CLIENT_SECRET?.trim();
const githubId = process.env.GITHUB_CLIENT_ID?.trim();
const githubSecret = process.env.GITHUB_CLIENT_SECRET?.trim();
if (googleId && googleSecret) socialProviders.google = { clientId: googleId, clientSecret: googleSecret };
if (githubId && githubSecret) socialProviders.github = { clientId: githubId, clientSecret: githubSecret };

export const auth = betterAuth({
  database,
  baseURL: siteUrl,
  secret: process.env.BETTER_AUTH_SECRET,
  // কোন কোন address থেকে আসা request নিরাপদ — না মিললে "Invalid origin" error আসে
  trustedOrigins: [
    siteUrl,
    process.env.URL, // Netlify
    process.env.DEPLOY_PRIME_URL, // Netlify branch/preview
    process.env.DEPLOY_URL, // Netlify প্রতিটি deploy এর আলাদা address
    "http://localhost:3000",
    "https://*.netlify.app",
    "https://*.vercel.app",
  ].filter((origin): origin is string => Boolean(origin)),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false, // Sign Up এর পর নিজে নিজে login হবে না — Sign In page এ যাবে
    minPasswordLength: 6,
  },
  socialProviders,
  // একই ইমেইলে আগে email/password দিয়ে account খোলা থাকলেও Google/GitHub দিয়ে login করা যাবে
  // (Google ও GitHub ইমেইল যাচাই করে, তাই এদের trusted ধরা নিরাপদ)
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github", "email-password"],
      // email/password দিয়ে খোলা account এর ইমেইল verify করা না থাকলেও Google/GitHub link করা যাবে
      requireLocalEmailVerified: false,
    },
  },
  plugins: [nextCookies()],
});
