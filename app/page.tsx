import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import ProductCard from "@/app/components/ProductCard";
import HomeProducts from "@/app/components/HomeProducts";

export default async function Home() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .limit(3);

  return (
    <main className="bg-[#fffaf5] min-h-screen">

      {/* HERO */}
      <section className="text-center py-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-[#5c3d2e] mb-6">
          🍪 Délices faits maison à El Mourouj
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Brownies, cookies et douceurs artisanales sans conservateur.
          Préparés avec passion ❤️
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/products"
            className="bg-[#5c3d2e] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition"
          >
            Voir les produits
          </Link>

          <a
            href="https://wa.me/21624244677"
            target="_blank"
            className="bg-green-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-600 transition"
          >
            Commander
          </a>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          📍 Livraison à El Mourouj et environs
        </p>
      </section>

      {/* PRODUITS */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-[#5c3d2e] mb-8 text-center">
          Nos délices 🍪
        </h2>

        <HomeProducts products={products} />

        <div className="text-center mt-8">
          <Link
            href="/products"
            className="text-[#5c3d2e] font-semibold underline"
          >
            Voir tous les produits →
          </Link>
        </div>
      </section>

      {/* AVANTAGES */}
      <section className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 px-6 py-12">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          🧁 <p className="font-semibold mt-2">100% fait maison</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          🚫 <p className="font-semibold mt-2">Sans conservateur</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow text-center">
          ⚡ <p className="font-semibold mt-2">Commande rapide</p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="text-center py-16">
        <a
          href="https://wa.me/21624244677"
          target="_blank"
          className="bg-green-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-600 transition"
        >
          Commander sur WhatsApp
        </a>
      </section>

      {/* FOOTER (TON BLOC MARRON AMÉLIORÉ) */}
      <footer className="bg-[#5c3d2e] text-white py-10 mt-10">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-4">

          <h3 className="text-2xl font-bold">Brook’n’Cook</h3>

          <p className="text-sm text-gray-200">
            Délices faits maison • Sans conservateur • Qualité artisanale
          </p>

          <p className="text-sm">
            📍 El Mourouj, Tunisie
          </p>

          <div className="flex justify-center gap-4 mt-4">
            <a href="https://wa.me/21624244677" target="_blank">
              WhatsApp
            </a>
            <a href="/products">Produits</a>
          </div>

          <p className="text-xs text-gray-300 mt-6">
            © {new Date().getFullYear()} Brook’n’Cook — Tous droits réservés
          </p>
        </div>
      </footer>

    </main>
  );
}