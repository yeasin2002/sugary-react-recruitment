"use client";

import notFoundImg from "@/assets/no-image.jpg";
import { AnimatePresence, motion } from "motion/react";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

export default function SkeletonImage({
  src,
  alt,
  width,
  height,
  className = "",
  ...props
}: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <AnimatePresence>
        {!loaded && (
          <motion.div
            className="absolute inset-0 animate-pulse bg-gray-300 rounded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          setLoaded(false);
          e.currentTarget.src = notFoundImg.src;
        }}
        {...props}
      />
    </div>
  );
}
