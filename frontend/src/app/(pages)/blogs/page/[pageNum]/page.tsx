import BlogsContent from '../../_components';
import { graphqlQuery } from '@/lib/graphql-client';
import { GET_BLOG_LIST } from '@/queries/blogs';

interface PageProps {
  params: Promise<{ pageNum: string }>;
}

// Generate static params for pagination
export async function generateStaticParams() {
  try {
    // Get total number of blogs to calculate pages
    const res = await graphqlQuery(GET_BLOG_LIST, {
      filters: {
        isComingSoon: {
          eq: false,
        },
      },
      pagination: {
        page: 1,
        pageSize: 6,
      },
      sort: ['createdAt:DESC'],
      status: 'PUBLISHED',
    }, { tags: ['blog'] });

    const pageCount = res.blogs_connection?.pageInfo?.pageCount || 1;
    
    // Generate params for all pages
    const params = [];
    for (let i = 1; i <= pageCount; i++) {
      params.push({ pageNum: i.toString() });
    }
    
    return params;
  } catch (error) {
    console.error('Error generating static params for blogs pagination:', error);
    return [];
  }
}

const BlogsPageNum = async ({ params }: PageProps) => {
  const { pageNum } = await params;
  
  return (
    <div className="space-y-8 py-8 px-4">
      <h2 className="text-[30px] font-[600]">Recent Posts</h2>
      <BlogsContent searchParams={{ page: pageNum }} />
    </div>
  );
};

export default BlogsPageNum;



