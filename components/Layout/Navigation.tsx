import { Popover, Transition, Disclosure, Menu } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import { NAVIGATION, URL } from "consts";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Profile from "./Profile";
import NotSignedIn from "./SignIn";

export default function Navigation() {
  const { route } = useRouter();
  const { status } = useSession();

  // TODO: Switch this out with one of the actual navs
  return (
    <div className="top-0 left-0 fixed w-full z-[420]">
      <Disclosure as="nav" className="bg-white shadow">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-theme-5">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex justify-start items-center lg:w-0 lg:flex-1 ">
                    <a href="/">
                      <span className="sr-only">Nikolai Waerpen</span>
                      <img
                        className="h-8 w-auto sm:h-10"
                        src={`${URL.FRONTEND}/images/logo.png`}
                        alt="logo"
                      />
                    </a>
                  </div>
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    {NAVIGATION.main.map(({ name, href }) => {
                      const currentlyActive = route === href;
                      return (
                        <Link key={name} href={href}>
                          <a
                            className={classNames(
                              currentlyActive
                                ? "border-theme-5 text-gray-900"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                              "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                            )}
                          >
                            {name}
                          </a>
                        </Link>
                      );
                    })}
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {status === "authenticated" ? (
                    <Profile />
                  ) : (
                    <NotSignedIn status={status} />
                  )}
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="pt-2 pb-4 space-y-1">
                {NAVIGATION.main.map(({ name, href }) => {
                  const currentlyActive = route === href;
                  return (
                    <Disclosure.Button as="div">
                      <Link key={name} href={href}>
                        <a
                          className={classNames(
                            currentlyActive
                              ? "bg-green-50 border-theme-5 text-theme-5"
                              : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700",
                            "block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                          )}
                        >
                          {name}
                        </a>
                      </Link>
                    </Disclosure.Button>
                  );
                })}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
