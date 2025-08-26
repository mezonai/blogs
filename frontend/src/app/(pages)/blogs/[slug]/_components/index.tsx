import { graphqlQuery } from '@/lib/graphql-client';
import { GET_DETAIL_BY_SLUG } from '@/queries/blogs';
import { ROUTES } from '@/shared/constants';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import ContactSection from './ContactSection';

const BlogsDetails = async ({ params }: { params: { slug?: string } }) => {
  const { slug } = params;

  const res = await graphqlQuery(GET_DETAIL_BY_SLUG, {
    filters: {
      slug: {
        eq: slug,
      },
    },
    status: 'PUBLISHED',
  });

  const blog = res.blogs[0];

  if (!blog) return redirect(ROUTES.NOT_FOUND);

  return (
    <div className="max-w-[1000px] mx-auto p-6 space-y-8">
      <h1 className="text-[36px] font-bold mb-6 text-[#333333]">
        {blog.title}
      </h1>

      {blog.image?.url && (
        <div className="relative w-full aspect-[3/2] max-h-[550px]">
          <Image
            src={blog.image.url}
            alt={blog.image.alternativeText || blog.title}
            fill
            className="object-fill rounded-lg"
          />
        </div>
      )}

      <div
        className="prose max-w-none whitespace-pre-line leading-1"
        style={{ fontFamily: '"Times New Roman", Times, serif' }}
      >
        <ReactMarkdown
          components={{
            img: ({ ...props }) => (
              <img {...props} className="w-[100vw] !rounded-lg my-4" />
            ),
            h1: ({ ...props }) => (
              <h1 {...props} className="font-bold text-[20px]" />
            ),
            h2: ({ ...props }) => (
              <h2 {...props} className="font-bold text-[19px]" />
            ),
            h3: ({ ...props }) => (
              <h3 {...props} className="font-bold text-[18px]" />
            ),
            h4: ({ ...props }) => (
              <h4 {...props} className="font-bold text-[17px]" />
            ),
            p: ({ ...props }) => <p {...props} className="text-[17px]" />,
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
