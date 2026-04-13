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
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Historique</h1>

      <div className="space-y-3">
        {logs.map((log) => (
          <div
            key={log.id}
            className="p-4 bg-white rounded-xl shadow"
          >
            <p>
              <strong>{log.action}</strong> - {log.product_id}
            </p>
            <p className="text-sm text-gray-500">
              {log.user_email} • {log.created_at}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}