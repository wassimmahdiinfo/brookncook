"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ProductsAdmin() {
  const [products, setProducts] = useState<any[]>([]);

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*");
    setProducts(data || []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔄 Activer / désactiver
  const toggleActive = async (product: any) => {
    await supabase
      .from("products")
      .update({ is_active: !product.is_active })
      .eq("id", product.id);

    fetchProducts();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-[#5c3d2e]">
        Gestion des produits
      </h1>

      <div className="space-y-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">{p.name}</h2>
              <p className="text-sm text-gray-500">{p.price} TND</p>

              <p className="text-xs mt-1">
                {p.is_active ? (
                  <span className="text-green-600">Actif</span>
                ) : (
                  <span className="text-red-500">Désactivé</span>
                )}
              </p>
            </div>

            <div className="flex gap-2">

              <button
                onClick={() => toggleActive(p)}
                className={`px-3 py-1 rounded text-white ${
                  p.is_active ? "bg-red-500" : "bg-green-500"
                }`}
              >
                {p.is_active ? "Désactiver" : "Activer"}
              </button>

              <button className="bg-yellow-500 text-white px-3 py-1 rounded">
                Modifier
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}