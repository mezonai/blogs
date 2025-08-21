import { gql } from '@apollo/client';

export const GET_BLOG_LIST = gql`
  query GetBlogList(
    $pagination: PaginationArg
    $sort: [String]
    $status: PublicationStatus
  ) {
    blogs_connection(pagination: $pagination, sort: $sort, status: $status) {
      nodes {
        title
        slug
        content
        createdAt
        documentId
        description
        image {
          url
          alternativeText
        }
      }
      pageInfo {
        page
        pageCount
        pageSize
        total
      }
    }
  }
`;

export const GET_DETAIL_BY_SLUG = gql`
  query GetBlogDetailBySlug(
    $filters: BlogFiltersInput
    $status: PublicationStatus
  ) {
    blogs(filters: $filters, status: $status, pagination: { pageSize: 1 }) {
      content
      documentId
      image {
        url
        alternativeText
      }
      slug
      title
      description
    }
  }
`;
