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
    description: string;
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
      <div className="flex flex-wrap justify-center gap-8">
        {data.map((blog) => (
          <BlogCard
            key={blog.documentId}
            image={blog.image?.url || ''}
            title={blog.title}
            content={blog.description}
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
