"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, HTMLMotionProps, motion } from "motion/react";

import { useSiteMotion } from "../site-motion";
import { cn } from "@/lib/utils";

interface WordRotateProps {
  words: string[];
  duration?: number;
  framerProps?: HTMLMotionProps<"span">;
  className?: string;
}

export function WordRotate({
  words,
  duration = 2500,
  framerProps = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.25, ease: "easeOut" },
  },
  className,
}: WordRotateProps) {
  const {enabled}=useSiteMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if(!enabled || words.length < 2)return;
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [words, duration, enabled]);

  return (
    <span className="word-rotate-window" aria-hidden="true">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index % words.length]}
          className={cn(className)}
          {...framerProps}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
