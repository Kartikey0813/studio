
"use client";

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface AnimatedHashtagsProps {
  tags: string[];
  interval?: number;
  className?: string;
}

export function AnimatedHashtags({ tags, interval = 2500, className = "" }: AnimatedHashtagsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (tags.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % tags.length);
    }, interval);
    return () => clearInterval(timer);
  }, [tags, interval]);

  if (tags.length === 0) return null;

  return (
    <div className={`h-8 mb-3 flex items-center justify-center md:justify-start ${className}`}> {/* Ensures consistent height and alignment */}
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="text-primary font-semibold text-md sm:text-lg"
        >
          {tags[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
