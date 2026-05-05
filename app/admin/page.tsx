export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-[#5c3d2e]">
        Dashboard
      </h1>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Produits</p>
          <p className="text-2xl font-bold text-[#5c3d2e]">--</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Promotions actives</p>
          <p className="text-2xl font-bold text-[#5c3d2e]">--</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Commandes</p>
          <p className="text-2xl font-bold text-[#5c3d2e]">--</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-sm text-gray-500">Visites</p>
          <p className="text-2xl font-bold text-[#5c3d2e]">--</p>
        </div>

      </div>
    </div>
  );
}