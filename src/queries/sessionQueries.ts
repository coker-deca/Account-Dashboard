import { gql } from '@apollo/client';

const SESSION_QUERY = gql`
  {
  allSessions{
    lat, long
  }
}
`;

export { SESSION_QUERY };
