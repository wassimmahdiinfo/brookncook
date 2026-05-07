//app/admin/layout.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }: any) {
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Écouter les changements d'auth en temps réel
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
          router.replace("/admin/login");
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/admin/login");
  };

  const linkClass = (path: string) =>
    `block px-4 py-2 rounded-lg transition ${
      pathname === path
        ? "bg-white text-[#5c3d2e] font-semibold"
        : "hover:bg-[#6d4c3d]"
    }`;

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-[#5c3d2e] text-white p-6 hidden md:flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-8">Brook'n'Cook Admin</h2>
          <nav className="flex flex-col gap-2">
            <Link href="/admin" className={`${linkClass("/admin")} block`}>📊 Dashboard</Link>
            <Link href="/admin/products" className={`${linkClass("/admin/products")} block`}>📦 Produits</Link>
            <Link href="/admin/promotions" className={`${linkClass("/admin/promotions")} block`}>🎁 Promotions</Link>
            <Link href="/admin/orders" className={`${linkClass("/admin/orders")} block`}>🧾 Commandes</Link>
            <Link href="/admin/messages" className={`${linkClass("/admin/messages")} block`}>💬 Messages</Link>
            <Link href="/admin/abandoned" className={`${linkClass("/admin/abandoned")} block`}>🛒 Panier abandonné</Link>
            <Link href="/admin/history" className={`${linkClass("/admin/history")} block`}>📜 Historique</Link>
          </nav>
        </div>
        <div>
          <div className="mb-4 text-sm">
            <p className="text-gray-300">Connecté en tant que</p>
            <p className="font-medium">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full bg-white text-[#5c3d2e] py-2 rounded-lg font-semibold hover:opacity-90"
          >
            Se déconnecter
          </button>
        </div>
      </aside>
      <main className="flex-1 bg-[#fffaf5] p-6">
        {children}
      </main>
    </div>
  );
}