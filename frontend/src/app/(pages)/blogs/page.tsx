import BlogsContent from './_components';

interface SearchParams {
  searchParams: Promise<{
    page?: string;
  }>;
}

const BlogsPage = async ({ searchParams }: SearchParams) => {
  const { page } = await searchParams;
  return (
    <div className="space-y-8 py-8 px-4">
      <h2 className="text-[30px] font-[600]">Recent Posts</h2>
      <BlogsContent searchParams={{ page }} />
    </div>
  );
};

export default BlogsPage;
