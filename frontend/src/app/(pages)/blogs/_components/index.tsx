import { graphqlQuery } from '@/lib/graphql-client';
import { GET_BLOG_LIST } from '@/queries/blogs';
import { ROUTES } from '@/shared/constants';
import { redirect } from 'next/navigation';
import BlogsList from './BlogsList';

const BlogsContent = async ({
  searchParams,
}: {
  searchParams: { page?: string };
}) => {
  const numPage = Number(searchParams.page);
  const currentPage = isNaN(numPage) || numPage < 1 ? 1 : numPage;

  const res = await graphqlQuery(GET_BLOG_LIST, {
    filters: {
      isComingSoon: {
        eq: false,
      },
    },
    pagination: {
      page: currentPage,
      pageSize: 6,
    },
    sort: ['createdAt:DESC'],
    status: 'PUBLISHED',
  }, { tags: ['blog'] });

  const blogsConnection = res.blogs_connection;
  if (!blogsConnection) return redirect(ROUTES.NOT_FOUND);

  const { nodes, pageInfo } = blogsConnection;

  return (
    <BlogsList
      data={nodes}
      totalPages={pageInfo.pageCount}
      currentPage={pageInfo.page}
    />
  );
};

export default BlogsContent;
