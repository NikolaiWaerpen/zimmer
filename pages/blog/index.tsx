import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";

export default function Blog({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            From the blog
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa
            libero labore natus atque, ducimus sed.
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {posts.map(({ frontMatter, slug }) => {
            const {
              title,
              bannerUrl,
              bannerCredit,
              categories,
              description,
              date,
            } = frontMatter;

            return (
              <Link href={`blog/${slug}`} key={title}>
                <a className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                  <div>
                    <div className="flex-shrink-0">
                      {/* TODO: REPLACE WITH NEXT/IMAGE */}
                      <img
                        className="h-48 w-full object-cover"
                        src={bannerUrl}
                        alt={bannerCredit}
                      />
                    </div>
                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                      <div className="flex-1">
                        <div className="flex gap-2">
                          {categories.map((category: string) => (
                            <p
                              className="text-sm font-medium text-indigo-600"
                              key={category}
                            >
                              {category}
                            </p>
                          ))}
                        </div>
                        <p className="text-xl font-semibold text-gray-900">
                          {title}
                        </p>
                        <p className="mt-3 text-base text-gray-500">
                          {description}
                        </p>
                      </div>
                      <div className="mt-6 flex items-center">
                        <div className="flex space-x-1 text-sm text-gray-500">
                          <time dateTime={date}>{date}</time>
                          <span aria-hidden="true">&middot;</span>
                          {/* TODO: FIGURE THIS OUT */}
                          {/* <span>{frontMatter.readingTime} read</span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const files = fs.readdirSync(path.join("public/posts"));

  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("public/posts", filename),
      "utf-8"
    );
    const { data: frontMatter } = matter(markdownWithMeta);
    return {
      frontMatter,
      slug: filename.split(".")[0],
    };
  });

  return {
    props: {
      posts,
    },
  };
};
