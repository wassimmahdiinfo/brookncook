//import { supabase } from "@/lib/supabaseClient";
import { createServerClient } from "@/lib/supabase/server";
import ProductCard from "@/app/components/ProductCard";
import Image from "next/image"

const supabase = createServerClient()

export async function generateMetadata(props: any) {
  const params = await props.params;
  const slug = params.slug;

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!product) {
    return {
      title: "Produit introuvable",
    };
  }

  return {
    title: `${product.name} fait maison à El Mourouj | Brook’n’Cook`,
    description: `${product.name} fait maison chez Brook’n’Cook. Délice artisanal sans colorant ni conservateur. Disponible à El Mourouj et environs.`,
    openGraph: {
    title: product.name,
    description: product.description,
    images: [product.image],
  },
  };
}

export default async function ProductPage(props: any) {
  const params = await props.params;
  const slug = params.slug;

  //console.log("SLUG:", params.slug);

  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
  
  const product = data?.[0];

  if (!product) {
    return (
      <main className="p-6">
        <h1>Produit introuvable</h1>
      </main>
    );
  }

  const { data: reviews } = await supabase
  .from("reviews")
  .select("*")
  .eq("product_id", product.id);

  const { data: related } = await supabase
  .from("products")
  .select("*")
  .neq("id", product.id)
  .limit(3);

  const schema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  image: product.image,
  description: product.description,
  offers: {
    "@type": "Offer",
    price: product.price,
    priceCurrency: "TND",
    availability: "https://schema.org/InStock",
  },
};

// RÉCUPÉRATION De LA PROMO deouis supabase
const { data: promo } = await supabase
  .from("promotions")
  .select("*")
  .eq("product_id", product.id)
  .eq("is_active", true)
  .single();

  return (
  <main className="min-h-screen bg-[#fffaf5] py-12 px-4">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

      {/* IMAGE */}
      <div className="relative group">
        <Image
        src={product.image}
        alt={product.name}
        width={600}
        height={400}
        priority
        className="w-full h-[400px] object-cover rounded-3xl shadow-xl"
        />

        {/* badge top */}
        <span className="absolute top-4 left-4 bg-white px-4 py-1 rounded-full text-sm shadow">
          ⭐ Produit populaire
        </span>
      </div>

      {/* CONTENU */}
      <div>
        <h1 className="text-4xl font-bold text-[#5c3d2e] mb-3">
          {product.name}
        </h1>

        {/* rating fake (temporaire) */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-yellow-500">★★★★★</span>
          <span className="text-sm text-gray-500">(12 avis)</span>
        </div>

        <ul className="mb-6 space-y-2 text-gray-700">
          <li>🍪 Goût authentique fait maison</li>
          <li>🧈 Ingrédients premium (pur beurre)</li>
          <li>🚫 Aucun conservateur</li>
          <li>⚡ Préparé frais à la commande</li>
        </ul>

        <p className="text-3xl font-bold text-[#5c3d2e] mb-6">
          {product.price} TND
        </p>

        <p className="text-sm text-red-500 mb-6 font-medium">
          🔥 Stock limité aujourd’hui
        </p>

        {/* avantages */}
        <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
          <div className="bg-white p-3 rounded-xl shadow">
            🧁 100% fait maison
          </div>
          <div className="bg-white p-3 rounded-xl shadow">
            🚫 Sans conservateur
          </div>
          <div className="bg-white p-3 rounded-xl shadow">
            🧈 Pur beurre
          </div>
          <div className="bg-white p-3 rounded-xl shadow">
            📍 Livraison El Mourouj
          </div>
        </div>
        
        {/* Bloc Promo */}
        {promo && (
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl mb-6 text-sm animate-pulse">
            🎁 {promo.message}
          </div>
        )}

        {/* CTA principal */}
        <a
          href={`https://wa.me/21624244677?text=${encodeURIComponent(
            `Bonjour, je souhaite commander :
            🍪 ${product.name}
            💰 ${product.price} TND`
          )}`}
          target="_blank"
          className="block text-center bg-green-500 hover:bg-green-600 text-white py-5 rounded-xl font-bold text-xl transition shadow-2xl animate-pulse"
          >
            🛒 Commander maintenant sur WhatsApp
        </a>

        {/* rassurance */}
        <p className="text-center text-sm text-gray-500 mt-4">
          ⚡ Réponse rapide • Commande en quelques clics
        </p>
        <p className="text-xs text-gray-500 mt-2 text-center">
          🔒 Paiement à la livraison • Satisfaction garantie
        </p>
      </div>

      {/* AVIS */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold text-[#5c3d2e] mb-6 text-center">
          Avis clients
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews?.map((r) => (
            <div key={r.id} className="bg-white p-4 rounded-xl shadow">
              <p className="text-yellow-500 mb-2">
                {"★".repeat(r.rating)}
              </p>
              <p className="text-sm text-gray-600">{r.comment}</p>
              <p className="mt-2 text-xs text-gray-400">— {r.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* PRODUITS SIMILAIRES */}
      <div className="mt-20">
        <h2 className="text-2xl font-bold text-[#5c3d2e] mb-6 text-center">
          Autres délices 🍪
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {related?.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

    </div>

 </main>
);
}