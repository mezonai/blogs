'use client';

import { BlogCard } from './BlogCard';
import { BlogsPagination } from './BlogsPagination';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  
  const handlePageChange = (page: number) => {
    // Use path-based pagination for static export
    if (page === 1) {
      router.push('/blogs/');
    } else {
      router.push(`/blogs/page/${page}/`);
    }
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
