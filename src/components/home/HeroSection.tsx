
"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AnimatedHashtags } from './AnimatedHashtags'; // New component for hashtags

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
    <section className="relative flex flex-col md:flex-row items-center justify-center min-h-[calc(100vh-5rem)] bg-background overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      {/* Left Column: Text Content */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left py-8 md:pr-10">
        <AnimatedHashtags tags={["#Design", "#Development", "#SEO"]} />

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
          className="mt-2 mb-8 text-base sm:text-lg text-foreground/80 max-w-md mx-auto md:mx-0"
        >
          We transform your vision into stunning digital realities. Innovative solutions for impactful results that elevate your brand.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: buttonsDelay }}
          className="flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4 w-full sm:w-auto"
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

      {/* Right Column: Image */}
      <div className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0 md:pl-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1], delay: 0.2 }} // Smooth custom ease
          className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl aspect-square rounded-xl overflow-hidden shadow-2xl"
        >
          <Image
            src="https://picsum.photos/seed/webdevhero/800/800"
            alt="Web Development and Design Studio"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 80vw, 40vw"
            priority
            data-ai-hint="web development design"
          />
           <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-70"></div>
        </motion.div>
      </div>
    </section>
  );
}
