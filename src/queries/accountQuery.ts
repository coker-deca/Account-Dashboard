import { gql } from '@apollo/client';

const ACCOUNT_QUERY = gql`
  {
    allAccounts {
        id, first_name, last_name, type, created_at, updated_at, Transactions {
      id
    }
    }
  }
`;

const ACCOUNT_QUERY_DATE = gql`
  query GetAllAccounts ($created_at_lte: Date, $created_at_gte: Date, $sortField: String) {
    allAccounts(filter: {created_at_lte: $created_at_lte, created_at_gte: $created_at_gte}, sortField: $sortField) {
        id, first_name, last_name, type, created_at, updated_at, Transactions {
      id
    }
    }
  }
`;

export { ACCOUNT_QUERY, ACCOUNT_QUERY_DATE };
