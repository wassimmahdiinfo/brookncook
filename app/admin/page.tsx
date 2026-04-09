// app/admin/page.tsx
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Admin() {
  const [name, setName] = useState("");

  const addProduct = async () => {
    await supabase.from("products").insert({ name });
    alert("Produit ajouté");
  };

  return (
    <div className="p-10">
      <input
        className="border p-2"
        placeholder="Nom produit"
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addProduct} className="ml-2 bg-black text-white p-2">
        Ajouter
      </button>
    </div>
  );
}