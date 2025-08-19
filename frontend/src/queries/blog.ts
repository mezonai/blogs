import { gql } from "@apollo/client";
export const GET_BLOG_LIST = `
    query Blogs($pagination: PaginationArg) {
        blogs(pagination: $pagination) {
            documentId
            title
            content
            image {
                url
            }
        }
    }
`;

export const GET_DETAIL_BLOG = `
    query Blog($documentId: ID!, $status: PublicationStatus) {
        blog(documentId: $documentId, status: $status) {
            title
            content
            author
            image {
                url
            }
        }
    }
`;