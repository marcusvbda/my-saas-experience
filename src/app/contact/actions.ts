"use server";

import { createClient } from "../../../utils/supabase/server";

export async function sendContact(
  name: string,
  email: string,
  message: string
) {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("contact_messages")
      .insert([{ name, email, message }]);

    if (error) {
      console.error("Error inserting data:", error.message);
      return { ok: false, message: "Failed to send the message." };
    }

    return {
      ok: true,
      message: "User signed up successfully!",
    };
  } catch (error) {
    return { ok: false, message: "Server error" };
  }
}
