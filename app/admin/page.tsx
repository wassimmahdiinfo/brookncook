"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*");
    setProducts(data || []);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ➕ Ajouter
  const handleAdd = async () => {
  const { data } = await supabase
    .from("products")
    .insert([form])
    .select();

  await logAction("create", data?.[0]?.id);

  setForm({ name: "", price: "", description: "" });
  fetchProducts();
};

  // ✏️ Activer édition
  const handleEdit = (p: any) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      price: p.price,
      description: p.description,
    });
  };

  // 💾 Sauvegarder
  const handleUpdate = async () => {
  const confirmUpdate = confirm("Confirmer la modification ?");
  if (!confirmUpdate) return;

  await supabase
    .from("products")
    .update(form)
    .eq("id", editingId);

  await logAction("update", editingId);

  setEditingId(null);
  setForm({ name: "", price: "", description: "" });
  fetchProducts();
};

  // ❌ Supprimer
  const handleDelete = async (id: string) => {
  const confirmDelete = confirm("Supprimer ce produit ?");
  if (!confirmDelete) return;

  await supabase.from("products").delete().eq("id", id);

  await logAction("delete", id);
  fetchProducts();
};

  // log sql
  const logAction = async (action: string, productId: string | null) => {
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

  return (
    <main className="min-h-screen bg-[#fffaf5] p-6">
      <h1 className="text-3xl font-bold mb-6 text-[#5c3d2e]">
        Admin Dashboard
      </h1>

      {/* FORM */}
      <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow mb-10">
        <input
          placeholder="Nom"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          placeholder="Prix"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full mb-3 p-2 border rounded"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="w-full mb-3 p-2 border rounded"
        />

        {editingId ? (
          <button
            onClick={handleUpdate}
            className="w-full bg-blue-500 text-white py-2 rounded-xl"
          >
            Sauvegarder
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className="w-full bg-[#5c3d2e] text-white py-2 rounded-xl"
          >
            Ajouter produit
          </button>
        )}
      </div>

      {/* LISTE */}
      <div className="max-w-3xl mx-auto space-y-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white p-4 rounded-xl shadow flex justify-between items-center"
          >
            <div>
              <h2 className="font-bold">{p.name}</h2>
              <p className="text-sm">{p.price}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(p)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Modifier
              </button>

              <button
                onClick={() => handleDelete(p.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}