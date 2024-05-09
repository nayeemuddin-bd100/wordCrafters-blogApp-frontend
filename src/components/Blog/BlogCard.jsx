/* eslint-disable react/prop-types */
import { ArrowRightIcon } from "@heroicons/react/solid";
import { motion, useInView } from "framer-motion";
import { useRef } from 'react';
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const BlogCard = ({post}) => {
  console.log(post);
   const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  return (
    <motion.div
      variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0.8 },
      }}
      transition={{ duration: 1 }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      ref={ref}
    >
      <div className="font-prompt group ">
        <div className="relative overflow-hidden rounded-md">
          <img
            className=" object-cover group-hover:scale-105 transition-all duration-500 rounded-md h-64 w-full md:h-full "
            src={post?.image}
            alt="img"
          />
          <div className="absolute top-4 left-4 bg-indigo-500 text-white font-inter px-5 py-1 rounded-xl text-sm font-semibold">
            Next Js
          </div>
        </div>

        <div className="mt-5">
          <p className="text-xs text-gray-800 font-inter flex items-center gap-3">
            {post?.author.firstName} {post?.author.lastName}
            <span className="w-2 h-2 mx-2 rounded-full bg-red-400 inline-block"></span>{" "}
            <span> {post?.category}</span>
            <span className="w-2 h-2 mx-2 rounded-full bg-red-400 inline-block"></span>{" "}
            
          </p>
          <Link className="text-lg font-medium hover:text-red-500 transition-all duration-300">
            {post?.title}
          </Link>

          <div className="flex justify-between mt-3">
            <Link to={`/posts/${post?._id}`} className="text-sm text-red-500 hover:text-red-400 transition-all duration-500">
              View Details{" "}
              <span>
                <ArrowRightIcon className="w-4 h-4 inline-block" />
              </span>{" "}
            </Link>
            <p className="text-xs text-gray-800 font-inter"> 🔥 {post?.numViews} view</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
