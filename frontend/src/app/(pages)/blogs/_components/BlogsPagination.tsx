'use client';

import { Button } from '@/components/atoms/button';

interface BlogsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function BlogsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: BlogsPaginationProps) {
  if (totalPages < 1) return null;

  const generatePages = (): (number | '...')[] => {
    const pages: (number | '...')[] = [];

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 2) {
      pages.push(1, 2, 3, '...', totalPages);
    } else if (currentPage >= totalPages - 1) {
      pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages,
      );
    }

    return pages;
  };

  return (
    <div className="flex flex-wrap justify-center items-center gap-2">
      <div className="flex gap-2 items-center">
        {/* First Button */}
        <Button
          size="sm"
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
          className={`!px-3 !py-1 border-[#EDEEEE] hover:border-primary
            ${
              currentPage === 1
                ? 'bg-[#F5F7FA] border-[#A0ABBA] text-[#A0ABBA]'
                : ''
            }`}
        >
          First
        </Button>

        {/* Prev Button */}
        <Button
          size="sm"
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className={`!px-3 !py-1 border-[#EDEEEE] hover:border-primary
            ${
              currentPage === 1
                ? 'bg-[#F5F7FA] border-[#A0ABBA] text-[#A0ABBA]'
                : ''
            }`}
        >
          Prev
        </Button>

        {/* Page Buttons */}
        {generatePages().map((page, idx) =>
          page === '...' ? (
            <span
              key={`ellipsis-${idx}`}
              className="text-muted-foreground px-2"
            >
              ...
            </span>
          ) : (
            <Button
              key={page}
              size="sm"
              className={`!w-[36px] !p-4 text-sm ${
                currentPage === page
                  ? 'border border-[#6366f1] bg-[#6366f1] text-white hover:bg-primary cursor-default'
                  : 'border-primary text-primary hover:text-primary'
              }`}
              variant={currentPage === page ? 'default' : 'outline'}
              onClick={() => {
                if (currentPage !== page) onPageChange(page);
              }}
            >
              {page}
            </Button>
          ),
        )}

        {/* Next Button */}
        <Button
          size="sm"
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className={`!px-3 !py-1 border-[#EDEEEE] hover:border-primary
            ${
              currentPage === totalPages
                ? 'bg-[#F5F7FA] border-[#A0ABBA] text-[#A0ABBA]'
                : ''
            }`}
        >
          Next
        </Button>

        {/* Last Button */}
        <Button
          size="sm"
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`!px-3 !py-1 border-[#EDEEEE] hover:border-primary
            ${
              currentPage === totalPages
                ? 'bg-[#F5F7FA] border-[#A0ABBA] text-[#A0ABBA]'
                : ''
            }`}
        >
          Last
        </Button>
      </div>
    </div>
  );
}
