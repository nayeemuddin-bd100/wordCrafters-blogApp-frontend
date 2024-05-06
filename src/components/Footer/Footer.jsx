import { BookOpenIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-green-100 mt-auto">
      <div className=" max-w-7xl mx-auto   pt-16">
        <div className="  grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-0 justify-between px-10 items-center">
          {/* left panel */}
          <div className="flex flex-col gap-1 items-center md:items-start">
            <div className="flex-shrink-0 flex items-center text-black">
              <BookOpenIcon className="h-12 w-12  " />
              <span className="text-xl font-extrabold text-black font-inter">
                WordCrafters
              </span>
            </div>
            <p className="text-xl font-bold font-inter text-center md:text-left">
              We would love to hear from you
            </p>
            <p className="text-lg font-inter text-rose-600 text-center md:text-left">
              Any Question for us?
            </p>
            <p className="text-center md:text-left">
              Please send it to wordcrafters@admin.com
            </p>
          </div>

          {/* Right panel */}

          <div className="flex justify-between items-center  ">
            {/* Quick Link */}

            <div className="flex flex-col gap-y-4 ">
              <h2 className="text-2xl">Quick Link</h2>

              <Link className="hover:text-rose-600">About</Link>
              <Link className="hover:text-rose-600">Topic</Link>
              <Link className="hover:text-rose-600">Post</Link>
              <Link className="hover:text-rose-600"> Blog</Link>
              <Link className="hover:text-rose-600">Contact</Link>
            </div>

            {/* Social Media */}

            {/* Social icon */}
            <div className="flex flex-col gap-y-1 px-10 md:px-0">
              <h2 className="text-2xl">Stay Connected</h2>

              {/* Facebook */}
              <Link className="flex  justify-between my-3 hover:text-rose-600">
                <div className="flex gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12,2C6.477,2,2,6.477,2,12c0,5.013,3.693,9.153,8.505,9.876V14.65H8.031v-2.629h2.474v-1.749 c0-2.896,1.411-4.167,3.818-4.167c1.153,0,1.762,0.085,2.051,0.124v2.294h-1.642c-1.022,0-1.379,0.969-1.379,2.061v1.437h2.995 l-0.406,2.629h-2.588v7.247C18.235,21.236,22,17.062,22,12C22,6.477,17.523,2,12,2z"></path>
                  </svg>
                  <span>Facebook</span>
                </div>
              </Link>

              {/* Linkedin */}

              <Link className="flex  justify-between my-3 hover:text-rose-600">
                <div className="flex gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="25"
                    height="25"
                    viewBox="0 0 30 30"
                  >
                    <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z"></path>
                  </svg>
                  <span>Linkedin</span>
                </div>
              </Link>

              {/* Instagram */}

              <Link className="flex  justify-between my-3 hover:text-rose-600">
                <div className="flex gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="25"
                    height="25"
                    viewBox="0 0 50 50"
                  >
                    <path d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z"></path>
                  </svg>
                  <span>Instagram</span>
                </div>
              </Link>

              {/* Twitter */}

              <Link className="flex  justify-between my-3 hover:text-rose-600">
                <div className="flex gap-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="25"
                    height="25"
                    viewBox="0 0 50 50"
                  >
                    <path d="M 50.0625 10.4375 C 48.214844 11.257813 46.234375 11.808594 44.152344 12.058594 C 46.277344 10.785156 47.910156 8.769531 48.675781 6.371094 C 46.691406 7.546875 44.484375 8.402344 42.144531 8.863281 C 40.269531 6.863281 37.597656 5.617188 34.640625 5.617188 C 28.960938 5.617188 24.355469 10.21875 24.355469 15.898438 C 24.355469 16.703125 24.449219 17.488281 24.625 18.242188 C 16.078125 17.8125 8.503906 13.71875 3.429688 7.496094 C 2.542969 9.019531 2.039063 10.785156 2.039063 12.667969 C 2.039063 16.234375 3.851563 19.382813 6.613281 21.230469 C 4.925781 21.175781 3.339844 20.710938 1.953125 19.941406 C 1.953125 19.984375 1.953125 20.027344 1.953125 20.070313 C 1.953125 25.054688 5.5 29.207031 10.199219 30.15625 C 9.339844 30.390625 8.429688 30.515625 7.492188 30.515625 C 6.828125 30.515625 6.183594 30.453125 5.554688 30.328125 C 6.867188 34.410156 10.664063 37.390625 15.160156 37.472656 C 11.644531 40.230469 7.210938 41.871094 2.390625 41.871094 C 1.558594 41.871094 0.742188 41.824219 -0.0585938 41.726563 C 4.488281 44.648438 9.894531 46.347656 15.703125 46.347656 C 34.617188 46.347656 44.960938 30.679688 44.960938 17.09375 C 44.960938 16.648438 44.949219 16.199219 44.933594 15.761719 C 46.941406 14.3125 48.683594 12.5 50.0625 10.4375 Z"></path>
                  </svg>
                  <span>Twitter</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <hr className="border-b max-w-7xl mx-auto "></hr>
        <p className="text-sm text-gray-800 font-inter text-center py-5">
          Made with ❤️ by Nayeem
        </p>
      </div>
    </div>
  );
};

export default Footer;
