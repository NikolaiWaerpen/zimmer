import { ApolloProvider } from "@apollo/client";
import CustomHead from "components/CustomHead";
import { apolloClient } from "lib/apollo-client";
import { queryClient } from "lib/react-query-client";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import "styles/styles.css";
import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";

// https://stackoverflow.com/questions/56334381/why-my-font-awesome-icons-are-being-displayed-big-at-first-and-then-updated-to-t
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <CustomHead />

      <SessionProvider session={session}>
        <ApolloProvider client={apolloClient}>
          <QueryClientProvider client={queryClient}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </QueryClientProvider>
        </ApolloProvider>
      </SessionProvider>
    </>
  );
}
