import { motion } from "motion/react";
import Image, { StaticImageData } from "next/image";

export const HeroProductShow = ({ image }: { image: StaticImageData }) => {
  return (
    <motion.div
      style={{
        rotate: Math.random() * 20 - 10,
      }}
      whileHover={{
        scale: 1.1,
        rotate: 0,
        zIndex: 100,
      }}
      whileTap={{
        scale: 1.1,
        rotate: 0,
        zIndex: 100,
      }}
      className="rounded-xl -mr-4 mt-4 p-1 bg-white dark:bg-neutral-800 dark:border-neutral-700 border border-neutral-100 shrink-0 overflow-hidden"
    >
      <Image
        src={image}
        alt="bali images"
        width="500"
        height="500"
        className="rounded-lg size-20  md:size-40 lg:size-52 object-cover shrink-0"
      />
    </motion.div>
  );
};
