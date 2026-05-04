"use client";

import Link from "next/link";

export default function AdminLayout({ children }: any) {
  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#5c3d2e] text-white p-6 space-y-4">
        <h2 className="text-xl font-bold mb-6">Admin</h2>

        <nav className="space-y-2">
          <Link href="/admin">Dashboard</Link>
          <Link href="/admin/products">Produits</Link>
          <Link href="/admin/promotions">Promotions</Link>
          <Link href="/admin/orders">Commandes</Link>
          <Link href="/admin/analytics">Statistiques</Link>
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 bg-[#fffaf5] p-6">
        {children}
      </main>

    </div>
  );
}