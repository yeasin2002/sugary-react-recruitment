"use client";

import { getImg } from "@/lib/getImg";
import { Material } from "@/types";
import { Star } from "lucide-react";
import { motion } from "motion/react";
import SkeletonImage from "../ui/custom/skeleton-image";

export function MaterialCard({ material }: { material: Material }) {
  const rating = 4.5;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  // Format price with commas for thousands
  const formattedPrice = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(material.SalesPrice);

  return (
    <motion.div
      className="max-w-sm rounded-lg overflow-hidden bg-zinc-900 text-white shadow-lg transition-all duration-300 hover:shadow-xl group"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="relative h-80 w-full overflow-hidden">
        <SkeletonImage
          src={getImg(material.CoverPhoto)}
          alt={material.Title}
          width={500}
          height={500}
          className={`object-cover  duration-700 group-hover:scale-110 transition-all `}
        />
        <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
          {material.BrandName}
        </div>
      </div>

      <div className="p-5 space-y-4">
        <h2 className="text-2xl font-bold tracking-tight">{material.Title}</h2>
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < fullStars
                    ? "fill-yellow-400 text-yellow-400"
                    : i === fullStars && hasHalfStar
                    ? "fill-yellow-400/50 text-yellow-400"
                    : "fill-muted text-muted-foreground"
                }`}
              />
            ))}
          </div>

          <span className="text-gray-400">({rating})</span>
        </div>
        <p className="text-gray-400">{material.VariantTitle}</p>
        <div className="text-3xl font-bold">${formattedPrice}</div>
      </div>
    </motion.div>
  );
}
