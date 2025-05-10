"use client";

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
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-300 rounded" />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setLoaded(true)}
        {...props}
      />
    </div>
  );
}
