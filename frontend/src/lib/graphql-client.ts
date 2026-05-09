/* eslint-disable @typescript-eslint/no-explicit-any */
import { GRAPHQL_URL } from './api';

import { DocumentNode, print } from 'graphql';

export async function graphqlQuery(
  query: string | DocumentNode,
  variables?: Record<string, any>,
  options: { tags?: string[]; revalidate?: number | false } = {}
) {
  const queryString = typeof query === 'string' ? query : print(query);

  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: queryString, variables }),
    // Use tags for on-demand revalidation and respect the revalidate setting
    next: { 
      tags: options.tags,
      revalidate: options.revalidate 
    },
  });

  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));

  return json.data;
}
