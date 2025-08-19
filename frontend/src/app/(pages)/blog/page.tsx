'use client';

import { useEffect, useState } from 'react';
import { graphqlQuery } from '@/lib/graphql-client';
import { GET_BLOG_LIST } from '@/queries/blog';
import Link from 'next/link';

type Blog = {
  documentId: string;
  title: string;
  content: string;
  imageUrl?: string;
};

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 1;

  const fetchBlogs = async (currentPage: number) => {
    setLoading(true);
    try {
      const data = await graphqlQuery(GET_BLOG_LIST, {
        pagination: { page: currentPage, pageSize },
      });

      const blogsData = data.blogs.map((item: any) => ({
        documentId: item.documentId,
        title: item.title,
        content: item.content,
        imageUrl: item.image?.url,
      }));

      setBlogs(blogsData);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(page);
  }, [page]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      {blogs.map((blog) => (
        <div key={blog.documentId} className="border rounded p-4 shadow">
          <h2 className="text-xl font-bold">{blog.title}</h2>
          {blog.imageUrl && (
            <img src={blog.imageUrl} alt={blog.title} className="my-2" />
          )}
          <p>
            {blog.content.length > 200
              ? blog.content.substring(0, 200) + '...'
              : blog.content}
          </p>
          <Link
            href={`/blog/${blog.documentId}`}
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            Read more
          </Link>

        </div>
      ))}

      {/* Phân trang */}
      <div className="flex justify-center gap-4 mt-4">
        <button
          className="px-4 py-2 border rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <span className="px-2 py-2">Page {page}</span>
        <button
          className="px-4 py-2 border rounded"
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
