'use client';

import React, { useRef } from 'react';
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
      className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground mb-8 md:mb-10 lg:mb-12 leading-relaxed text-center [text-shadow:1px_1px_5px_hsla(var(--primary)/0.6),_0_0_10px_hsla(var(--accent)/0.3)]"
      aria-label={text}
    >
      {words.map((word, wordIndex) => {
        const wordRelativeStartFraction = wordIndex / words.length;
        const revealPoint = segmentStart + (segmentEnd - segmentStart) * wordRelativeStartFraction;
        const revealWindowHalf = 0.0020; // Smaller window for faster reveal per word
        const opacityInputRange = [revealPoint - revealWindowHalf, revealPoint, revealPoint + (0.005 / totalParagraphs) ]; 
        const yInputRange = [revealPoint - revealWindowHalf, revealPoint];

        const opacity = useTransform(scrollYProgress, opacityInputRange, [0, 1, 1]);
        const y = useTransform(scrollYProgress, yInputRange, [25, 0]); // Word comes from slightly further down

        return (
          <span key={wordIndex} className="inline-block mr-[0.2em] will-change-transform"> {/* Slightly reduced word margin for larger fonts */}
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

  // Increased section height to accommodate larger text and provide more scroll for animation
  const sectionHeight = "250vh"; 

  return (
    <section 
      id="about-us" 
      ref={sectionWrapperRef} 
      className="relative bg-background" 
      style={{ height: sectionHeight }}
    >
      <div 
        className="sticky top-20 h-[calc(100vh-5rem)] overflow-hidden" 
      >
        <div className="container h-full flex flex-col items-center justify-center"> {/* Vertically centers the text block */}
          <div className="w-full max-w-3xl lg:max-w-4xl xl:max-w-5xl py-10 md:py-16"> {/* Constrain width for readability, added padding */}
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
    </section>
  );
}
