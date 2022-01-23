import heroAnimation from "public/lottie/hero.json";
import Lottie from "lottie-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="lg:mt-36 lg:relative">
      <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
        <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
          <div className="flex flex-col gap-4">
            <span className="text-lg text-theme-5 sm:text-xl md:mt-5 md:max-w-3xl">
              Hi, my name is
            </span>
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              Nikolai Wærpen.
            </h1>
            <h1 className="text-4xl tracking-tight font-bold sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl text-gray-500">
              I build things.
            </h1>
          </div>
          {/* <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow-lg">
              <Link href="/explore-collections">
                <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                  Explore
                </a>
              </Link>
            </div>
          </div>*/}
        </div>
      </div>
      <div className="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
        <div className="absolute inset-0 w-full h-full">
          <Lottie animationData={heroAnimation} loop className="sm:mt-28" />
        </div>
      </div>
    </main>
  );
}
