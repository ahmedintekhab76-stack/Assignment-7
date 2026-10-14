import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

// /api/auth/* এ যত request আসবে সব Better Auth সামলাবে
export const { GET, POST } = toNextJsHandler(auth);
