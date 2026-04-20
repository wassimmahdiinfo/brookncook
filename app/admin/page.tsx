"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { logAction } from "@/utils/logger";

export default function AdminPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  const handleLogout = async () => {
  await supabase.auth.signOut();
  router.push("/login");
};

const [user, setUser] = useState<any>(null);

  const router = useRouter();

  const [loading, setLoading] = useState(true);

useEffect(() => {
  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
    } else {
      setUser(user);
      setLoading(false);
    }
  };

  checkUser();
}, []);

const [imageFile, setImageFile] = useState<File | null>(null);

const uploadImage = async () => {
  if (!imageFile) return null;

  const fileName = Date.now() + "-" + imageFile.name;

  const { data, error } = await supabase.storage
  .from("products")
  .upload(fileName, imageFile);

console.log("UPLOAD ERROR:", error);
console.log("UPLOAD DATA:", data);

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

  const { data } = await supabase
    .from("products")
    .insert([
      {
        ...form,
        image: imageUrl,
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
  
  // ❌ Supprimer
  const handleDelete = async (id: string) => {
  const confirmDelete = confirm("Supprimer ce produit ?");
  if (!confirmDelete) return;

  // 1. récupérer produit
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  // 2. log AVANT suppression
  await logAction("delete", product);

  // 3. suppression
  await supabase.from("products").delete().eq("id", id);

  fetchProducts();
};
  

if (loading) return <p>Loading...</p>;
  return (
    <main className="min-h-screen bg-[#fffaf5] p-6">
      
      <div className="flex items-center justify-between mb-8 border-b pb-4">

  {/* LEFT */}
  <div>
    <h1 className="text-2xl md:text-3xl font-bold text-[#5c3d2e]">
      Brook’n’Cook Admin
    </h1>
    <p className="text-sm text-gray-500">
      Gestion des produits Brook’n’Cook
    </p>
  </div>

  {/* RIGHT */}
  <div className="flex items-center gap-4">

    <div className="text-right">
      <p className="text-sm text-gray-500">Connecté en tant que</p>
      <p className="font-medium text-[#5c3d2e]">
        {user?.email}
      </p>
    </div>

    <button
      onClick={handleLogout}
      className="border border-[#5c3d2e] text-[#5c3d2e] px-4 py-2 rounded-lg hover:bg-[#5c3d2e] hover:text-white transition"
    >
      Se déconnecter
    </button>

  </div>

</div>

{/* lien "Voir historique" */}
<div className="mb-6">
  <a
    href="/admin/history"
    className="text-sm text-[#5c3d2e] underline hover:opacity-70"
  >
    Voir historique
  </a>
</div>

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