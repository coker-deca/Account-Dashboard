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
  {
    allAccounts(filter: {created_at_lte: String, created_at_gte: String}, sortField: String) {
        id, first_name, last_name, type, created_at, updated_at, Transactions {
      id
    }
    }
  }
`;

export { ACCOUNT_QUERY, ACCOUNT_QUERY_DATE };
