import { gql } from '@apollo/client';

const TRANSACTION_QUERY = gql`
{
  allTransactions{
    id, account_id, type, amount, branch, created_at, updated_at, Account {
      id
    }
  }
}
`;

export { TRANSACTION_QUERY };
