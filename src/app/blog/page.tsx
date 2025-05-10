
"use client";

import { useState, useMemo } from 'react';
import { blogPosts as allBlogPosts, type BlogPost } from '@/lib/mockData';
import { BlogCard } from '@/components/blog/BlogCard';
import { BlogPagination } from '@/components/blog/BlogPagination';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const POSTS_PER_PAGE = 9;

export default function BlogPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBlogPosts = useMemo(() => {
    return allBlogPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredBlogPosts.length / POSTS_PER_PAGE);
  
  const currentPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    return filteredBlogPosts.slice(startIndex, endIndex);
  }, [currentPage, filteredBlogPosts]);


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container py-12 md:py-20">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold gradient-text">PixelsFlow Blog</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
          Insights, trends, and stories from the world of design and technology.
        </p>
      </div>

      <div className="mb-8 md:mb-12 max-w-xl mx-auto">
        <div className="relative">
          <Input 
            type="search"
            placeholder="Search articles..."
            className="pl-10 pr-4 py-3 text-base bg-card border-border focus:ring-primary"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on new search
            }}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>
      </div>
      
      {currentPosts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {currentPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-2xl font-semibold text-muted-foreground">No articles found.</p>
          <p className="mt-2 text-foreground/80">Try adjusting your search or check back later for new content.</p>
        </div>
      )}


      {totalPages > 1 && (
        <BlogPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
