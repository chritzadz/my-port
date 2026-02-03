import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";

const link = new HttpLink({
  uri: "https://my-port-backend.netlify.app/api/graphql",
});

export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export { gql };
