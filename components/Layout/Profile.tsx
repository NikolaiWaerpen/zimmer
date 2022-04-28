import { Menu, Transition } from "@headlessui/react";
import classNames from "classnames";
import UserImage from "components/UserImage";
import { signOut, useSession } from "next-auth/react";
import { Fragment } from "react";

export default function Profile() {
  const { data: session } = useSession();

  const { image, name } = session!.user!;

  return (
    <Menu as="div" className="ml-3 relative">
      <div>
        <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-5">
          <span className="sr-only">Open user menu</span>
          <UserImage src={image!} alt={name!} />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          {/* TODO: Add a user profile page */}
          {/* <Menu.Item>
            {({ active }) => (
              <Link href="/profile">
                <a
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  Your profile
                </a>
              </Link>
            )}
          </Menu.Item> */}
          <Menu.Item>
            {({ active }) => (
              <a
                onClick={() => signOut()}
                className={classNames(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Sign out
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
