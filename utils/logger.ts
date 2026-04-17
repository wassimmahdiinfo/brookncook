import { supabase } from "@/lib/supabaseClient";

export const logAction = async (
  action: string,
  product: any | null
) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  await supabase.from("histo_action").insert([
    {
      action,
      product_id: product?.id || null,
      user_email: user?.email,

      name: product?.name || null,
      price: product?.price || null,
      image: product?.image || null,
      description: product?.description || null,
    },
  ]);
};