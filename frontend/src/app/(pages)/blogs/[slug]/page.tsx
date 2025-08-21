import BlogsDetails from './_components';

interface SearchParams {
  searchParams: Promise<{
    slug?: string;
  }>;
}

const BlogsPageDetail = async ({ searchParams }: SearchParams) => {
  const { slug } = await searchParams;
  return (
    <div className="space-y-8 p-4">
      <BlogsDetails searchParams={{ slug }} />
    </div>
  );
};

export default BlogsPageDetail;
