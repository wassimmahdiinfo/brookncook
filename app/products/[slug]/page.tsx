import { supabase } from "@/lib/supabaseClient";

export async function generateMetadata(props: any) {
  const params = await props.params;
  const slug = params.slug;

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!product) {
    return {
      title: "Produit introuvable",
    };
  }

  return {
    title: `${product.name} fait maison à El Mourouj | Brook’n’Cook`,
    description: `${product.name} fait maison chez Brook’n’Cook. Délice artisanal sans colorant ni conservateur. Disponible à El Mourouj et environs.`,
    openGraph: {
    title: product.name,
    description: product.description,
    images: [product.image],
  },
  };
}

export default async function ProductPage(props: any) {
  const params = await props.params;
  const slug = params.slug;

  //console.log("SLUG:", params.slug);

  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
  
  const product = data?.[0];

  if (!product) {
    return (
      <main className="p-6">
        <h1>Produit introuvable</h1>
      </main>
    );
  }

  const schema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  image: product.image,
  description: product.description,
  offers: {
    "@type": "Offer",
    price: product.price,
    priceCurrency: "TND",
    availability: "https://schema.org/InStock",
  },
};

  return (
  <main className="min-h-screen bg-[#fffaf5] py-10 px-4">
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">

      {/* IMAGE */}
      <div className="overflow-hidden rounded-2xl shadow-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[350px] object-cover hover:scale-105 transition duration-500"
        />
      </div>

      {/* INFOS */}
      <div>
        <h1 className="text-4xl font-bold text-[#5c3d2e] mb-4">
          {product.name}
        </h1>

        <p className="text-gray-600 mb-6 leading-relaxed">
          {product.description}
        </p>

        <p className="text-2xl font-semibold text-[#5c3d2e] mb-6">
          {product.price} TND
        </p>

        {/* BADGES */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <span className="bg-white shadow px-3 py-1 rounded-full text-sm">
            🧁 Fait maison
          </span>
          <span className="bg-white shadow px-3 py-1 rounded-full text-sm">
            🚫 Sans conservateur
          </span>
          <span className="bg-white shadow px-3 py-1 rounded-full text-sm">
            📍 El Mourouj
          </span>
        </div>

        {/* CTA */}
        <a
          href={`https://wa.me/216XXXXXXXX?text=${encodeURIComponent(
            `Bonjour, je souhaite commander :
🍪 ${product.name}
💰 ${product.price} TND`
          )}`}
          target="_blank"
          className="block text-center bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-semibold text-lg transition shadow-lg"
        >
          Commander sur WhatsApp
        </a>
        <p className="text-sm text-gray-500 mt-4 text-center">
          ⚡ Réponse rapide sur WhatsApp
        </p>
      </div>
    </div>
  </main>
);
}