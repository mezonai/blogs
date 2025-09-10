import BlogsDetails from './_components';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const BlogsPageDetail = async ({ params }: PageProps) => {
  const { slug } = await params;
  const slugDecode = decodeURIComponent(slug);

  return (
    <div className="space-y-8 p-4">
      <BlogsDetails params={{ slug: slugDecode }} />
    </div>
  );
};

export default BlogsPageDetail;
