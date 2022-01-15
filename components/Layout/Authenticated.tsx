import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import CustomError from "components/CustomError";
import Footer from "components/Footer";
import UserImage from "components/UserImage";
import { NAVIGATION } from "consts";
import { signOut, useSession } from "next-auth/react";
import { Fragment, ReactNode } from "react";

function Profile() {
  const { data: session } = useSession();

  const { image, name } = session!.user!;

  return (
    <button onClick={() => signOut()} className="flex-shrink-0 group block">
      <div className="flex items-center">
        <UserImage src={image!} />
        <div className="ml-3 text-left">
          <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
            {name!}
          </p>
          <p className="text-xs font-medium text-gray-500 group-hover:text-indigo-600">
            Log out
          </p>
        </div>
      </div>
    </button>
  );
}

type AuthenticatedProps = {
  children: ReactNode;
};

export default function Authenticated({ children }: AuthenticatedProps) {
  useSession({
    required: true,
    onUnauthenticated: () => (
      <CustomError error={new Error("No access. You are not authenticated")} />
    ),
  });

  return (
    <div>
      {/* Top navigation */}
      <Popover className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <a href="/">
                <span className="sr-only">Workflow</span>
                <img
                  className="h-8 w-auto sm:h-10"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt=""
                />
              </a>
            </div>
            <div className="-mr-2 -my-2 md:hidden">
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </Popover.Button>
            </div>
            <Popover.Group as="nav" className="hidden md:flex space-x-10">
              {NAVIGATION.main.map(({ name, href }) => (
                <a
                  key={name}
                  href={href}
                  className="text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  {name}
                </a>
              ))}
            </Popover.Group>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              <Profile />
            </div>
          </div>
        </div>

        <Transition
          as={Fragment}
          enter="duration-200 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
              <div className="pt-5 pb-6 px-5">
                <div className="flex items-center justify-between">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                      alt="Workflow"
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
              </div>
              <div className="py-6 px-5 space-y-6">
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  {NAVIGATION.main.map(({ name, href }) => (
                    <a
                      key={name}
                      href={href}
                      className="text-base font-medium text-gray-900 hover:text-gray-700"
                    >
                      {name}
                    </a>
                  ))}
                </div>
                <div>
                  <Profile />
                </div>
              </div>
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>

      {/* Container */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-8">{children}</div>
      </div>

      {/* Footer */}
      <footer className="bg-white mt-36">
        <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
          <nav
            className="-mx-5 -my-2 flex flex-wrap justify-center"
            aria-label="Footer"
          >
            {NAVIGATION.main.map(({ name, href }) => (
              <div key={name} className="px-5 py-2">
                <a
                  href={href}
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  {name}
                </a>
              </div>
            ))}
          </nav>
          <div className="mt-8 flex justify-center space-x-6">
            {NAVIGATION.social.map(({ name, href, icon }) => (
              <a
                key={name}
                href={href}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">{name}</span>
                <FontAwesomeIcon icon={icon} className="w-6 h-6" />
              </a>
            ))}
          </div>
          <p className="mt-8 text-center text-base text-gray-400">
            &copy; 2022 Nikolai Wærpen. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
