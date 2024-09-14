"use server";

import { createClient } from "../../../../utils/supabase/server";

export async function sendResetEmail(email: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) return { ok: false, message: error.message };

    return {
      ok: true,
      message: "Check your email for a link to reset your password",
    };
  } catch (error) {
    return { ok: false, message: "Server error" };
  }
}
