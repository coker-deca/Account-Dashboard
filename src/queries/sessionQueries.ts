import { gql } from '@apollo/client';

const SESSION_QUERY = gql`
  {
  allSessions{
    id, lat, long, created_at, updated_at
  }
}
`;

export { SESSION_QUERY };
