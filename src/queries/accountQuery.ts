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

export { ACCOUNT_QUERY };
