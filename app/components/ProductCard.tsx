export default function ProductCard({ product }: any) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">

      {/* IMAGE */}
      {product.image && (
        <div className="overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-52 object-cover hover:scale-105 transition duration-300"
          />
        </div>
      )}

      {/* CONTENU */}
      <div className="p-4">
        <h2 className="font-semibold text-lg text-gray-800">
          {product.name}
        </h2>

        <p className="text-sm text-gray-500 line-clamp-2 mb-2">
          {product.description}
        </p>

        <p className="font-bold text-lg text-[#5c3d2e]">
          {product.price} TND
        </p>
      </div>
    </div>
  );
}