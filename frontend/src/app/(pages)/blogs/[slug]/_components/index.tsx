import { Blocks } from '@/components/atoms/Blocks';
import { graphqlQuery } from '@/lib/graphql-client';
import { GET_DETAIL_BY_SLUG } from '@/queries/blogs';
import { ROUTES } from '@/shared/constants';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import Hashtags from './Hashtags';

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
  console.log(blog);

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

      <div style={{ fontFamily: '"Times New Roman", Times, serif' }}>
        <Blocks content={blog.contents} />
        {blog.hashtags && <Hashtags hashtags={blog.hashtags} />}
        {blog.contact?.contents && (
          <>
            <p>------------------------------------------------</p>
            <Blocks content={blog?.contact?.contents} />
          </>
        )}
      </div>
    </div>
  );
};

export default BlogsDetails;
