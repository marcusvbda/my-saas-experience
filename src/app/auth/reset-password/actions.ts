"use server";

import { createClient } from "../../../../utils/supabase/server";

export async function updatePassword(password: string) {
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) return { ok: false, message: error.message };

    return {
      ok: true,
      message: "Password updated successfully",
    };
  } catch (error) {
    return { ok: false, message: "Server error" };
  }
}
