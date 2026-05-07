//app/admin/products/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function PromotionsAdmin() {
  const [products, setProducts] = useState<any[]>([]);
  const [promotions, setPromotions] = useState<any[]>([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [promoMessage, setPromoMessage] = useState("");
  const [priority, setPriority] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*").eq("is_active", true);
    setProducts(data || []);
  };

  const fetchPromotions = async () => {
    const { data } = await supabase
      .from("promotions")
      .select("*, products(id, name)")
      .order("created_at", { ascending: false });
    setPromotions(data || []);
  };

  useEffect(() => {
    fetchProducts();
    fetchPromotions();
  }, []);

  const handleAddPromo = async () => {
    if (!selectedProductId || !promoMessage) return;
    const { error } = await supabase.from("promotions").insert([{
      product_id: selectedProductId,
      message: promoMessage,
      is_active: true,
      priority,
      start_date: startDate ? new Date(startDate).toISOString() : null,
      end_date: endDate ? new Date(endDate).toISOString() : null,
    }]);
    if (error) { alert("Erreur promo"); return; }
    setPromoMessage("");
    setSelectedProductId("");
    setStartDate("");
    setEndDate("");
    setPriority(0);
    fetchPromotions();
  };

  const handleDisablePromo = async (promoId: string) => {
    await supabase.from("promotions").update({ is_active: false }).eq("id", promoId);
    fetchPromotions();
  };

  const handleEnablePromo = async (promo: any) => {
    // Désactiver toutes les promos du même produit
    await supabase.from("promotions").update({ is_active: false }).eq("product_id", promo.product_id);
    // Activer celle-ci uniquement
    await supabase.from("promotions").update({ is_active: true }).eq("id", promo.id);
    fetchPromotions();
  };

  const handleDeletePromo = async (promoId: string) => {
    const confirm_ = confirm("Supprimer cette promotion ?");
    if (!confirm_) return;
    await supabase.from("promotions").delete().eq("id", promoId);
    fetchPromotions();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-[#5c3d2e]">Gestion des promotions</h1>

      {/* FORM */}
      <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow mb-10">
        <h2 className="font-bold mb-4">Créer une promotion</h2>
        <select className="w-full mb-3 p-2 border rounded"
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}>
          <option value="">Choisir un produit</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <input placeholder="Message promo" value={promoMessage}
          onChange={(e) => setPromoMessage(e.target.value)}
          className="w-full mb-3 p-2 border rounded" />
        <input type="number" placeholder="Priorité (0 = normal, 10 = important)"
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          className="w-full mb-3 p-2 border rounded" />
        <input type="datetime-local" value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full mb-3 p-2 border rounded" />
        <input type="datetime-local" value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full mb-3 p-2 border rounded" />
        <button onClick={handleAddPromo}
          className="w-full bg-green-500 text-white py-2 rounded-xl">
          Créer la promotion
        </button>
      </div>

      {/* LISTE PROMOTIONS */}
      <div className="max-w-3xl mx-auto space-y-4">
        <h2 className="font-bold text-lg">Promotions</h2>
        {promotions.map((promo) => (
          <div key={promo.id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
            <div>
              <p className="font-medium">{promo.message}</p>
              <p className="text-xs text-gray-500">Produit : {promo.products?.name}</p>
              <p className="text-xs text-gray-400">⭐ Priorité : {promo.priority}</p>
              <p className="text-xs text-gray-400">⏱ Début : {promo.start_date || "immédiat"}</p>
              <p className="text-xs text-gray-400">⏱ Fin : {promo.end_date || "illimité"}</p>
              <p className="text-xs mt-1">{promo.is_active ? "🟢 Active" : "🔴 Désactivée"}</p>
            </div>
            <div className="flex flex-col gap-2">
              {promo.is_active ? (
                <button onClick={() => handleDisablePromo(promo.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm">
                  Désactiver
                </button>
              ) : (
                <button onClick={() => handleEnablePromo(promo)}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm">
                  Réactiver
                </button>
              )}
              <button onClick={() => handleDeletePromo(promo.id)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm">
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}