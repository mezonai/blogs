import BlogsDetails from "./_components";
import { gql } from "graphql-tag";
import { graphqlQuery } from "@/lib/graphql-client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  try {
    const GET_ALL_SLUGS = gql`
      query GetAllBlogSlugs($pagination: PaginationArg) {
        blogs_connection(status: PUBLISHED, pagination: $pagination) {
          nodes {
            slug
          }
          pageInfo {
            total
            pageCount
            pageSize
          }
        }
      }
    `;

    // First, get the first page to know how many pages we need
    const firstPageData = await graphqlQuery(GET_ALL_SLUGS);

    const pageInfo = firstPageData?.blogs_connection?.pageInfo;
    if (!pageInfo) {
      console.error("No pageInfo returned from GraphQL");
      return [];
    }

    const { pageCount, total } = pageInfo;
    let allBlogs = firstPageData?.blogs_connection?.nodes || [];

    // If there are more pages, fetch them all
    if (pageCount > 1) {
      const remainingPages = [];
      for (let page = 2; page <= pageCount; page++) {
        remainingPages.push(
          graphqlQuery(GET_ALL_SLUGS, {
            pagination: { page, pageSize: 100 }
          })
        );
      }

      const remainingPagesData = await Promise.all(remainingPages);
      for (const pageData of remainingPagesData) {
        const nodes = pageData?.blogs_connection?.nodes || [];
        allBlogs = [...allBlogs, ...nodes];
      }
    }

    console.log(`✅ Generated static params for ${allBlogs.length} blogs (expected: ${total})`);

    // Verify we got all blogs
    if (allBlogs.length < total) {
      console.warn(`⚠️ Warning: Only fetched ${allBlogs.length} of ${total} blogs. Some pages may be missing.`);
    }

    return allBlogs.map((blog: { slug: string }) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

const BlogsPageDetail = async ({ params }: PageProps) => {
  const { slug } = await params;
  const slugDecode = decodeURIComponent(slug);

  // For static export, always use PUBLISHED status
  const status = "PUBLISHED";

  return (
    <div className="space-y-8 p-4">
      <BlogsDetails params={{ slug: slugDecode, status }} />
    </div>
  );
};

export default BlogsPageDetail;
