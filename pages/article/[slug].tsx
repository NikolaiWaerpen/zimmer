import Button from "components/Button";
import { WPM } from "consts";
import fs from "fs";
import matter from "gray-matter";
import { InferGetStaticPropsType } from "next";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import { useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { FrontMatterType } from ".";

export default function Post({
  frontMatter,
  mdxSource,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { title, banner, bannerCredit, categories, date } =
    frontMatter as FrontMatterType;

  useEffect(() => {
    if (!process.browser) return;

    const articleElement = document.getElementById("article"),
      readTimeElement = document.getElementById("readTime");

    if (!articleElement || !readTimeElement) return;
    const text = articleElement.innerText;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / WPM);
    readTimeElement.innerText = `${time}`;
  }, []);

  return (
    <div className="relative py-16 bg-white overflow-hidden">
      {/* SVGS */}
      <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
        <div
          className="relative h-full text-lg max-w-prose mx-auto"
          aria-hidden="true"
        >
          <svg
            className="absolute top-12 left-full transform translate-x-32"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
            />
          </svg>
          <svg
            className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
            />
          </svg>
          <svg
            className="absolute bottom-12 left-full transform translate-x-32"
            width={404}
            height={384}
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="d3eb07ae-5182-43e6-857d-35c643af9034"
                x={0}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width={404}
              height={384}
              fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
            />
          </svg>
        </div>
      </div>

      <div className="relative px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
        <div className="text-lg max-w-prose mx-auto">
          <h1>
            <div className="flex gap-2 justify-center">
              {categories.map((category) => (
                <span
                  className="block text-base text-center text-theme-4 font-semibold tracking-wide uppercase"
                  key={category}
                >
                  {category}
                </span>
              ))}
            </div>
            <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {title}
            </span>
          </h1>
          <div className="flex space-x-1 text-sm text-gray-500 mt-2">
            <time dateTime={date}>{date}</time>
            <span aria-hidden="true">&middot;</span>
            <span>
              <span id="readTime" /> min read
            </span>
          </div>
        </div>

        <img
          className="w-full rounded-lg"
          src={banner}
          title={bannerCredit}
          alt={bannerCredit}
          width={1310}
          height={873}
        />

        <div
          className="prose prose-indigo prose-lg text-gray-500 md:mx-auto"
          id="article"
        >
          <MDXRemote
            {...mdxSource}
            components={{ Button, SyntaxHighlighter }}
          />
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join("content/posts"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".mdx", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

type Params = {
  params: {
    slug: string;
  };
};

export const getStaticProps = async ({ params: { slug } }: Params) => {
  const markdownWithMeta = fs.readFileSync(
    path.join("content/posts", slug + ".mdx"),
    "utf-8"
  );

  const { data: frontMatter, content } = matter(markdownWithMeta);
  const mdxSource = await serialize(content);

  return {
    props: {
      frontMatter,
      slug,
      mdxSource,
    },
  };
};
