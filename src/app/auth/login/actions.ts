"use server";

import { createClient } from "../../../../utils/supabase/server";

export async function login(email: string, password: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return { ok: false, message: error.message };

    return {
      ok: true,
      message: "Login successful!",
    };
  } catch (error) {
    return { ok: false, message: "Server error" };
  }
}

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
}
