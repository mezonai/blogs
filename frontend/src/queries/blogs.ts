import { gql } from '@apollo/client';

export const GET_BLOG_LIST = gql`
  query GetBlogList(
    $filters: BlogFiltersInput
    $pagination: PaginationArg
    $sort: [String]
    $status: PublicationStatus
  ) {
    blogs_connection(
      filters: $filters
      pagination: $pagination
      sort: $sort
      status: $status
    ) {
      nodes {
        title
        slug
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
      documentId
      image {
        url
        alternativeText
      }
      slug
      title
      description
      contents
      isComingSoon
      hashtags {
        name
      }
      contact {
        contents
      }
    }
  }
`;
