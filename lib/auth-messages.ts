/** Better Auth এর ইংরেজি error কে সহজ বাংলায় বদলে দেয় (toast এ দেখানোর জন্য) */
export function banglaAuthError(error: { code?: string; message?: string } | null | undefined): string {
  if (!error) return "কিছু একটা ভুল হয়েছে, আবার চেষ্টা করুন";
  const code = (error.code || "").toUpperCase();
  const msg = (error.message || "").toLowerCase();

  if (code === "INVALID_EMAIL_OR_PASSWORD" || msg.includes("invalid email or password"))
    return "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে";
  if (code.includes("USER_ALREADY_EXISTS") || msg.includes("already exists"))
    return "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা আছে";
  if (code === "INVALID_EMAIL" || msg.includes("invalid email")) return "সঠিক ইমেইল দিন";
  if (code.includes("PASSWORD_TOO_SHORT") || msg.includes("too short"))
    return "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে";
  if (msg.includes("failed to fetch") || msg.includes("network")) return "ইন্টারনেট সংযোগ পরীক্ষা করুন";
  return error.message || "কিছু একটা ভুল হয়েছে, আবার চেষ্টা করুন";
}

/** redirect parameter নিরাপদ কিনা দেখে (শুধু নিজের site এর ভেতরের path নেবে) */
export function safeRedirect(value: string | null | undefined, fallback = "/"): string {
  if (value && value.startsWith("/") && !value.startsWith("//")) return value;
  return fallback;
}
