import { gql } from '@apollo/client';

export const GET_FAQ_ID = gql`
  query Faq($documentId: ID!) {
    faq(documentId: $documentId) {
      question
      answer
    }
  }
`;

export const GET_FAQS_LIST = gql`
  query {
    faqs(status: PUBLISHED) {
      answer
      documentId
      question
    }
  }
`;
