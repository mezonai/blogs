import { Blocks } from '@/components/atoms/Blocks';
import { graphqlQuery } from '@/lib/graphql-client';
import { GET_DETAIL_BY_SLUG } from '@/queries/blogs';
import { ROUTES } from '@/shared/constants';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import Hashtags from './Hashtags';


interface Props {
  params: { slug?: string; status?: "DRAFT" | "PUBLISHED" };
}

const BlogsDetails = async ({ params }: Props) => {
  const res = await graphqlQuery(GET_DETAIL_BY_SLUG, {
    filters: {
      slug: { eq: params.slug },
    },
    status: params.status || "PUBLISHED",
  }, { tags: ['blog'] });

  const blog = res.blogs.at(0);

  if (!blog) return redirect(ROUTES.COMING_SOON);

  return (
    <div className="max-w-[1000px] mx-auto p-6 space-y-8">
      {blog?.isComingSoon ? (
        <div className="relative w-full flex justify-center items-center min-h-[60vh]">
          <Image
            src="/coming-soon.png"
            alt="coming-soon.png"
            width="300"
            height="300"
            className="h-[300px] w-[300px]"
          />
        </div>
      ) : (
        <>
          <h1 className="text-[36px] font-bold mb-6 text-[#333333]">
            {blog.title}
          </h1>

          {blog.image?.url && (
            <div className="relative w-full aspect-[3/2]">
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
        </>
      )}
    </div>
  );
};

export default BlogsDetails;
