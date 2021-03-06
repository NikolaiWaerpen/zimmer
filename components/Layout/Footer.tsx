import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NAVIGATION } from "consts";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white mt-36">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav
          className="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          {NAVIGATION.main.map(({ name, href }) => (
            <div key={name} className="px-5 py-2">
              <Link href={href}>
                <a className="text-base text-gray-500 hover:text-gray-900">
                  {name}
                </a>
              </Link>
            </div>
          ))}
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          {NAVIGATION.social.map(({ name, href, icon }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">{name}</span>
              <FontAwesomeIcon icon={icon} className="w-6 h-6" />
            </a>
          ))}
        </div>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; 2022 Nikolai Waerpen
        </p>
      </div>
    </footer>
  );
}
