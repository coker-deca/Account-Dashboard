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

const TRANSACTION_QUERY_DATE = gql`
  query GetAllTransactions ($created_at_lte: Date, $created_at_gte: Date, $sortField: String) {
    allTransactions(filter: {created_at_lte: $created_at_lte, created_at_gte: $created_at_gte}, sortField: $sortField) {
      id, account_id, type, amount, branch, created_at, updated_at, Account {
        id
      }
    }
  }
`;

export { TRANSACTION_QUERY, TRANSACTION_QUERY_DATE };
