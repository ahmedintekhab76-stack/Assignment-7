type AuthError = { code?: string; message?: string; status?: number } | null | undefined;

/** Better Auth এর ইংরেজি error কে সহজ বাংলায় বদলে দেয় (toast এ দেখানোর জন্য) */
export function banglaAuthError(error: AuthError): string {
  if (!error) return "কিছু একটা ভুল হয়েছে, আবার চেষ্টা করুন";
  const code = (error.code || "").toUpperCase();
  const msg = (error.message || "").toLowerCase();
  const status = error.status ?? 0;

  if (code === "INVALID_EMAIL_OR_PASSWORD" || msg.includes("invalid email or password"))
    return "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে";
  if (code.includes("USER_ALREADY_EXISTS") || msg.includes("already exists"))
    return "এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা আছে";
  if (code === "INVALID_EMAIL" || msg.includes("invalid email")) return "সঠিক ইমেইল দিন";
  if (code.includes("PASSWORD_TOO_SHORT") || msg.includes("too short"))
    return "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে";
  if (code.includes("PROVIDER_NOT_FOUND") || msg.includes("provider not found"))
    return "এই সোশ্যাল লগইন এখনো চালু করা হয়নি";
  if (msg.includes("invalid origin") || msg.includes("origin"))
    return "এই ঠিকানা থেকে লগইন অনুমোদিত নয় (Origin error)";
  if (msg.includes("failed to fetch") || msg.includes("network") || msg.includes("load failed"))
    return "ইন্টারনেট সংযোগ পরীক্ষা করুন";
  if (status >= 500) return "সার্ভারে সমস্যা হচ্ছে, কিছুক্ষণ পর আবার চেষ্টা করুন";
  return error.message || "কিছু একটা ভুল হয়েছে, আবার চেষ্টা করুন";
}

/** redirect parameter নিরাপদ কিনা দেখে (শুধু নিজের site এর ভেতরের path নেবে) */
export function safeRedirect(value: string | null | undefined, fallback = "/"): string {
  if (value && value.startsWith("/") && !value.startsWith("//")) return value;
  return fallback;
}
