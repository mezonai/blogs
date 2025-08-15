import { Faq } from '@/gql/graphql';
import { graphqlQuery } from '@/lib/graphql-client';
import { GET_FAQS_LIST } from '@/queries/faq';

export default async function FaqsPage() {
  const data = await graphqlQuery(GET_FAQS_LIST);

  return (
    <div>
      <h1>FAQ List</h1>
      <ul>
        {data.faqs.map((faq: Faq) => (
          <li key={faq.documentId}>
            <strong>{faq.question}</strong>
            <p>{faq.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
