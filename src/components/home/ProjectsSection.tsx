
"use client";

import { useState } from 'react';
import { projects, type Project } from '@/lib/mockData';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ProjectsSection() {
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  return (
    <section id="projects" className="bg-card/50">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold gradient-text">Our Creations</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore a selection of our finest work, showcasing innovation and pixel-perfect execution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              layoutId={project.id}
              onMouseEnter={() => setHoveredProjectId(project.id)}
              onMouseLeave={() => setHoveredProjectId(null)}
              onClick={() => setActiveProjectId(project.id === activeProjectId ? null : project.id)}
              className="relative cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className={`overflow-hidden shadow-lg transition-all duration-500 ease-out h-full flex flex-col ${hoveredProjectId === project.id || activeProjectId === project.id ? 'ring-2 ring-primary shadow-primary/40' : 'hover:shadow-xl'}`}>
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className={`object-cover transition-transform duration-500 ease-out ${hoveredProjectId === project.id || activeProjectId === project.id ? 'scale-110' : 'group-hover:scale-105'}`}
                    data-ai-hint="project screenshot technology"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-end p-4">
                     <CardTitle className="text-xl font-semibold text-primary-foreground">{project.title}</CardTitle>
                  </div>
                </div>
                
                <AnimatePresence>
                {(hoveredProjectId === project.id || activeProjectId === project.id) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-card"
                  >
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-1">{project.category}</p>
                      <p className="text-sm text-foreground/90 mb-3 line-clamp-3">{project.description}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between items-center">
                      <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10" onClick={(e) => { e.stopPropagation(); setActiveProjectId(project.id === activeProjectId ? null : project.id); }}>
                        <ZoomIn className="mr-2 h-4 w-4" /> Details
                      </Button>
                      {project.link && (
                        <Button asChild variant="link" size="sm" className="text-accent hover:text-accent/80" onClick={(e) => e.stopPropagation()}>
                          <Link href={project.link} target="_blank" rel="noopener noreferrer">
                            View Live <ExternalLink className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </CardFooter>
                  </motion.div>
                )}
                </AnimatePresence>
                 {(hoveredProjectId !== project.id && activeProjectId !== project.id) && (
                     <CardContent className="p-4 flex-grow">
                        <p className="text-sm text-muted-foreground">{project.category}</p>
                     </CardContent>
                 )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      
      <AnimatePresence>
        {activeProjectId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setActiveProjectId(null)}
          >
            {projects.find(p => p.id === activeProjectId) && (
              <motion.div
                layoutId={activeProjectId}
                className="bg-card rounded-lg shadow-2xl max-w-2xl w-full overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full aspect-video">
                  <Image src={projects.find(p => p.id === activeProjectId)!.image} alt={projects.find(p => p.id === activeProjectId)!.title} fill className="object-cover" data-ai-hint="project detail technology"/>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl gradient-text">{projects.find(p => p.id === activeProjectId)!.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">{projects.find(p => p.id === activeProjectId)!.category}</p>
                  <p className="text-foreground/90">{projects.find(p => p.id === activeProjectId)!.description}</p>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                   <Button variant="outline" onClick={() => setActiveProjectId(null)}>Close</Button>
                   {projects.find(p => p.id === activeProjectId)!.link && (
                     <Button asChild className="gradient-bg text-primary-foreground">
                       <Link href={projects.find(p => p.id === activeProjectId)!.link!} target="_blank" rel="noopener noreferrer">
                         Visit Site <ExternalLink className="ml-2 h-4 w-4" />
                       </Link>
                     </Button>
                   )}
                </CardFooter>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
