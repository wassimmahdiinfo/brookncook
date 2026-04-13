import { supabase } from "@/lib/supabaseClient";

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
            <div key={p.id} className="bg-white p-6 rounded-2xl shadow">
              <h2 className="font-bold">{p.name}</h2>
              <p>{p.description}</p>
              <p>{p.price}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}