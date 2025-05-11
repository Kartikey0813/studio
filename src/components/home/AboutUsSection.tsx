
"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

const aboutContent = [
  "At PixelsFlow, we are more than just a design and development company.",
  "We are passionate creators, innovators, and problem-solvers dedicated to crafting exceptional digital experiences.",
  "Our journey began with a simple idea: to merge artistry with technology, creating solutions that are not only visually stunning but also functionally robust.",
  "With years of experience under our belts, we've honed our skills in web design, development, UI/UX strategy, and brand identity.",
  "We believe in a collaborative approach, working closely with our clients to understand their unique vision and challenges.",
  "Our mission is to empower businesses by transforming their digital presence, helping them connect with their audience in meaningful ways.",
  "Driven by creativity and a relentless pursuit of excellence, PixelsFlow is your trusted partner in the digital realm."
];

interface AnimatedParagraphProps {
  text: string;
  paragraphIndex: number;
  totalParagraphs: number;
  scrollYProgress: MotionValue<number>; 
}

const AnimatedParagraph: React.FC<AnimatedParagraphProps> = ({ text, paragraphIndex, totalParagraphs, scrollYProgress }) => {
  const words = text.split(' ');
  const segmentStart = paragraphIndex / totalParagraphs;
  const segmentEnd = (paragraphIndex + 1) / totalParagraphs;

  return (
    <p
      className="text-sm text-foreground/90 mb-2 leading-relaxed" // Reduced font size and margin
      aria-label={text}
    >
      {words.map((word, wordIndex) => {
        const wordRelativeStartFraction = wordIndex / words.length;
        // Point in scrollYProgress (0-1) where this word should start becoming visible
        const revealPoint = segmentStart + (segmentEnd - segmentStart) * wordRelativeStartFraction;

        // Tune these ranges for sensitivity. Input is scrollYProgress.
        // Word starts appearing slightly before revealPoint, fully visible at revealPoint, stays visible.
        // A small window (e.g., 0.002 around revealPoint) for opacity and y transition.
        const revealWindowHalf = 0.0025; // Adjust for faster/slower word pop-in
        const opacityInputRange = [revealPoint - revealWindowHalf, revealPoint, revealPoint + (0.01 / totalParagraphs) ]; // Stays visible longer after reveal
        const yInputRange = [revealPoint - revealWindowHalf, revealPoint];

        const opacity = useTransform(scrollYProgress, opacityInputRange, [0, 1, 1]);
        const y = useTransform(scrollYProgress, yInputRange, [20, 0]);

        return (
          <span key={wordIndex} className="inline-block mr-[0.25em] will-change-transform">
            <motion.span
              style={{ display: 'inline-block', opacity, y }}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </p>
  );
};

export function AboutUsSection() {
  const sectionWrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionWrapperRef,
    offset: ["start start", "end end"] 
  });

  // Adjusted section height for a more contained scroll animation
  const sectionHeight = "180vh";

  return (
    <section 
      id="about-us" 
      ref={sectionWrapperRef} 
      className="relative bg-background" 
      style={{ height: sectionHeight }}
    >
      {/* This div becomes sticky. top-20 (5rem) is for the fixed navbar. */}
      <div 
        className="sticky top-20 h-[calc(100vh-5rem)] overflow-hidden" 
      >
        <div className="container h-full flex items-center">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center w-full">
            <motion.div 
              className="relative aspect-square md:aspect-auto md:h-[70vh] rounded-xl overflow-hidden shadow-2xl"
              style={{
                // Fade in image during first 5% of the section's total scroll animation
                opacity: useTransform(scrollYProgress, [0, 0.05], [0, 1]), 
                x: useTransform(scrollYProgress, [0, 0.05], [-50, 0]), // Slide in image
              }}
            >
              <Image 
                src="https://picsum.photos/seed/designcollab/800/800" 
                alt="Design agency team collaborating on a project" 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                data-ai-hint="design agency collaboration"
                priority 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </motion.div>
            
            <div className="pr-2 md:pr-4"> 
              {aboutContent.map((line, index) => (
                <AnimatedParagraph
                  key={index}
                  text={line}
                  paragraphIndex={index}
                  totalParagraphs={aboutContent.length}
                  scrollYProgress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

