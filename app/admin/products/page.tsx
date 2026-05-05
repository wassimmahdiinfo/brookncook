"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { logAction } from "@/utils/logger";

export default function ProductsAdmin() {
  const [products, setProducts] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
      name: "",
      price: "",
      description: "",
    });

  // 🔄 Activer / désactiver
  const toggleActive = async (product: any) => {
    await supabase
      .from("products")
      .update({ is_active: !product.is_active })
      .eq("id", product.id);

    fetchProducts();
  };
  
    const router = useRouter();
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const uploadImage = async () => {
    if (!imageFile) return null;
  
    const fileName = Date.now() + "-" + imageFile.name;
  
    const { data, error } = await supabase.storage
    .from("products")
    .upload(fileName, imageFile);
  
  //console.log("UPLOAD ERROR:", error);
  //console.log("UPLOAD DATA:", data);
  
    if (error) {
      console.log(error);
      return null;
    }
  
    const { data: publicUrl } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);
  
    return publicUrl.publicUrl;
  };
  
  
    const fetchProducts = async () => {
      const { data } = await supabase.from("products").select("*");
      setProducts(data || []);
    };
  
    useEffect(() => {
      fetchProducts();
    }, []);
  
    // ➕ Ajouter
    const handleAdd = async () => {
    const imageUrl = await uploadImage();
    const slug = form.name
    .toLowerCase()
    .replaceAll(" ", "-");
  
    const { data } = await supabase
      .from("products")
      .insert([
        {
          ...form,
          slug,
          image: imageUrl,
          is_active: true,
        },
      ])
      .select();
  
    await logAction("create", data?.[0]);
  
    setForm({ name: "", price: "", description: "" });
    setImageFile(null);
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
  
    
  
    // 💾 UPDATE
  
    const handleUpdate = async () => {
    const confirmUpdate = confirm("Confirmer la modification ?");
    if (!confirmUpdate) return;
  
    // 1. récupérer ancien produit
    const { data: oldProduct } = await supabase
      .from("products")
      .select("*")
      .eq("id", editingId)
      .single();
  
    // 2. log AVANT
    await logAction("update_before", oldProduct);
  
    // 3. upload image si besoin
    let imageUrl = null;
  
    if (imageFile) {
      imageUrl = await uploadImage();
    }
  
    // 4. update
    await supabase
      .from("products")
      .update({
        ...form,
        ...(imageUrl && { image: imageUrl }),
        slug: form.name.toLowerCase().replaceAll(" ", "-"),
      })
      .eq("id", editingId);
  
    // 5. log APRÈS
    await logAction("update_after", {
      ...oldProduct,
      ...form,
      image: imageUrl || oldProduct.image,
    });
  
    // reset
    setEditingId(null);
    setForm({ name: "", price: "", description: "" });
    setImageFile(null);
  
    fetchProducts();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-[#5c3d2e]">
        Gestion des produits
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

        <input
        type="file"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        className="w-full mb-3"
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
              <img
              src={p.image}
              className="w-16 h-16 object-cover rounded"
              />
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

              <button
                onClick={() => handleEdit(p)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Modifier
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}