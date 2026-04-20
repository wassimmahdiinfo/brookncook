import { supabase } from "@/lib/supabaseClient";

export default async function ProductPage({ params }: any) {
  const { slug } = params;

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!product) return <p>Produit introuvable</p>;

  return (
    <main className="p-6 bg-[#fffaf5] min-h-screen">

      <h1 className="text-3xl font-bold text-[#5c3d2e] mb-4">
        {product.name}
      </h1>

      <img
        src={product.image}
        alt={`${product.name} fait maison Brook'n'Cook El Mourouj`}
        className="w-full max-w-md rounded-xl mb-4"
      />

      <p className="text-gray-600 mb-4">{product.description}</p>

      <p className="text-xl font-bold text-[#5c3d2e]">
        {product.price} TND
      </p>

    </main>
  );
}