import { createServerClient } from "@/lib/supabase/server";

export default async function sitemap() {
  const supabase = createServerClient();
  const baseUrl = "https://brookncook.vercel.app";

  const { data: products } = await supabase
    .from("products")
    .select("slug");

  const productUrls =
    products?.map((p) => ({
      url: `${baseUrl}/products/${p.slug}`,
      lastModified: new Date().toISOString(),
    })) || [];

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date().toISOString(),
    },
    ...productUrls,
  ];
}