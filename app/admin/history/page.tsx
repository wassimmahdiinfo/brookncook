"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function HistoryPage() {
  const [logs, setLogs] = useState<any[]>([]);

  const fetchLogs = async () => {
    const { data } = await supabase
      .from("histo_action")
      .select("*")
      .order("created_at", { ascending: false });

    setLogs(data || []);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <main className="min-h-screen bg-[#fffaf5] p-6">

      <h1 className="text-2xl font-bold mb-6 text-[#5c3d2e]">
        Historique des actions
      </h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">

          <thead className="bg-[#5c3d2e] text-white">
            <tr>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Action</th>
              <th className="p-3 text-left">Produit</th>
              <th className="p-3 text-left">Utilisateur</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-b">

                <td className="p-3">
                  {new Date(log.created_at).toLocaleString()}
                </td>

                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium
                    ${
                      log.action === "create"
                        ? "bg-green-100 text-green-700"
                        : log.action.includes("update")
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }
                  `}>
                    {log.action}
                  </span>
                </td>

                <td className="p-3 font-medium">
  {log.name}

  <details className="mt-1">
    <summary className="cursor-pointer text-blue-500 text-xs">
      détails
    </summary>

    <div className="text-xs mt-2 space-y-1">
      <p>Description: {log.description}</p>
      <p>Prix: {log.price} TND</p>

      {log.image && (
        <img src={log.image} className="w-20 mt-2 rounded" />
      )}
    </div>
  </details>
</td>

                <td className="p-3 text-gray-500">
                  {log.user_email}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </main>
  );
}