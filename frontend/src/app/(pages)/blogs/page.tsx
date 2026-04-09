import BlogsContent from './_components';

// For static export, default page shows page 1
const BlogsPage = async () => {
  return (
    <div className="space-y-8 py-8 px-4">
      <h2 className="text-[30px] font-[600]">Recent Posts</h2>
      <BlogsContent searchParams={{ page: '1' }} />
    </div>
  );
};

export default BlogsPage;
