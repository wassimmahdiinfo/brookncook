//app/admin/products/page.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { logAction } from "@/utils/logger";
import Image from "next/image";

// ✅ Slug robuste — gère accents et caractères spéciaux
const generateSlug = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replaceAll(" ", "-");

export default function ProductsAdmin() {
  const [products, setProducts] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", price: "", description: "" });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*");
    setProducts(data || []);
  };

  useEffect(() => { fetchProducts(); }, []);

  const uploadImage = async () => {
    if (!imageFile) return null;
    const fileName = Date.now() + "-" + imageFile.name;
    const { error } = await supabase.storage.from("products").upload(fileName, imageFile);
    if (error) { console.error(error); return null; }
    const { data: publicUrl } = supabase.storage.from("products").getPublicUrl(fileName);
    return publicUrl.publicUrl;
  };

  // ✅ Supprime l'image du Storage avant de supprimer le produit
  const deleteImage = async (imageUrl: string) => {
    if (!imageUrl) return;
    const fileName = imageUrl.split("/products/")[1];
    if (fileName) {
      await supabase.storage.from("products").remove([fileName]);
    }
  };

  const toggleActive = async (product: any) => {
    await supabase.from("products").update({ is_active: !product.is_active }).eq("id", product.id);
    fetchProducts();
  };

  const handleAdd = async () => {
    const imageUrl = await uploadImage();
    const slug = generateSlug(form.name);
    const { data } = await supabase
      .from("products")
      .insert([{ ...form, slug, image: imageUrl, is_active: true }])
      .select();
    await logAction("create", data?.[0]);
    setForm({ name: "", price: "", description: "" });
    setImageFile(null);
    fetchProducts();
  };

  const handleEdit = (p: any) => {
    setEditingId(p.id);
    setForm({ name: p.name, price: p.price, description: p.description });
  };

  const handleUpdate = async () => {
    const confirmUpdate = confirm("Confirmer la modification ?");
    if (!confirmUpdate) return;

    const { data: oldProduct } = await supabase.from("products").select("*").eq("id", editingId).single();
    await logAction("update_before", oldProduct);

    let imageUrl = null;
    if (imageFile) {
      // ✅ Supprime l'ancienne image avant d'uploader la nouvelle
      await deleteImage(oldProduct.image);
      imageUrl = await uploadImage();
    }

    await supabase
      .from("products")
      .update({ ...form, ...(imageUrl && { image: imageUrl }), slug: generateSlug(form.name) })
      .eq("id", editingId);

    await logAction("update_after", { ...oldProduct, ...form, image: imageUrl || oldProduct.image });

    setEditingId(null);
    setForm({ name: "", price: "", description: "" });
    setImageFile(null);
    fetchProducts();
  };

  const handleDelete = async (p: any) => {
    const confirmDelete = confirm("Supprimer ce produit ?");
    if (!confirmDelete) return;
    await logAction("delete", p);
    // ✅ Supprime l'image du Storage
    await deleteImage(p.image);
    await supabase.from("products").delete().eq("id", p.id);
    fetchProducts();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-[#5c3d2e]">Gestion des produits</h1>

      {/* FORM */}
      <div className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow mb-10">
        <input placeholder="Nom" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full mb-3 p-2 border rounded" />
        <input placeholder="Prix" value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full mb-3 p-2 border rounded" />
        <textarea placeholder="Description" value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full mb-3 p-2 border rounded" />
        <input type="file" onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="w-full mb-3" />
        {editingId ? (
          <button onClick={handleUpdate} className="w-full bg-blue-500 text-white py-2 rounded-xl">
            Sauvegarder
          </button>
        ) : (
          <button onClick={handleAdd} className="w-full bg-[#5c3d2e] text-white py-2 rounded-xl">
            Ajouter produit
          </button>
        )}
      </div>

      {/* LISTE */}
      <div className="space-y-4">
        {products.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
            <div className="flex items-center gap-4">
              {/* ✅ next/image au lieu de <img> */}
              {p.image && (
                <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                  <Image src={p.image} alt={p.name} fill sizes="64px" className="object-cover" />
                </div>
              )}
              <div>
                <h2 className="font-bold">{p.name}</h2>
                <p className="text-sm text-gray-500">{p.price} TND</p>
                <p className="text-xs mt-1">
                  {p.is_active
                    ? <span className="text-green-600">Actif</span>
                    : <span className="text-red-500">Désactivé</span>}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => toggleActive(p)}
                className={`px-3 py-1 rounded text-white ${p.is_active ? "bg-red-500" : "bg-green-500"}`}>
                {p.is_active ? "Désactiver" : "Activer"}
              </button>
              <button onClick={() => handleEdit(p)}
                className="bg-yellow-500 text-white px-3 py-1 rounded">
                Modifier
              </button>
              <button onClick={() => handleDelete(p)}
                className="bg-red-500 text-white px-3 py-1 rounded">
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}