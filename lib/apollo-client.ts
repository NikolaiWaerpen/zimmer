import { ApolloClient, InMemoryCache } from "@apollo/client";
import { URL } from "../consts";

export const apolloClient = new ApolloClient({
  uri: URL,
  cache: new InMemoryCache(),
});
