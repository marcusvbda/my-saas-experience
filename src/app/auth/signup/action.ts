"use server";

import { createClient } from "../../../../utils/supabase/server";

export async function signup(email: string, password: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) return { ok: false, message: error.message };

    return {
      ok: true,
      message: "User signed up successfully!",
    };
  } catch (error) {
    return { ok: false, message: "Server error" };
  }
}
