import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { InferGetStaticPropsType } from "next";
import Link from "next/link";
import dayjs from "dayjs";

export type FrontMatterType = {
  title: string;
  banner: string;
  bannerAlt: string;
  bannerCredit: string;
  categories: string[];
  date: string;
};

export default function Blog({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            My little development blog
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Find the latest of my writing here.
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {posts.map(({ frontMatter, slug }) => {
            const { title, banner, bannerAlt, bannerCredit, categories, date } =
              frontMatter as FrontMatterType;

            return (
              <Link href={`blog/${slug}`} key={title}>
                <a className="flex flex-col rounded-lg shadow overflow-hidden hover:shadow-lg transition duration-300">
                  <div>
                    <div className="flex-shrink-0">
                      {/* TODO: REPLACE WITH NEXT/IMAGE */}
                      <img
                        className="h-48 w-full object-cover"
                        src={banner}
                        title={bannerCredit}
                        alt={bannerAlt}
                      />
                    </div>
                    <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                      <div className="flex-1">
                        <div className="flex gap-2">
                          {categories.map((category: string) => (
                            <p
                              className="text-sm font-medium text-theme-4 uppercase"
                              key={category}
                            >
                              {category}
                            </p>
                          ))}
                        </div>
                        <p className="text-xl font-semibold text-gray-900 mt-2">
                          {title}
                        </p>
                      </div>
                      <div className="mt-6 flex items-center">
                        <div className="flex space-x-1 text-sm text-gray-500">
                          <time dateTime={date}>{date}</time>
                          {/* TODO: EVENTUALLY ADD THIS */}
                          {/* <span aria-hidden="true">&middot;</span> */}
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
  const files = fs.readdirSync(path.join("content/posts"));

  console.log(files);

  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("content/posts", filename),
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
