import { config } from "@/config/env";
import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";

const link = new HttpLink({
  uri: "https://my-port-backend.netlify.app/api/graphql",
  headers: {
    "x-api-key": config.CLIENT_API_KEY,
  },
});

export const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export { gql };
