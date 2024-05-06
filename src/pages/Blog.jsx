/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import BlogCard from "../components/Blog/BlogCard";
import Footer from "../components/Footer/Footer";
import AnotherPostCard from "../components/Home/SectionTwo/AnotherPostCard";
import Pagination from "../components/Pagination/Pagination";
import SmoothScroll from "../hooks/smoothScroll";
import AdImage from "../img/ad-img.webp";
import FacebookIcon from "../img/social-icon/FacebookIcon";
import InstagramIcon from "../img/social-icon/InstagramIcon";
import LinkedinIcon from "../img/social-icon/LinkedinIcon";
import TwitterIcon from "../img/social-icon/TwitterIcon";

const Blog = () => {
  const totalPages = 5;
  return (
    <div className="flex flex-col min-h-screen">
      <SmoothScroll>
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10  font-prompt">
          {/* Main Section */}
          <div className="flex  lg:flex-row gap-8 my-20 mt-36 flex-col">
            {/* Left panel */}
            <div className="w-full lg:w-2/3">
              <motion.div
                className="grid gap-8 lg:gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.2,
                    },
                  },
                  hidden: {},
                }}
              >
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
                <BlogCard />
              </motion.div>

              {/* pagination */}
              <div className="w-full mt-20">
                <Pagination totalPages={totalPages} />
              </div>
            </div>

            {/* Right panel */}
            <div className="w-full lg:w-1/3">
              {/* Categories */}
              <div className="border rounded-md border-gray-200 py-10 px-5 lg:px-10 flex flex-col gap-4">
                <p className="text-xl font-inter uppercase font-bold">
                  Categories
                </p>
                <div className="flex flex-col gap-2">
                  <Link className="flex text-lg justify-between items-center text-gray-600 hover:text-red-500 capitalize hover:scale-105 transition-all duration-500">
                    <p>NextJS</p>
                    <p>(10)</p>
                  </Link>{" "}
                  <Link className="flex text-lg justify-between items-center text-gray-600 hover:text-red-500 capitalize hover:scale-105 transition-all duration-500">
                    <p>javascript</p>
                    <p>(10)</p>
                  </Link>
                  <Link className="flex text-lg justify-between items-center text-gray-600 hover:text-red-500 capitalize hover:scale-105 transition-all duration-500">
                    <p>React</p>
                    <p>(10)</p>
                  </Link>
                  <Link className="flex text-lg justify-between items-center text-gray-600 hover:text-red-500 capitalize hover:scale-105 transition-all duration-500">
                    <p>Tailwind</p>
                    <p>(10)</p>
                  </Link>
                  <Link className="flex text-lg justify-between items-center text-gray-600 hover:text-red-500 capitalize hover:scale-105 transition-all duration-500">
                    <p>MongoDB</p>
                    <p>(10)</p>
                  </Link>
                  <Link className="flex text-lg justify-between items-center text-gray-600 hover:text-red-500 capitalize hover:scale-105 transition-all duration-500">
                    <p>typescript</p>
                    <p>(10)</p>
                  </Link>
                  <Link className="flex text-lg justify-between items-center text-gray-600 hover:text-red-500 capitalize hover:scale-105 transition-all duration-500">
                    <p>ExpressJS</p>
                    <p>(10)</p>
                  </Link>
                </div>
              </div>

              {/* Popular post */}
              <div className="border rounded-md border-gray-200 pt-8 pb-5 px-3 mt-10">
                <p className="text-xl font-inter uppercase font-bold">
                  Popular Post
                </p>

                <div className="flex flex-col justify-start items-center mt-5">
                  <AnotherPostCard />
                  <AnotherPostCard />
                  <AnotherPostCard />
                </div>
              </div>

              {/* Social Links */}

              <div className="py-8 px-3 mt-10">
                <p className="text-xl font-inter uppercase font-bold text-center">
                  Stay Connected
                </p>
                <div className="flex justify-center items-center gap-3">
                  <Link className="text-gray-700 hover:text-red-500 transition-all duration-300">
                    <FacebookIcon className="w-8 h-8" />
                  </Link>

                  <Link className="text-gray-700 hover:text-red-500 transition-all duration-300">
                    <InstagramIcon className="w-8 h-8" />
                  </Link>
                  <Link className="text-gray-700 hover:text-red-500 transition-all duration-300">
                    <TwitterIcon className="w-8 h-8" />
                  </Link>
                  <Link className="text-gray-700 hover:text-red-500 transition-all duration-300">
                    <LinkedinIcon className="w-8 h-8" />
                  </Link>
                </div>
              </div>

              {/* Ads */}
              <img
                src={AdImage}
                alt="ad"
                className="w-full mt-10 object-contain h-72 lg:h-96 "
              />
            </div>
          </div>
        </div>
      </SmoothScroll>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Blog;
