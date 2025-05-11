
"use client";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';

// A simple component for animated background shapes
const AnimatedShape: React.FC<{ className?: string, delay?: string }> = ({ className, delay }) => {
  return (
    <div
      className={`absolute rounded-full animate-pulse ${className}`}
      style={{ animationDelay: delay, animationDuration: '10s' }}
    />
  );
};

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Attempt to ensure video plays on all browsers, especially mobile
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.warn("Video autoplay was prevented:", error);
        // You might want to show a play button or a static fallback image here
      });
    }
  }, []);

  return (
    <section className="relative h-[calc(100vh-5rem)] min-h-[600px] flex flex-col items-center justify-center overflow-hidden bg-background p-4 -mt-20">
      {/* Animated Shapes for the main background */}
      <AnimatedShape className="w-32 h-32 bg-primary/10 -z-10 top-1/4 left-1/5" delay="0s" />
      <AnimatedShape className="w-48 h-48 bg-secondary/10 -z-10 bottom-1/4 right-1/5" delay="2s" />
      <AnimatedShape className="w-24 h-24 bg-accent/10 -z-10 top-1/3 right-1/3" delay="4s" />
      <AnimatedShape className="w-40 h-40 bg-primary/5 -z-10 bottom-1/3 left-1/3" delay="6s" />

      {/* Main visual element: Text with video background */}
      <div className="relative mb-8 text-center">
        <h1
          className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold uppercase tracking-tighter text-transparent relative z-10 whitespace-nowrap"
          style={{
            WebkitTextStroke: '2px hsl(var(--primary))',
            textStroke: '2px hsl(var(--primary))',
          }}
        >
          PixelsFlow
        </h1>
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
          poster="https://picsum.photos/seed/videotextbg/1200/300" 
          data-ai-hint="abstract colorful fluid"
          src="https://firebasestorage.googleapis.com/v0/b/gh RENDER URL.appspot.com/o/Y2meta.шава_-_DMT_(tribal_trap_edit)-vlc-record-2024-01-01-16h25m15s-25571611.mp4?alt=media&token=47225558-70e0-470f-982f-96c02ca40093"
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Tagline and Buttons */}
      <div className="relative z-20 text-center">
        <p className="mt-6 text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto">
          Weaving pixels into captivating digital experiences. Your vision, our expertise.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button asChild size="lg" className="gradient-bg text-primary-foreground shadow-lg hover:opacity-90 transition-opacity duration-300 transform hover:scale-105">
            <Link href="/projects">Our Work</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary/10 transition-colors duration-300 transform hover:scale-105">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
