/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetBlogList(\n    $filters: BlogFiltersInput\n    $pagination: PaginationArg\n    $sort: [String]\n    $status: PublicationStatus\n  ) {\n    blogs_connection(\n      filters: $filters\n      pagination: $pagination\n      sort: $sort\n      status: $status\n    ) {\n      nodes {\n        title\n        slug\n        createdAt\n        documentId\n        description\n        image {\n          url\n          alternativeText\n        }\n      }\n      pageInfo {\n        page\n        pageCount\n        pageSize\n        total\n      }\n    }\n  }\n": typeof types.GetBlogListDocument,
    "\n  query GetBlogDetailBySlug(\n    $filters: BlogFiltersInput\n    $status: PublicationStatus\n  ) {\n    blogs(filters: $filters, status: $status, pagination: { pageSize: 1 }) {\n      documentId\n      image {\n        url\n        alternativeText\n      }\n      slug\n      title\n      description\n      contents\n      isComingSoon\n      hashtags {\n        name\n      }\n      contact {\n        contents\n      }\n    }\n  }\n": typeof types.GetBlogDetailBySlugDocument,
};
const documents: Documents = {
    "\n  query GetBlogList(\n    $filters: BlogFiltersInput\n    $pagination: PaginationArg\n    $sort: [String]\n    $status: PublicationStatus\n  ) {\n    blogs_connection(\n      filters: $filters\n      pagination: $pagination\n      sort: $sort\n      status: $status\n    ) {\n      nodes {\n        title\n        slug\n        createdAt\n        documentId\n        description\n        image {\n          url\n          alternativeText\n        }\n      }\n      pageInfo {\n        page\n        pageCount\n        pageSize\n        total\n      }\n    }\n  }\n": types.GetBlogListDocument,
    "\n  query GetBlogDetailBySlug(\n    $filters: BlogFiltersInput\n    $status: PublicationStatus\n  ) {\n    blogs(filters: $filters, status: $status, pagination: { pageSize: 1 }) {\n      documentId\n      image {\n        url\n        alternativeText\n      }\n      slug\n      title\n      description\n      contents\n      isComingSoon\n      hashtags {\n        name\n      }\n      contact {\n        contents\n      }\n    }\n  }\n": types.GetBlogDetailBySlugDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBlogList(\n    $filters: BlogFiltersInput\n    $pagination: PaginationArg\n    $sort: [String]\n    $status: PublicationStatus\n  ) {\n    blogs_connection(\n      filters: $filters\n      pagination: $pagination\n      sort: $sort\n      status: $status\n    ) {\n      nodes {\n        title\n        slug\n        createdAt\n        documentId\n        description\n        image {\n          url\n          alternativeText\n        }\n      }\n      pageInfo {\n        page\n        pageCount\n        pageSize\n        total\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBlogList(\n    $filters: BlogFiltersInput\n    $pagination: PaginationArg\n    $sort: [String]\n    $status: PublicationStatus\n  ) {\n    blogs_connection(\n      filters: $filters\n      pagination: $pagination\n      sort: $sort\n      status: $status\n    ) {\n      nodes {\n        title\n        slug\n        createdAt\n        documentId\n        description\n        image {\n          url\n          alternativeText\n        }\n      }\n      pageInfo {\n        page\n        pageCount\n        pageSize\n        total\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetBlogDetailBySlug(\n    $filters: BlogFiltersInput\n    $status: PublicationStatus\n  ) {\n    blogs(filters: $filters, status: $status, pagination: { pageSize: 1 }) {\n      documentId\n      image {\n        url\n        alternativeText\n      }\n      slug\n      title\n      description\n      contents\n      isComingSoon\n      hashtags {\n        name\n      }\n      contact {\n        contents\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBlogDetailBySlug(\n    $filters: BlogFiltersInput\n    $status: PublicationStatus\n  ) {\n    blogs(filters: $filters, status: $status, pagination: { pageSize: 1 }) {\n      documentId\n      image {\n        url\n        alternativeText\n      }\n      slug\n      title\n      description\n      contents\n      isComingSoon\n      hashtags {\n        name\n      }\n      contact {\n        contents\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;