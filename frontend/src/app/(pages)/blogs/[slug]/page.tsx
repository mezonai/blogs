import { draftMode } from "next/headers";
import BlogsDetails from "./_components";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const BlogsPageDetail = async ({ params }: PageProps) => {
  const { slug } = await params;
  const slugDecode = decodeURIComponent(slug);

  const { isEnabled } = await draftMode();
  const status = isEnabled ? "DRAFT" : "PUBLISHED";

  return (
    <div className="space-y-8 p-4">
      <BlogsDetails params={{ slug: slugDecode, status }} />
    </div>
  );
};

export default BlogsPageDetail;
