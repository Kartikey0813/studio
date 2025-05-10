
"use client";

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';

const aboutContent = [
  "At PixelsFlow, we are more than just a design and development company.",
  "We are passionate creators, innovators, and problem-solvers dedicated to crafting exceptional digital experiences.",
  "Our journey began with a simple idea: to merge artistry with technology, creating solutions that are not only visually stunning but also functionally robust.",
  "With years of experience under our belts, we've honed our skills in web design, development, UI/UX strategy, and brand identity.",
  "We believe in a collaborative approach, working closely with our clients to understand their unique vision and challenges.",
  "Our mission is to empower businesses by transforming their digital presence, helping them connect with their audience in meaningful ways.",
  "Driven by creativity and a relentless pursuit of excellence, PixelsFlow is your trusted partner in the digital realm."
];

const AnimatedTextLine: React.FC<{ text: string, index: number }> = ({ text, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.p
      ref={ref}
      className="text-lg md:text-xl lg:text-2xl text-foreground/90 mb-6 leading-relaxed"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: isInView ? index * 0.2 : 0 }}
    >
      {text}
    </motion.p>
  );
};

export function AboutUsSection() {
  return (
    <section id="about-us" className="bg-background">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">Who We Are</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the story, passion, and people behind PixelsFlow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div 
            className="relative aspect-square md:aspect-auto md:h-full rounded-xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <Image 
              src="https://picsum.photos/seed/team/800/800" 
              alt="PixelsFlow Team" 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              data-ai-hint="team collaboration"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          </motion.div>
          
          <div className="max-h-[70vh] md:max-h-none overflow-y-auto custom-scrollbar pr-2"> 
            {aboutContent.map((line, index) => (
              <AnimatedTextLine key={index} text={line} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Add this to globals.css or a style tag if not already present for custom scrollbar
// .custom-scrollbar::-webkit-scrollbar { width: 8px; }
// .custom-scrollbar::-webkit-scrollbar-track { background: hsl(var(--muted) / 0.5); border-radius: 0.8rem; }
// .custom-scrollbar::-webkit-scrollbar-thumb { background: hsl(var(--primary)); border-radius: 0.8rem; }
// .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: hsl(var(--primary) / 0.8); }
