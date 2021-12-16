import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Error from "components/Error";
import { signOut, useSession } from "next-auth/react";
import { Fragment, ReactNode } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Authenticated() {
  const { data } = useSession();

  if (!data || !data.user) return <Error />;
  const { image, name } = data.user;
  if (!image || !name) return <div>User data missing!</div>;

  return (
    <button onClick={() => signOut()} className="flex-shrink-0 group block">
      <div className="flex items-center">
        <div>
          <img
            className="inline-block h-9 w-9 rounded-full"
            src={image}
            alt={`Image of ${name}`}
          />
        </div>
        <div className="ml-3 text-left">
          <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
            {name}
          </p>
          <p className="text-xs font-medium text-gray-500 group-hover:text-indigo-600">
            Log out
          </p>
        </div>
      </div>
    </button>
  );
}

type LayoutProps = {
  children: ReactNode;
};

const navigation = [
  { name: "Home", href: "/" },
  { name: "Greeting", href: "/greeting" },
];

export default function Layout({ children }: LayoutProps) {
  const { status } = useSession();

  return (
    <div>
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
              {navigation.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-base font-medium text-gray-500 hover:text-gray-900"
                >
                  {link.name}
                </a>
              ))}
            </Popover.Group>
            <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
              {status === "authenticated" ? (
                <Authenticated />
              ) : (
                <a
                  href="/login"
                  className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign in
                </a>
              )}
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
                  {navigation.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      className="text-base font-medium text-gray-900 hover:text-gray-700"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
                <div>
                  {status === "authenticated" ? (
                    <Authenticated />
                  ) : (
                    <a
                      href="/login"
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Sign in
                    </a>
                  )}
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
    </div>
  );
}
