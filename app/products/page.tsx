import { supabase } from "@/lib/supabaseClient";
import ProductCard from "@/app/components/ProductCard";

export default async function ProductsPage() {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  return (
    <main className="min-h-screen bg-[#fffaf5] px-6 py-12">
      <h1 className="text-4xl font-bold text-center text-[#5c3d2e] mb-10">
        🍰 Nos Produits
      </h1>

      {!data || data.length === 0 ? (
        <p className="text-center text-gray-500">
          Aucun produit disponible
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {data.map((p: any) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}