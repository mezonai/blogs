'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { graphqlQuery } from '@/lib/graphql-client';
import { GET_DETAIL_BLOG } from '@/queries/blog';
import { BlogStatus } from '@/shared/enums/status';

type Blog = {
  title: string;
  content: string;
  author?: string;
  imageUrl?: string;
};

export default function BlogDetailPage() {
  const params = useParams();
  const { id } = params as { id: string }; // id chính là documentId
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBlogDetail = async (documentId: string) => {
    try {
      const data = await graphqlQuery(GET_DETAIL_BLOG, {
        documentId,
        status: BlogStatus.PUBLISHED
      });

      const blogData = data.blog;
      setBlog({
        title: blogData.title,
        content: blogData.content,
        author: blogData.author,
        imageUrl: blogData.image?.url,
      });
    } catch (error) {
      console.error('Error fetching blog detail:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchBlogDetail(id);
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!blog) return <p>Blog not found</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">{blog.title}</h1>
      <p className="text-gray-600">By {blog.author}</p>
      {blog.imageUrl && (
        <img src={blog.imageUrl} alt={blog.title} className="my-4" />
      )}
      <p className="whitespace-pre-line">{blog.content}</p>
    </div>
  );
}
