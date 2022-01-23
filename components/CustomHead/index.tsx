import Head from "next/head";

export default function CustomHead() {
  return (
    <Head>
      <title>Nikolai Wærpen</title>
      <meta
        name="description"
        content="Everything begins with an idea | Nikolai Waerpen"
      />
      <meta
        name="keywords"
        content="Nikolai Wærpen, nikolai wærpen, nikolaiwærpen, nikolai, wærpen, Nikolai Waerpen, nikolai waerpen, nikolaiwaerpen, nikolai, waerpen"
      />
      <meta name="author" content="Nikolai Waerpen" />

      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
        key=""
      />

      {/* Favicon */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#00aba9" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  );
}
