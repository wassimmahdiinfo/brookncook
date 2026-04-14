import { supabase } from "@/lib/supabaseClient";

// log sql
export const logAction = async (action: string, productId: string | null, email?: string) => {
  await supabase.from("histo_action").insert([
    {
      action,
      product_id: productId,
      user_email: email,
    },
  ]);
};