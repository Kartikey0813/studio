
"use client";

import { services, type Service } from '@/lib/mockData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// All tiles are now md:col-span-1 md:row-span-1 for a consistent square-ish look
const tileVariants = [
  "md:col-span-1 md:row-span-1", 
  "md:col-span-1 md:row-span-1", 
  "md:col-span-1 md:row-span-1", 
  "md:col-span-1 md:row-span-1", 
  "md:col-span-1 md:row-span-1", 
  "md:col-span-1 md:row-span-1", 
];

export function ServicesSection() {
  return (
    <section id="services" className="bg-background">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">Our Expertise</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From concept to launch, we provide a comprehensive suite of services to elevate your brand.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 auto-rows-fr">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className={tileVariants[index % tileVariants.length] || "md:col-span-1 md:row-span-1"}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col group overflow-hidden shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1 bg-card">
                {service.image && (
                  <div className="relative w-full h-48 md:h-56 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                      data-ai-hint="abstract service related"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <CardHeader className="absolute bottom-0 left-0 w-full p-4 md:p-6 z-10">
                      <div className="flex items-center mb-1">
                        <service.icon className="h-7 w-7 mr-2.5 text-primary-foreground" />
                        <CardTitle className="text-xl font-semibold text-primary-foreground line-clamp-2">{service.title}</CardTitle>
                      </div>
                    </CardHeader>
                  </div>
                )}
                {!service.image && (
                  <CardHeader className="p-4 md:p-6">
                    <div className="flex items-center mb-2">
                      <service.icon className="h-8 w-8 mr-3 text-primary" />
                      <CardTitle className="text-xl md:text-2xl font-semibold text-foreground line-clamp-2">{service.title}</CardTitle>
                    </div>
                  </CardHeader>
                )}
                <CardContent className={`flex-grow flex flex-col justify-between p-4 md:p-6 ${service.image ? 'pt-4' : 'pt-0'}`}>
                  <CardDescription className={`mb-4 text-sm ${service.image ? 'text-foreground/90' : 'text-muted-foreground'} line-clamp-3`}>
                    {service.description}
                  </CardDescription>
                  <Button variant="link" asChild className="self-start p-0 text-primary group-hover:text-accent transition-colors">
                    <Link href={`/services#${service.id}`}>
                      Learn More <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
