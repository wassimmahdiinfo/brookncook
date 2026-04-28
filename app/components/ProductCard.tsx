"use client";

import Link from "next/link";

export default function ProductCard({ product }: any) {
  return (
    <Link href={`/products/${product.slug}`}>
      <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden cursor-pointer">

        {/* IMAGE */}
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-52 object-cover group-hover:scale-110 transition duration-500"
          />

          {/* BADGE */}
          <span className="absolute top-3 left-3 bg-white text-xs px-3 py-1 rounded-full shadow">
            ⭐ Populaire
          </span>
        </div>

        {/* CONTENT */}
        <div className="p-4">

          <h2 className="font-semibold text-lg text-[#5c3d2e] mb-1">
            {product.name}
          </h2>

          <p className="text-gray-500 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <p className="font-bold text-[#5c3d2e]">
              {product.price} TND
            </p>

            {/* CTA */}
            <span className="text-sm bg-[#5c3d2e] text-white px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition">
              Voir
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}