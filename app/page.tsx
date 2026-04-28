import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import HomeProducts from "@/app/components/HomeProducts";

export default async function Home() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .limit(3);

  return (
    <main className="bg-[#fffaf5] min-h-screen">

      {/* HERO */}
      <section className="text-center py-24 px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-[#5c3d2e] mb-6 leading-tight">
          🍪 Délices faits maison <br /> à El Mourouj
        </h1>

        <p className="text-lg text-gray-600 mb-10">
          Cookies, brownies et douceurs artisanales <br />
          <span className="font-medium">
            sans conservateur • faits avec passion ❤️
          </span>
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/products"
            className="bg-[#5c3d2e] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition shadow-lg"
          >
            Voir les produits
          </Link>

          <a
            href="https://wa.me/21624244677"
            target="_blank"
            className="bg-green-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-600 transition shadow-lg"
          >
            Commander
          </a>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          📍 Livraison rapide à El Mourouj et environs
        </p>
      </section>

      {/* PRODUITS */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-[#5c3d2e] mb-8 text-center">
          Nos délices 🍪
        </h2>

        <HomeProducts products={products} />

        <div className="text-center mt-10">
          <Link
            href="/products"
            className="text-[#5c3d2e] font-semibold underline hover:opacity-80"
          >
            Voir tous les produits →
          </Link>
        </div>
      </section>

      {/* AVANTAGES */}
      <section className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 px-6 py-16">
        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition text-center">
          <p className="text-2xl mb-2">🧁</p>
          <p className="font-semibold">100% fait maison</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition text-center">
          <p className="text-2xl mb-2">🚫</p>
          <p className="font-semibold">Sans conservateur</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition text-center">
          <p className="text-2xl mb-2">⚡</p>
          <p className="font-semibold">Commande rapide</p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="text-center py-20 bg-white">
        <h2 className="text-2xl font-bold text-[#5c3d2e] mb-4">
          Prêt à commander ?
        </h2>

        <p className="text-gray-600 mb-6">
          Réponse rapide sur WhatsApp ⚡
        </p>

        <a
          href="https://wa.me/21624244677"
          target="_blank"
          className="bg-green-500 text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-green-600 transition shadow-xl"
        >
          Commander maintenant
        </a>
      </section>

    </main>
  );
}