import { supabase } from "@/lib/supabaseClient";

export const logAction = async (
  action: string,
  productId: string | null
) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  await supabase.from("histo_action").insert([
    {
      action,
      product_id: productId,
      user_email: user?.email,
    },
  ]);
};