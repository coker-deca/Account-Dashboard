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
{
  allTransactions(filter: {created_at_lte: String, created_at_gte: String}, sortField: String){
    id, account_id, type, amount, branch, created_at, updated_at, Account {
      id
    }
  }
}
`;

export { TRANSACTION_QUERY, TRANSACTION_QUERY_DATE };
