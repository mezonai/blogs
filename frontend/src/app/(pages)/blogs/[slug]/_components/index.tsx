import { graphqlQuery } from '@/lib/graphql-client';
import { GET_DETAIL_BY_SLUG } from '@/queries/blogs';
import { ROUTES } from '@/shared/constants';
import { getMediaUrl } from '@/shared/utils';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import ContactSection from './ContactSection';

const BlogsDetails = async ({
  searchParams,
}: {
  searchParams: { slug?: string };
}) => {
  const { slug } = searchParams;

  const res = await graphqlQuery(GET_DETAIL_BY_SLUG, {
    filters: {
      slug: {
        eq: slug,
      },
    },
  });

  const blog = res.blogs[0];

  if (!blog) return redirect(ROUTES.NOT_FOUND);

  return (
    <div className="max-w-[1000px] mx-auto p-6 space-y-8">
      <h1 className="text-[36px] font-bold mb-6 text-[#333333]">
        {blog.title}
      </h1>

      {blog.image?.url && (
        <div className="relative w-full aspect-[16/9] max-h-[550px]">
          <Image
            src={getMediaUrl(blog.image.url)}
            alt={blog.image.alternativeText || blog.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      <div className="prose max-w-none">
        <ReactMarkdown
          components={{
            img: ({ ...props }) => (
              <img {...props} className="w-[100vw] rounded-lg" />
            ),
          }}
        >
          {blog.content}
        </ReactMarkdown>
      </div>
      <ContactSection />
    </div>
  );
};

export default BlogsDetails;
