import { supabase } from "@/lib/supabaseClient";
import ProductCard from "@/app/components/ProductCard";

export default async function ProductsPage() {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  return (
    <main className="min-h-screen bg-[#fffaf5] px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-6 text-[#5c3d2e]">
        Cookies & Brownies faits maison à El Mourouj 🍪
      </h1>

      <p className="text-center text-gray-600 max-w-xl mx-auto mb-10">
        Brook’n’Cook vous propose des pâtisseries artisanales faites maison :
        cookies, brownies et délices sans conservateur, sans colorant et 100% pur beurre.
        Commandez facilement depuis El Mourouj et ses environs.
      </p>

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