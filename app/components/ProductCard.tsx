export default function ProductCard({ product }: any) {
  const message = encodeURIComponent(
  `Bonjour, je souhaite commander : ${product.name} (${product.price} TND)`
);
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">

      {/* IMAGE */}
      {product.image && (
        <div className="overflow-hidden">
          <img
            src={product.image}
            alt={`${product.name} fait maison Brook'n'Cook El Mourouj`}
            className="w-full h-52 object-cover transform hover:scale-105 transition duration-300"
          />
        </div>
      )}

      {/* CONTENU */}
      <div className="p-4">
        <h2 className="font-semibold text-lg text-gray-800">
          <a href={`/products/${product.slug}`}>
            {product.name}
          </a>
        </h2>

        <p className="text-sm text-gray-500 line-clamp-2 mb-2">
          {product.description}
        </p>

        <p className="font-bold text-lg text-[#5c3d2e]">
          {product.price} TND
        </p>
      </div>
      

<a
  href={`https://wa.me/21624244677?text=${message}`}
  target="_blank"
  className="mt-3 block text-center bg-[#25D366] text-white py-2 rounded-lg"
>
  Commander
</a>
<p className="text-xs text-center text-gray-500 mt-1">
  Réponse rapide ⚡
</p>
    </div>
  );
}