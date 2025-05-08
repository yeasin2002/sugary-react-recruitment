"use client";

import { useEffect, useState, type RefObject } from "react";

interface UseIntersectionObserverProps {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  target?: RefObject<Element>;
}

export function useIntersectionObserver({
  root = null,
  rootMargin = "0px",
  threshold = 0,
  target,
}: UseIntersectionObserverProps = {}): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!target?.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { root, rootMargin, threshold }
    );

    observer.observe(target.current);

    return () => {
      if (target.current) {
        observer.unobserve(target.current);
      }
    };
  }, [root, rootMargin, threshold, target]);

  return isIntersecting;
}
