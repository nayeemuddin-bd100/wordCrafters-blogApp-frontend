import { BookOpenIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import FacebookIcon from "../../img/social-icon/FacebookIcon.jsx";
import InstagramIcon from '../../img/social-icon/InstagramIcon';
import LinkedinIcon from '../../img/social-icon/LinkedinIcon';
import TwitterIcon from '../../img/social-icon/TwitterIcon';

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
              Please send us to wordcrafters@admin.com
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
               

                  <FacebookIcon className="w-8 h-8" />
                  <span>Facebook</span>
                </div>
              </Link>

              {/* Linkedin */}

              <Link className="flex  justify-between my-3 hover:text-rose-600">
                <div className="flex gap-3">
                  <LinkedinIcon className="w-8 h-8" />
                  <span>Linkedin</span>
                </div>
              </Link>

              {/* Instagram */}

              <Link className="flex  justify-between my-3 hover:text-rose-600">
                <div className="flex gap-3">
                 <InstagramIcon className="w-8 h-8" />
                  <span>Instagram</span>
                </div>
              </Link>

              {/* Twitter */}

              <Link className="flex  justify-between my-3 hover:text-rose-600">
                <div className="flex gap-3">
                 <TwitterIcon className="w-8 h-8" />
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
