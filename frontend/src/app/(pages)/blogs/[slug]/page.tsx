import BlogsDetails from './_components';

interface PageProps {
  params: { slug: string };
}

const BlogsPageDetail = async ({ params }: PageProps) => {
  const slug = decodeURIComponent(params.slug);

  return (
    <div className="space-y-8 p-4">
      <BlogsDetails params={{ slug }} />
    </div>
  );
};

export default BlogsPageDetail;
