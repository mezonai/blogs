'use client';

import { BlogCard } from './BlogCard';
import { BlogsPagination } from './BlogsPagination';

interface BlogsListProps {
  data: {
    documentId: string;
    title: string;
    slug: string;
    content: string;
    image?: { url: string; alternativeText?: string } | null;
  }[];
  totalPages: number;
  currentPage: number;
}

export default function BlogsList({
  data,
  totalPages,
  currentPage,
}: BlogsListProps) {
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', page.toString());
    window.location.search = params.toString();
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
        {data.map((blog) => (
          <BlogCard
            key={blog.documentId}
            image={blog.image?.url || ''}
            title={blog.title}
            content={blog.content}
            slug={blog.slug}
          />
        ))}
      </div>

      <BlogsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
