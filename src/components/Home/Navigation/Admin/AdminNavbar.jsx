/* This example requires Tailwind CSS v2.0+ */
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

import {
  BellIcon,
  BookOpenIcon,
  LogoutIcon,
  MenuIcon,
  XIcon,
} from "@heroicons/react/outline";
import { PlusIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { logoutUserAction } from "../../../../redux/slices/users/usersSlices";

const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Blog", href: "/blog", current: false },
  { name: "About", href: "/about", current: false },
  { name: "Author", href: "/author", current: false },
  { name: "Add Category", href: "/add-category", current: false },
  { name: "Category List", href: "/category-list", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AdminNavbar = () => {
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
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex justify-center items-center">
                {/* Logo */}
                <div className="hidden lg:flex flex-shrink-0  items-center">
                  <BookOpenIcon className="h-10 w-10 text-yellow-200" />
                </div>

                {/* Mobile Menu */}
                <div className=" flex items-center lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>

              <div className="flex lg:hidden flex-shrink-0  items-center">
                <BookOpenIcon className="h-10 w-10 text-yellow-200" />
              </div>

              {/* Nav Item */}
              <div className="hidden  lg:flex md:items-center gap-x-5 ">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      classNames(
                        isActive
                          ? "bg-gray-900 text-white px-3 py-2"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white ",
                        "px-3 py-2 rounded-md text-sm font-medium transition ease-in-out delay-100"
                      )
                    }
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>

              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {/* New post */}
                  <Link
                    to="/create-post"
                    type="button"
                    className="relative mr-4 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                  >
                    <PlusIcon
                      className="sm:-ml-1 sm:mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span className="hidden sm:block">New Post</span>
                  </Link>
                  {/* Logout */}
                  <button
                    onClick={() => dispatch(logoutUserAction())}
                    type="button"
                    className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                  >
                    <LogoutIcon
                      className="sm:-ml-1 sm:mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    <span className="hidden sm:block">Logout</span>
                  </button>
                </div>
                <div className="hidden xl:ml-4 md:flex-shrink-0 lg:flex md:items-center">
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
                              alt="Admin Profile"
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
                                  <NavLink
                                    to={item.href}
                                    className={({ isActive }) =>
                                      classNames(
                                        isActive ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )
                                    }
                                  >
                                    {item.name}
                                  </NavLink>
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

          <Disclosure.Panel className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <NavLink
                  to={`${item.href}`}
                  key={item.name}
                  className={({ isActive }) =>
                    classNames(
                      isActive
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )
                  }
                  // aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5 sm:px-6">
                <div className="flex-shrink-0">
                  {/* Image */}
                  <img
                    className="h-8 w-8 rounded-full"
                    src={avatar}
                    alt="Admin Profile"
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
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default AdminNavbar;
