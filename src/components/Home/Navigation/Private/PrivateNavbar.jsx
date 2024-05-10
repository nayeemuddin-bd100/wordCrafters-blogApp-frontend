import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  BookOpenIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/outline";
import { LogoutIcon, PlusIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logoutUserAction } from "./../../../../redux/slices/users/usersSlices";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "About", href: "/about", current: false },
  { name: "Blog", href: "/blog", current: false },
  { name: "Author", href: "/author", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PrivateNavbar = () => {
  const user = useSelector((state) => state?.users);

  const { userAuth, profilePhoto } = user;

  // change avatar when change profile photo
  let avatar;
  if (profilePhoto) {
    avatar = profilePhoto;
  } else {
    avatar = userAuth?.profilePhoto;
  }
  //Navigation
  const userNavigation = [
    { name: "Your Profile", href: `/author/${userAuth?._id}` },
    { name: "Change your password", href: "/update-password" },
  ];

  const dispatch = useDispatch();

  return (
    <div>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex justify-between w-full">
                  <div className="-ml-2 mr-2 flex items-center md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                  {/* Logo */}
                  <div className="flex-shrink-0 flex items-center">
                    <BookOpenIcon className="h-10 w-10 text-yellow-200" />
                    <span className="text-xl font-extrabold text-amber-300 hidden sm:block">
                      WordCrafters
                    </span>
                  </div>

                  {/* Nav Item */}
                  <div className="hidden md:mx-2 md:flex md:items-center md:space-x-4">
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                          classNames(
                            isActive
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "pl-2 lg:px-3 py-2 rounded-md text-sm font-medium"
                          )
                        }
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>

                  {/* right side */}
                  <div className="flex items-center">
                    <div className="flex-shrink-0 ">
                      <NavLink
                        to="/create-post"
                        className="pr-3  relative inline-flex items-center mr-2 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                      >
                        <PlusIcon
                          className="sm:-ml-1 sm:mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                        <span className="hidden sm:block md:hidden lg:block">
                          New Post
                        </span>
                      </NavLink>

                      <button
                        onClick={() => dispatch(logoutUserAction())}
                        type="button"
                        className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                      >
                        <LogoutIcon
                          className="sm:-ml-1 sm:mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                        <span className="hidden sm:block md:hidden lg:block">
                          Logout
                        </span>
                      </button>
                    </div>
                    <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-3 relative z-10">
                        {({ open }) => (
                          <>
                            <div>
                              <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <span className="sr-only">Open user menu</span>
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src={avatar}
                                  alt="Author Profile"
                                />
                              </Menu.Button>
                            </div>
                            <Transition
                              show={open}
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items
                                static
                                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                              >
                                {userNavigation.map((item) => (
                                  <Menu.Item key={item.name}>
                                    {({ active }) => (
                                      <Link
                                        to={item.href}
                                        className={classNames(
                                          active ? "bg-gray-100" : "",
                                          "block px-4 py-2 text-sm text-gray-700"
                                        )}
                                      >
                                        {item.name}
                                      </Link>
                                    )}
                                  </Menu.Item>
                                ))}
                              </Menu.Items>
                            </Transition>
                          </>
                        )}
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      as={NavLink}
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block lg:px-3 py-2 rounded-md text-base font-medium"
                      )}
                      // aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>

                {/* Mobile */}
                <div className="pt-4 pb-3 border-t border-gray-700">
                  <div className="flex items-center px-5 sm:px-6">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={avatar}
                        alt="Author Profile"
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-white">
                        {user.userAuth?.firstName} {user.userAuth?.firstName}
                      </div>
                      <div className="text-sm font-medium text-gray-400">
                        {user.userAuth?.email}
                      </div>
                    </div>
                    <button className="ml-auto flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="mt-3 px-2 space-y-1 sm:px-3">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        as={NavLink}
                        key={item.name}
                        to={item.href}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default PrivateNavbar;
