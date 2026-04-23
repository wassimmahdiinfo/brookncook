"use client";

export default function WhatsAppButton() {
  const phone = "21624244677"; 

  const message = encodeURIComponent(
    "Bonjour, je souhaite passer une commande chez Brook’n’Cook 🍪"
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition transform hover:scale-110"
      aria-label="Contacter sur WhatsApp"
    >
      💬
    </a>
  );
}