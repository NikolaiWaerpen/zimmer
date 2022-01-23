import Contact from "components/Contact";
import Hero from "components/Hero";
import Timeline from "components/Timeline";

export default function Home() {
  return (
    <div className="flex flex-col gap-96 lg:gap-[480px]">
      <Hero />

      <div className="text-center">
        <h2 className="text-base font-semibold text-theme-5 tracking-wide uppercase">
          The project
        </h2>
        <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          This is no standard portfolio.
        </p>
        <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
          This portfolio is a colllection of all my projects. The work speaks
          for itself. Go ahead and&nbsp;
          <span className="text-theme-5">explore!</span>
        </p>
      </div>

      {/* <Timeline /> */}

      <Contact />
    </div>
  );
}
