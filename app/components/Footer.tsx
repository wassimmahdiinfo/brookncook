export default function Footer() {
  return (
    <footer className="bg-[#5c3d2e] text-white py-12 mt-10">
      <div className="max-w-6xl mx-auto px-6 text-center space-y-4">

        <h3 className="text-2xl font-bold">Brook’n’Cook</h3>

        <p className="text-sm text-gray-200">
          Délices faits maison • Qualité artisanale • Sans conservateur
        </p>

        <p className="text-sm">
          📍 El Mourouj, Tunisie
        </p>

        <div className="flex justify-center gap-6 mt-4 text-sm">
          <a href="/products" className="hover:underline">Produits</a>
          <a href="https://wa.me/21624244677" target="_blank" className="hover:underline">
            WhatsApp
          </a>
        </div>

        <p className="text-xs text-gray-300 mt-6">
          © {new Date().getFullYear()} Brook’n’Cook — Tous droits réservés
        </p>

      </div>
    </footer>
  );
}