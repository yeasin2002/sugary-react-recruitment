"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  AnimatedGroup,
  HeroHeader,
  HeroProductShow,
  TextEffect,
} from "@/components/homepage";

import gift1 from "@/assets/gifts/gift-1.webp";
import gift2 from "@/assets/gifts/gift-2.webp";
import gift3 from "@/assets/gifts/gift-3.webp";
import gift4 from "@/assets/gifts/gift-4.jpeg";
import gift5 from "@/assets/gifts/gift-5.jpeg";
import { MoveRight } from "lucide-react";

const images = [gift1, gift2, gift3, gift4, gift5];

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export default function HeroSection() {
  return (
    <div>
      <HeroHeader />
      <main className="overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 isolate hidden contain-strict lg:block"
        >
          <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>
        <section>
          <div className="relative pt-24">
            <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"></div>
            <div className="mx-auto max-w-5xl px-6">
              <div className="sm:mx-auto lg:mr-auto lg:mt-0">
                <TextEffect
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="h1"
                  className="mt-8 max-w-3xl text-5xl font-medium md:text-6xl lg:mt-16 font-ubuntu"
                >
                  The worlds first personalized gifting app
                </TextEffect>
                <TextEffect
                  per="line"
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  delay={0.5}
                  as="p"
                  className="mt-8 max-w-2xl text-pretty text-lg font-montserrat"
                >
                  Your everyday gifting app that saves your time. 👌🏽 Customize
                  your 𝗚𝗶𝗳𝘁 with your budget🔥
                </TextEffect>
              </div>
            </div>
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                ...transitionVariants,
              }}
            >
              <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
                <div
                  aria-hidden
                  className="bg-linear-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
                />
                <div className="flex justify-center items-center">
                  {images.map((image, idx) => (
                    <HeroProductShow key={idx} image={image} />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center mt-16">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full px-5 text-base border border-gray-600 "
                  variant={"ghost"}
                >
                  <Link href="/dashboard" className="text-nowrap gap-x-4">
                    <span>see more</span>
                    <MoveRight />
                  </Link>
                </Button>
              </div>
            </AnimatedGroup>
          </div>
        </section>
      </main>
    </div>
  );
}
