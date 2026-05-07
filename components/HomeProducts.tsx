"use client";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";

export default function HomeProducts({ products }: any) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
      className="grid md:grid-cols-3 gap-6"
    >
      {products?.map((p: any, index: number) => (
        <motion.div
        key={p.id}
        variants={{
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 },
        }}
        >
        <ProductCard product={p} priority={index === 0} />
        </motion.div>
      ))}
    </motion.div>
  );
}