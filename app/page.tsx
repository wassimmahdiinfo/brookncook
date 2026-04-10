export default function Home() {
  return (
    <main className="min-h-screen bg-[#fffaf5] text-gray-800">
      
      {/* HERO */}
      <section className="text-center py-20 px-6">
        <h1 className="text-5xl font-bold text-[#5c3d2e]">
          🍰 Brook'n'Cook
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto">
          Des délices faits maison, préparés avec passion.
          Découvrez nos pâtisseries artisanales et nos créations gourmandes en Tunisie.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href="/products"
            className="bg-[#5c3d2e] text-white px-6 py-3 rounded-xl hover:bg-[#7a523f] transition"
          >
            Voir nos produits
          </a>

          <a
            href="/contact"
            className="border border-[#5c3d2e] text-[#5c3d2e] px-6 py-3 rounded-xl hover:bg-[#5c3d2e] hover:text-white transition"
          >
            Nous contacter
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 px-6 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">🍪 Fait maison</h3>
          <p className="text-gray-600">
            Tous nos produits sont préparés artisanalement avec des ingrédients de qualité.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">🚚 Livraison rapide</h3>
          <p className="text-gray-600">
            Livraison disponible partout en Tunisie avec soin et fraîcheur.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold mb-2">❤️ Sur mesure</h3>
          <p className="text-gray-600">
            Commandes personnalisées pour vos événements et occasions spéciales.
          </p>
        </div>

      </section>

      {/* CTA */}
      <section className="text-center py-20 bg-[#5c3d2e] text-white">
        <h2 className="text-3xl font-bold">
          Prêt à goûter ?
        </h2>
        <p className="mt-4">
          Découvrez nos créations et commandez dès maintenant.
        </p>

        <a
          href="/products"
          className="mt-6 inline-block bg-white text-[#5c3d2e] px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
        >
          Voir les produits
        </a>
      </section>

    </main>
  );
}