import Button from "components/Button";
import fs from "fs";
import matter from "gray-matter";
import { InferGetStaticPropsType } from "next";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import path from "path";
import SyntaxHighlighter from "react-syntax-highlighter";

export default function Post({
  frontMatter: { title },
  mdxSource,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="mt-4">
      <h1>{title}</h1>
      <MDXRemote {...mdxSource} components={{ Button, SyntaxHighlighter }} />
    </div>
  );
}

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join("public/posts"));

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
    path.join("public/posts", slug + ".mdx"),
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
