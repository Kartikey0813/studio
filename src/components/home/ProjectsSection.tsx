
"use client";

import { useState } from 'react';
import { projects, type Project } from '@/lib/mockData';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ProjectsSection() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const selectedProject = activeProjectId ? projects.find(p => p.id === activeProjectId) : null;

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
              layoutId={`project-card-${project.id}`}
              onClick={() => setActiveProjectId(project.id)}
              className="relative cursor-pointer group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="overflow-hidden shadow-lg transition-all duration-300 ease-out h-full flex flex-col hover:shadow-primary/40 transform hover:-translate-y-1">
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    data-ai-hint="project screenshot technology"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex items-end p-4">
                     <CardTitle className="text-xl font-semibold text-primary-foreground group-hover:text-primary transition-colors">{project.title}</CardTitle>
                  </div>
                </div>
                <CardContent className="p-4 flex-grow">
                  <p className="text-sm text-muted-foreground">{project.category}</p>
                  <p className="text-sm text-foreground/90 mt-1 line-clamp-2">{project.description}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                    <Button variant="link" size="sm" className="text-primary group-hover:text-accent p-0">
                        View Details
                    </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setActiveProjectId(null)} // Close on overlay click
          >
            <motion.div
              layoutId={`project-card-${selectedProject.id}`} // Ensure this matches the card's layoutId for animation
              className="bg-card rounded-xl shadow-2xl w-11/12 md:w-5/6 lg:w-3/4 max-w-5xl max-h-[90vh] flex flex-col overflow-hidden"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
              initial={{scale: 0.95, opacity: 0.8}}
              animate={{scale: 1, opacity: 1}}
              exit={{scale: 0.95, opacity: 0}}
              transition={{duration: 0.3, ease: "easeInOut"}}
            >
              <div className="relative">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-3 right-3 z-10 text-foreground hover:bg-background/50 hover:text-primary"
                    onClick={() => setActiveProjectId(null)}
                    aria-label="Close project details"
                >
                    <X size={24} />
                </Button>
                <div className="relative w-full aspect-video sm:aspect-[2/1] overflow-hidden">
                  <Image 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    fill 
                    className="object-cover" 
                    sizes="80vw"
                    data-ai-hint="project detail technology"
                  />
                </div>
              </div>
              
              <div className="p-6 sm:p-8 overflow-y-auto flex-grow">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-3xl md:text-4xl gradient-text">{selectedProject.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-base text-muted-foreground mb-2">{selectedProject.category}</p>
                  <p className="text-lg text-foreground/90 leading-relaxed">{selectedProject.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                  {/* Add more project details here as needed */}
                </CardContent>
              </div>

              <CardFooter className="p-6 sm:p-8 border-t border-border flex flex-col sm:flex-row justify-end gap-3 bg-card/50">
                 <Button variant="outline" onClick={() => setActiveProjectId(null)} className="w-full sm:w-auto">Close</Button>
                 {selectedProject.link && (
                   <Button asChild className="gradient-bg text-primary-foreground w-full sm:w-auto">
                     <Link href={selectedProject.link!} target="_blank" rel="noopener noreferrer">
                       Visit Site <ExternalLink className="ml-2 h-4 w-4" />
                     </Link>
                   </Button>
                 )}
              </CardFooter>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
