import { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import Layout from "../components/Layout";
import "styles/styles.css";
import { SessionProvider } from "next-auth/react";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
