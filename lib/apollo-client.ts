import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  createHttpLink,
  from,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { URL } from "../consts";
import { getSession } from "next-auth/react";

const httpLink = createHttpLink({
  uri: URL,
  credentials: "same-origin",
});

const authLink = setContext(async (_, { headers }: { headers: Headers }) => {
  const session = await getSession();
  const modifiedHeader = {
    headers: {
      ...headers,
      from: session?.user?.email,
    },
  };

  return modifiedHeader;
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authLink, httpLink]),
});
