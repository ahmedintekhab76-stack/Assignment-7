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
  ? mongodbAdapter(client.db(process.env.MONGODB_DB || "bazardor"), { client })
  : memoryAdapter(globalForAuth._memoryDb);

// Google/GitHub এর key থাকলেই শুধু ওই provider চালু হবে
const socialProviders: Record<string, { clientId: string; clientSecret: string }> = {};
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  socialProviders.google = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
}
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  socialProviders.github = {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  };
}

export const auth = betterAuth({
  database,
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
    autoSignIn: false, // Sign Up এর পর নিজে নিজে login হবে না — Sign In page এ যাবে
    minPasswordLength: 6,
  },
  socialProviders,
  plugins: [nextCookies()],
});
