import { supabase } from "@/lib/supabaseClient";

export default async function sitemap() {
  const baseUrl = "https://brookncook.vercel.app";

  const { data: products } = await supabase
    .from("products")
    .select("slug");

  const productUrls =
    products?.map((p) => ({
      url: `${baseUrl}/products/${p.slug}`,
      lastModified: new Date(),
    })) || [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
    },
    ...productUrls,
  ];
}