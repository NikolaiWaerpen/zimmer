import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "lib/apollo-client";
import { queryClient } from "lib/react-query-client";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import "styles/styles.css";
import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}
