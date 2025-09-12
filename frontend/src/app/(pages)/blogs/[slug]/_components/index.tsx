import { Blocks } from '@/components/atoms/Blocks';
import { graphqlQuery } from '@/lib/graphql-client';
import { GET_DETAIL_BY_SLUG } from '@/queries/blogs';
import { ROUTES } from '@/shared/constants';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { BlocksRenderer } from "@strapi/blocks-react-renderer";


interface BlogsDetailsProps {
  params: { slug?: string; status?: "DRAFT" | "PUBLISHED" };
}

const BlogsDetails = async ({ params }: BlogsDetailsProps) => {
  const { slug, status } = params;

  const res = await graphqlQuery(GET_DETAIL_BY_SLUG, {
    filters: {
      slug: { eq: slug },
    },
    status,
  });

  const blog = res.blogs[0];
  console.log(blog);

  if (!blog) return redirect(ROUTES.NOT_FOUND);
  console.log("BLOG CONTENTS ===>", blog.contents, typeof blog.contents);

  return (
    <div className="max-w-[1000px] mx-auto p-6 space-y-8">
      <h1 className="text-[36px] font-bold mb-6 text-[#333333]">
        {blog.title}
      </h1>

      {/* {blog.image?.url && (
        <div className="relative w-full aspect-[3/2] max-h-[550px]">
          <Image
            src={blog.image.url}
            alt={blog.image.alternativeText || blog.title}
            fill
            className="object-fill rounded-lg"
          />
        </div>
      )} */}

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
            p: ({ children }) => <p className="text-[17px]">{children}</p>,
            a: ({ ...props }) => (
              <a
                {...props}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[17px] text-[#1155cc] underline"
              />
            ),
            ul: ({ ...props }) => (
              <ul
                {...props}
                className="list-disc list-inside text-[17px] whitespace-normal"
              />
            ),
            ol: ({ ...props }) => (
              <ol
                {...props}
                className="list-decimal list-inside text-[17px] whitespace-normal"
              />
            ),
            li: ({ ...props }) => (
              <li {...props} className="whitespace-normal" />
            ),
          }}
        >

        </ReactMarkdown>
        <BlocksRenderer content={blog.contents} />
      </div>
    </div>
  );
};

export default BlogsDetails;
