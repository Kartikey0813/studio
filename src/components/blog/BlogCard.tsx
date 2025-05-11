
"use client";

import type { BlogPost } from '@/lib/mockData';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarDays, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { FormattedDate } from '@/components/shared/FormattedDate';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.1 }} // Stagger animation for items in view
      className="h-full"
    >
      <Card className="h-full flex flex-col group overflow-hidden shadow-lg hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1 bg-card">
        <Link href={`/blog/${post.slug}`} className="block">
          <div className="relative w-full aspect-video overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
              data-ai-hint="blog theme technology"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300"></div>
          </div>
        </Link>
        <CardHeader className="p-4 md:p-6">
          <Link href={`/blog/${post.slug}`} className="block">
            <CardTitle className="text-xl lg:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </CardTitle>
          </Link>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0 flex-grow">
          <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{post.excerpt}</p>
          <div className="flex items-center text-xs text-muted-foreground space-x-3">
            <div className="flex items-center">
              <CalendarDays size={14} className="mr-1.5" />
              <FormattedDate isoDateString={post.date} />
            </div>
            <div className="flex items-center">
              <User size={14} className="mr-1.5" />
              <span>{post.author}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 md:p-6 pt-0">
          <Button asChild variant="link" className="p-0 text-primary group-hover:text-accent transition-colors">
            <Link href={`/blog/${post.slug}`}>
              Read More <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
