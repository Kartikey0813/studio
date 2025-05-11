
"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  tail: { x: number; y: number }[];
  maxTailLength: number;
  canvasWidth: number;
  canvasHeight: number;
  baseHue: number;
  baseSaturation: number;

  constructor(canvasWidth: number, canvasHeight: number, baseHue: number, baseSaturation: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.baseHue = baseHue;
    this.baseSaturation = baseSaturation;
    // Initialize properties in reset
    this.x = 0; this.y = 0; this.size = 0; this.speedX = 0; this.speedY = 0; 
    this.color = ""; this.tail = []; this.maxTailLength = 0;
    this.reset();
  }

  reset() {
    // Start particles from random edges, flowing inwards or across
    const edge = Math.floor(Math.random() * 4);
    const speedMagnitude = Math.random() * 0.5 + 0.2; // Speed from 0.2 to 0.7

    switch (edge) {
      case 0: // Top edge
        this.x = Math.random() * this.canvasWidth;
        this.y = -5;
        this.speedX = (Math.random() - 0.5) * 0.5 * speedMagnitude; // Slight horizontal variation
        this.speedY = speedMagnitude;
        break;
      case 1: // Right edge
        this.x = this.canvasWidth + 5;
        this.y = Math.random() * this.canvasHeight;
        this.speedX = -speedMagnitude;
        this.speedY = (Math.random() - 0.5) * 0.5 * speedMagnitude;
        break;
      case 2: // Bottom edge
        this.x = Math.random() * this.canvasWidth;
        this.y = this.canvasHeight + 5;
        this.speedX = (Math.random() - 0.5) * 0.5 * speedMagnitude;
        this.speedY = -speedMagnitude;
        break;
      default: // Left edge
        this.x = -5;
        this.y = Math.random() * this.canvasHeight;
        this.speedX = speedMagnitude;
        this.speedY = (Math.random() - 0.5) * 0.5 * speedMagnitude;
        break;
    }
    
    this.size = Math.random() * 1.5 + 0.8; // Size from 0.8 to 2.3
    const l = Math.random() * 25 + 60; // Lightness between 60% and 85%
    this.color = `hsl(${this.baseHue}, ${this.baseSaturation}%, ${l}%)`;
    this.tail = [];
    this.maxTailLength = Math.floor(Math.random() * 15) + 10; // Tail length 10 to 25
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    this.tail.unshift({ x: this.x, y: this.y });
    if (this.tail.length > this.maxTailLength) {
      this.tail.pop();
    }

    // Reset if particle is far off screen
    const margin = this.maxTailLength * this.size * 2; // Increased margin
    if (this.x < -margin || this.x > this.canvasWidth + margin ||
        this.y < -margin || this.y > this.canvasHeight + margin) {
      this.reset();
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Tail
    for (let i = 0; i < this.tail.length; i++) {
      const part = this.tail[i];
      const R = i / this.tail.length; // 0 for newest (closest to head), 1 for oldest
      const currentSize = Math.max(0.1, this.size * (1 - R * 0.7)); // Tail shrinks, ensure min size
      const currentOpacity = (1 - R) * 0.4; // Tail fades, more subtle opacity

      const lightnessMatch = this.color.match(/hsl\(\d+,\s*\d+%,\s*(\d+)%\)/);
      const baseLightness = lightnessMatch ? parseInt(lightnessMatch[1]) : 70;
      const tailLightness = Math.max(10, baseLightness * (0.5 + (1-R) * 0.3)); // Tail is darker, ensure min lightness

      ctx.beginPath();
      ctx.arc(part.x, part.y, currentSize, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.baseHue}, ${this.baseSaturation}%, ${tailLightness}%, ${currentOpacity})`;
      ctx.fill();
    }
    // Head
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 5; // Add a slight glow to the head
    ctx.shadowColor = this.color.replace(/hsl\(/, 'hsla(').replace(/\)/, `, 0.5)`);
    ctx.fill();
    ctx.shadowBlur = 0; // Reset shadow
  }
}

const NUM_PARTICLES = 120; 
// HSL values from CSS variables in globals.css
const PRIMARY_COLOR_BASE = { h: 220, s: 75 }; 
const ACCENT_COLOR_BASE = { h: 250, s: 70 }; 

interface PixelFlowAnimationProps {
  className?: string;
}

export function PixelFlowAnimation({ className }: PixelFlowAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameIdRef = useRef<number>();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const initCanvasAndParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    // Check if size actually changed to avoid redundant resizing
    if (canvas.width === rect.width * dpr && canvas.height === rect.height * dpr && particlesRef.current.length > 0) {
        // If canvas physical size hasn't changed, update logical dimensions for particles
        particlesRef.current.forEach(p => {
            p.canvasWidth = rect.width;
            p.canvasHeight = rect.height;
        });
        return; // No need to re-init everything if size is same
    }

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    particlesRef.current = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
      const colorBase = Math.random() < 0.75 ? PRIMARY_COLOR_BASE : ACCENT_COLOR_BASE; // 75% primary
      particlesRef.current.push(new Particle(rect.width, rect.height, colorBase.h, colorBase.s));
    }
  }, []);

  useEffect(() => {
    if (!isClient) return;

    initCanvasAndParticles(); 

    const animate = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx) {
        animationFrameIdRef.current = requestAnimationFrame(animate); // Keep trying if canvas not ready
        return;
      }
      
      // Logical width/height for clearing
      const logicalWidth = canvas.width / (window.devicePixelRatio || 1);
      const logicalHeight = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, logicalWidth, logicalHeight);

      particlesRef.current.forEach(particle => {
        if (particle.canvasWidth !== logicalWidth || particle.canvasHeight !== logicalHeight) {
            particle.canvasWidth = logicalWidth;
            particle.canvasHeight = logicalHeight;
            // particle.reset(); // Optionally reset particles if logical size changes dramatically
        }
        particle.update();
        particle.draw(ctx);
      });
      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      initCanvasAndParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      particlesRef.current = []; // Clear particles on unmount
    };
  }, [isClient, initCanvasAndParticles]);

  if (!isClient) {
    return <div className={cn("absolute inset-0 w-full h-full z-0 bg-transparent", className)} aria-hidden="true" />;
  }

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 w-full h-full z-0", className)}
      aria-hidden="true"
    />
  );
}
