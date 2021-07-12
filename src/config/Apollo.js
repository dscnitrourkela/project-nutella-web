/* eslint-disable no-console */
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const cache = new InMemoryCache();

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, location, path }) =>
      // console.log(new Error({ message, location, path })),
      console.error({ message, location, path })
    );
  } else if (networkError) {
    const { message, name, respose, result, bodyText, stack, statusCode } = networkError;
    // console.log(new Error(message, name, respose, result, bodyText, stack, statusCode));
    console.error({ message, name, respose, result, bodyText, stack, statusCode });
  }
});

const link = from([
  errorLink,
  new HttpLink({
    // TODO: Use the production link when deployed
    uri: 'http://127.0.0.1:8000/graphql'
    // process.env.NODE_ENV === 'production'
    //   ? 'https://aptiche.dscnitrourkela.org/graphql?apikey=SriramForTheDiro'
    //   : 'https://aptiche.dscnitrourkela.org/graphql?apikey=SriramForTheDiro',
  })
]);

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    Authorization: ''
  }
}));

const client = new ApolloClient({
  cache,
  link: authLink.concat(link),
  name: 'apti-che-admin',
  version: '1.3',
  queryDeduplication: false,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'ignore'
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all'
    },
    mutate: {
      errorPolicy: 'all'
    }
  }
});

// eslint-disable-next-line react/prop-types
export default ({ children }) => <ApolloProvider client={client}>{children}</ApolloProvider>;
