
"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function BlogPagination({ currentPage, totalPages, onPageChange }: BlogPaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Determine pages to show (e.g., current page, 2 before, 2 after)
  const pages = [];
  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Blog post pagination" className="flex justify-center items-center space-x-2 mt-12 md:mt-16">
      <Button
        variant="outline"
        size="icon"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        className="h-10 w-10"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>

      {startPage > 1 && (
        <>
          <Button variant={1 === currentPage ? "default" : "outline"} onClick={() => onPageChange(1)} className="h-10 w-10">1</Button>
          {startPage > 2 && <span className="text-muted-foreground">...</span>}
        </>
      )}

      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className="h-10 w-10"
        >
          {page}
        </Button>
      ))}

      {endPage < totalPages && (
         <>
          {endPage < totalPages -1 && <span className="text-muted-foreground">...</span>}
          <Button variant={totalPages === currentPage ? "default" : "outline"} onClick={() => onPageChange(totalPages)} className="h-10 w-10">{totalPages}</Button>
        </>
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        className="h-10 w-10"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </nav>
  );
}
