
"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AnimatedHashtags } from './AnimatedHashtags';
import { PixelFlowAnimation } from './PixelFlowAnimation'; // New component for background animation

const headlineText = "Crafting Digital Excellence, Pixel by Pixel.";
const headlineWords = headlineText.split(" ");

const sentenceVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
};

export function HeroSection() {
  const paragraphDelay = headlineWords.length * 0.1 + 0.4; // Delay after headline
  const buttonsDelay = paragraphDelay + 0.3; // Delay after paragraph

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] bg-background overflow-hidden px-4 py-16 sm:px-6 lg:px-8 text-center">
      <PixelFlowAnimation className="absolute inset-0 w-full h-full z-0" />
      
      {/* Text Content - Centered */}
      <div className="relative z-10 w-full max-w-2xl lg:max-w-3xl flex flex-col items-center text-center py-8">
        <AnimatedHashtags tags={["#Design", "#Development", "#SEO"]} className="justify-center" />

        <motion.h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold gradient-text mb-6 leading-tight"
          variants={sentenceVariants}
          initial="hidden"
          animate="visible"
        >
          {headlineWords.map((word, index) => (
            <motion.span
              key={word + '-' + index}
              variants={wordVariants}
              className="inline-block mr-2 md:mr-3" // Spacing between words
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: paragraphDelay }}
          className="mt-2 mb-8 text-base sm:text-lg text-foreground/80 max-w-md mx-auto"
        >
          We transform your vision into stunning digital realities. Innovative solutions for impactful results that elevate your brand.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: buttonsDelay }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto"
        >
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto gradient-bg text-primary-foreground shadow-lg transform transition-all duration-200 ease-out hover:shadow-[4px_4px_0px_hsl(var(--primary))] hover:-translate-x-1 hover:-translate-y-1 focus:shadow-[4px_4px_0px_hsl(var(--primary))] focus:-translate-x-1 focus:-translate-y-1 active:translate-x-0 active:translate-y-0 active:shadow-none"
          >
            <Link href="/projects">Explore Our Work</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto border-2 border-primary text-primary transform transition-all duration-200 ease-out hover:bg-primary/10 hover:shadow-[4px_4px_0px_hsl(var(--accent))] hover:-translate-x-1 hover:-translate-y-1 focus:shadow-[4px_4px_0px_hsl(var(--accent))] focus:-translate-x-1 focus:-translate-y-1 active:translate-x-0 active:translate-y-0 active:shadow-none"
          >
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
