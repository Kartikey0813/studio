
"use client";

import { testimonials, type Testimonial } from '@/lib/mockData';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Image from 'next/image';
import { Star, UserCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/50'}`}
        />
      ))}
    </div>
  );
};

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-background">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">Loved by Our Clients</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Hear what our satisfied clients have to say about their experience with PixelsFlow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card className="h-full flex flex-col bg-card shadow-lg hover:shadow-primary/20 transition-shadow duration-300 transform hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center space-x-4 p-6">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      fill 
                      className="object-cover"
                      sizes="64px"
                      data-ai-hint="person portrait"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow p-6 pt-0">
                  <StarRating rating={testimonial.rating} />
                  <blockquote className="mt-4 text-foreground/90 italic border-l-4 border-primary pl-4 py-2">
                    "{testimonial.feedback}"
                  </blockquote>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
