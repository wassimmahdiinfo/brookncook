// app/products/page.tsx
import { supabase } from "@/lib/supabase";

export default async function ProductsPage() {
  const { data: products } = await supabase
    .from("products")
    .select("*");

  return (
    <div className="p-10 grid gap-6">
      {products?.map((p) => (
        <div key={p.id} className="border p-4 rounded-xl">
          <h2 className="text-xl font-bold">{p.name}</h2>
          <p>{p.price} TND</p>
        </div>
      ))}
    </div>
  );
}