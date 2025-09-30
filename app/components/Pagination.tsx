'use client';
import { Button, Text } from '@radix-ui/themes';
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  // Generate page numbers to display
  const getVisiblePages = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        // Show first 5 pages
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        // Show last 5 pages
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show current page and 2 on each side
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center mt-6">
      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        {/* Previous button */}
        <Button
          variant="soft"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          size="2"
        >
          Previous
        </Button>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {/* First page if not visible */}
          {visiblePages[0] > 1 && (
            <>
              <Button
                variant={1 === currentPage ? "solid" : "ghost"}
                onClick={() => onPageChange(1)}
                size="2"
              >
                1
              </Button>
              {visiblePages[0] > 2 && (
                <Text size="2" color="gray">...</Text>
              )}
            </>
          )}

          {/* Visible page numbers */}
          {visiblePages.map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "solid" : "ghost"}
              onClick={() => onPageChange(page)}
              size="2"
            >
              {page}
            </Button>
          ))}

          {/* Last page if not visible */}
          {visiblePages[visiblePages.length - 1] < totalPages && (
            <>
              {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                <Text size="2" color="gray">...</Text>
              )}
              <Button
                variant={totalPages === currentPage ? "solid" : "ghost"}
                onClick={() => onPageChange(totalPages)}
                size="2"
              >
                {totalPages}
              </Button>
            </>
          )}
        </div>

        {/* Next button */}
        <Button
          variant="soft"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          size="2"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination;