/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { createClient } from "../../../utils/supabase/server";

export async function getPrincingData(): Promise<any> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from("plans").select("*");

    if (error) return { ok: false, message: error.message };

    return { ok: true, data };
  } catch (error) {
    return { ok: false, message: "Server error" };
  }
}
