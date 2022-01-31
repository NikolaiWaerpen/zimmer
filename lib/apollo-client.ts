import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { URL } from "../consts";
import { getSession } from "next-auth/react";

const httpLink = createHttpLink({
  uri: URL.BACKEND,
  credentials: "same-origin",
});

const authLink = setContext(async (_, { headers }: { headers: Headers }) => {
  const session = await getSession();
  const modifiedHeader = {
    headers: {
      ...headers,
      from: session
        ? `${session?.user?.email},${session?.user?.name},${session?.user?.image}`
        : "",
    },
  };

  return modifiedHeader;
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authLink, httpLink]),
});
