"use client";

import { createAuthClient } from "better-auth/react";

// Browser এ (client component এ) login/logout/update করার জন্য
export const authClient = createAuthClient();

export const { signIn, signUp, signOut, useSession, updateUser } = authClient;
