import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:3030'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

export { ApolloProvider, client };
