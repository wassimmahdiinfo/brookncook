"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import "@/app/globals.css";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function AdminLayout({ children }: any) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
      } else {
        setUser(user);
      }
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const linkClass = (path: string) =>
    `block px-4 py-2 rounded-lg transition ${
      pathname === path
        ? "bg-white text-[#5c3d2e] font-semibold"
        : "hover:bg-[#6d4c3d]"
    }`;

  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-screen flex flex-col">
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#5c3d2e] text-white p-6 hidden md:flex flex-col justify-between">

        {/* TOP */}
        <div>
          <h2 className="text-2xl font-bold mb-8">Brook’n’Cook Admin</h2>

          <nav className="space-y-2">
            <Link href="/admin" className={linkClass("/admin")}>
              📊 Dashboard
            </Link>

            <Link href="/admin/products" className={linkClass("/admin/products")}>
              📦 Produits
            </Link>

            <Link href="/admin/promotions" className={linkClass("/admin/promotions")}>
              🎁 Promotions
            </Link>

            <Link href="/admin/orders" className={linkClass("/admin/orders")}>
              🧾 Commandes
            </Link>

            <Link href="/admin/messages" className={linkClass("/admin/messages")}>
              💬 Messages
            </Link>

            <Link href="/admin/abandoned" className={linkClass("/admin/abandoned")}>
              🛒 Panier abandonné
            </Link>

            <Link href="/admin/history" className={linkClass("/admin/history")}>
              📜 Historique
            </Link>
          </nav>
        </div>

        {/* BOTTOM */}
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

      {/* MOBILE HEADER */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#5c3d2e] text-white p-4 flex justify-between z-50">
        <span>Admin</span>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* CONTENT */}
      <main className="flex-1 bg-[#fffaf5] p-6 md:ml-0 mt-16 md:mt-0">
        {children}
      </main>

    </div>
    </body>
    </html>
  );
}