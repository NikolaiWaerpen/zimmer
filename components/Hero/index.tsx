import heroAnimation from "public/lottie/coolhackerman.json";
import Lottie from "lottie-react";
import Link from "next/link";
import Typewriter from "typewriter-effect";
import { useEffect, useRef, useState } from "react";
import Birds from "components/Birds";
import { TYPE_SPEED } from "consts";

export default function Hero() {
  return (
    <>
      <main className="lg:mt-72 lg:relative">
        <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
          <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
            <div className="flex flex-col gap-4">
              {/* <p className="font-semibold text-theme-5 sm:text-lg md:mt-5 md:max-w-3xl">
              Hi, my name is
            </p> */}
              <h2 className="text-base font-semibold text-theme-5 tracking-wide uppercase">
                Hi, my name is
              </h2>
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                Nikolai Waerpen.
              </h1>
            </div>
            <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl flex justify-center lg:justify-start">
              <span className="text-gray-500">I build&nbsp;</span>
              <span className="text-theme-5">
                <Typewriter
                  options={{
                    loop: true,
                  }}
                  onInit={(typewriter) => {
                    typewriter
                      .start()
                      .typeString("beautiful websites.")
                      .pauseFor(TYPE_SPEED)
                      .deleteAll()
                      .typeString("powerful APIs.")
                      .pauseFor(TYPE_SPEED)
                      .deleteAll()
                      .typeString("test-driven software.")
                      .pauseFor(TYPE_SPEED)
                      .deleteAll()
                      .typeString("scalable web applications.")
                      .pauseFor(TYPE_SPEED)
                      .deleteAll();
                  }}
                />
              </span>
            </p>
            {/* <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow-lg">
              <Link href="/explore-collections">
                <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
                  Explore
                </a>
              </Link>
            </div>
          </div> */}
          </div>
        </div>

        {/* <div className="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
        <div className="absolute inset-0 w-full h-full">
        <Lottie animationData={heroAnimation} loop />
        </div>
      </div> */}
      </main>

      <Birds />
    </>
  );
}
